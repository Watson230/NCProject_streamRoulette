import React, { Component } from 'react';
import propTypes from 'prop-types';
import Linkify from 'react-linkify';
import Carousel from './carousel'
const API_URL = 'https://safe-brook-17817.herokuapp.com/api';

class MostWatched extends Component {

  state = {
    mostWatchedFilms: []
  }


  UNSAFE_componentWillMount() {

    fetch(`${API_URL}/film/watched`)
      .then(res => {
        return res.json();
      })
      .then(body => {
        let films = body.map(film => film.film);
        this.setState({
          loaded: true,
          mostWatchedFilms: films,
          currentFilm: films[Math.floor(Math.random() * (this.state.mostWatchedFilms.length - 1))]
        });
      })
      .catch(() => {
        this.props.history.push('/404');
      });
  }



  componentDidUpdate() {
    setTimeout(() => { this.mostPopularFilms(); }, 5000);
  }

  getFilmURL = (filmName) => {
    fetch(`https://utelly-tv-shows-and-movies-availability-v1.p.mashape.com/lookup?term=${filmName}`,
      {
        headers: new Headers({
          'Accept': 'application/json',
          'X-Mashape-Key': 'lbLD5PKDXhmshZXMNJgHsm1ahtF2p1fYk5Sjsn8XmYhTzIKQYn'
        }),
        type: 'cors'

      })
      .then(res => {
        return res.json();
      })
      .then(body => {
        this.setState(Object.assign({}, this.state, {
          watchedFilmUrl: body.results[0].locations
        }));
      })
      .catch(() => {
        this.props.history.push('/404');
      });
  }

  mostPopularFilms = () => {

    let filmNum = Math.floor(Math.random() * (this.state.mostWatchedFilms.length - 1));
    this.setState({
      mostWatchedFilms: this.state.mostWatchedFilms,
      currentFilm: this.state.mostWatchedFilms[filmNum]
    });
  }


  watchNowButtonHandler = (arg) => {

    this.setState({
      mostPopularFilms: this.state.mostPopularFilms,
      watchFilm: arg,
      watchedFilmUrl: this.state.watchedFilmUrl,
      currentFilm: this.state.currentFilm

    });
  }


  render() {

    return (
      <div>
        {
          this.state.loaded ?
            <Carousel popularFilms={this.state.mostWatchedFilms} />
            :
            null
        }


      </div>
    );
  }

}
MostWatched.propTypes = {
  match: propTypes.object,
  history: propTypes.object,
};

export default MostWatched;