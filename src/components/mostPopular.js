import React, { Component } from 'react';
import propTypes from 'prop-types';
import Linkify from 'react-linkify';

const API_URL = 'https://safe-brook-17817.herokuapp.com/api';


class MostLiked extends Component {

    state = {
      mostPopularFilms: [],
      watchFilm: false,
      watchedFilmUrl:[],
      currentFilm:[]
    }


    componentWillMount() {

      fetch(`${API_URL}/film/liked`)
        .then(res => {
          return res.json();
        })
        .then(body => {
          let films = body.map(film => film.film);
          this.setState({
            mostPopularFilms: films,
            currentFilm: films[Math.floor(Math.random() * (this.state.mostPopularFilms.length - 1))]
          });
        })
        .catch(() => {
          this.props.history.push('/404');
        });


    }

    watchNowButtonHandler=(arg)=>{

      this.setState({

        mostPopularFilms: this.state.mostPopularFilms,
        watchFilm: arg,
        watchedFilmUrl:this.state.watchedFilmUrl,
        currentFilm:this.state.currentFilm

      });
    }


    componentDidUpdate() {
      setTimeout(() => {this.mostPopularFilms();}, 6000);
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

      let filmNum = Math.floor(Math.random() * (this.state.mostPopularFilms.length - 1));
      this.setState({
        mostPopularFilms: this.state.mostPopularFilms,
        currentFilm: this.state.mostPopularFilms[filmNum]
      });
    }


    render() {
      return (
        <div style={{ 'width': '120%', 'height': '100%', }} >
          {this.state.currentFilm ?
            <div>
              <div className="tile is-parent">
                <article className="tile is-child notification is-black">
                  <div style={{ 'text-align': 'center','font-size': '1.5rem', 'margin-bottom': '10px' }} >  
                    <p className="title">Most Liked</p>
                  </div>
                  <div style={{'margin-bottom':'10px'}}>
                    <p className="subtitle">{`${this.state.currentFilm.title}`}</p>
                  </div>  
                  <figure className="image is-4by5">
                    <img src={`http://image.tmdb.org/t/p/w185//${this.state.currentFilm.poster_path}`} alt="Image" />
                  </figure>
                </article>
              </div>
              <div style={{'text-align': 'center'}}>
                <button onClick={()=>{
                  this.watchNowButtonHandler(true);
                  this.getFilmURL(this.state.currentFilm.title);
                }}
                className = "button is-rounded">Watch Here</button>
              </div>
            </div>
            : 
            <div className="tile is-parent">
              <article className="tile is-child notification is-black">
                <p className="title">loading.....</p>
              </article>
            </div>
          }

          {
            this.state.watchFilm ?
              <div>
                <div className="modal is-active">
                  <div className="modal-background"></div>
                  <div className="modal-card">
                    <header className="modal-card-head">
                      <p className="modal-card-title">You can watch it again here</p>
                      <button className="delete" aria-label="close"></button>
                    </header>
                    <section className="modal-card-body">
                      {this.state.watchedFilmUrl ?
                        <ul style={{ 'color': 'black' }}>
                          {
                            this.state.watchedFilmUrl.map(result => {
                              let Link;
                              if (result.url) {
                                Link = <Linkify>{result.url.split('//')[1]}</Linkify>;
                                return <li>{`${result.name}:`}{Link}</li>;
                              }})
                          }
                        </ul> :
                        null
                      }

                    </section>
                    <footer className="modal-card-foot">
                      <button className="button" onClick={()=>{this.watchNowButtonHandler(false);}}>Cancel</button>
                    </footer>
                  </div>
                </div >
              </div> : null
          }
        </div>
      );
    }
}

MostLiked.propTypes={
  match:propTypes.object,
  history:propTypes.object,
};

export default MostLiked;