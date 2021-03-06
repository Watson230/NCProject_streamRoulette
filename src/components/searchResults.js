import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Linkify from 'react-linkify';
import propTypes from 'prop-types';

const API_URL = 'https://safe-brook-17817.herokuapp.com/api';
const search_URL = 'https://api.themoviedb.org/3/discover/movie?api_key=b714d4feb8707f01b7dd25f75051d8a6&language=en-US&sort_by=popularity.desc&include_adult=false&primary_release_date.lte=2017&include_video=false'

class SearchResults extends Component {

  state = {
    searchResults: [],
    currentFilm: [],
    likedFilms: [],
    PickFilmflag: false,
    getFilmUrl: false,
    endOfSearchResults: false,
    user: this.props.match.params.user
  }

  componentDidMount() {
    let searchQuery;
    if (this.props.match.params.searchQueries) {
      searchQuery = this.props.match.params.searchQueries.slice(0, this.props.match.params.searchQueries.length - 1);
    }
    if (searchQuery.split('=')[0] === 'term') {
      let title = searchQuery.split('=')[1];
      this.getPickedFilmURLS(title);
    }
    else fetch(`${search_URL}&${searchQuery}`)
      .then(res => {
        return res.json();
      })
      .then(body => {

        this.setState({
          searchResults: body.results.slice(1),
          currentFilm: body.results[0],
          likedFilms: [],
          PickFilmflag: false,
          selectedFilm: [],
          recentlyDisliked: this.state.recentlyDisliked,
          getFilmUrl: false

        });

      })
      .catch(() => {
        this.props.history.push('/404');
      });
  }

  LikeFilmHandler = () => {
    let film = [this.state.currentFilm];
    this.findFilm(film[0]);
    this.likedFilmUserUpdate();
    if (!this.state.searchResults.slice(1, this.state.searchResults.length).length) {
      this.setState({
        searchResults: [],
        currentFilm: this.state.currentFilm,
        likedFilms: this.state.likedFilms.concat(film),
        PickFilmflag: false,
        selectedFilm: [],
        recentlyDisliked: this.state.recentlyDisliked,
        getFilmUrl: false,
        endOfSearchResults: true,
        pickFilmError: false
      });
    }

    else this.setState({

      searchResults: this.state.searchResults.slice(1, this.state.searchResults.length),
      currentFilm: this.state.searchResults[0],
      likedFilms: this.state.likedFilms.concat(film),
      PickFilmflag: false,
      selectedFilm: [],
      recentlyDisliked: this.state.recentlyDisliked,
      getFilmUrl: false,
      endOfSearchResults: false,
      pickFilmError: false
    });
  }

  secondChanceLikeFilmHandler = () => {
    let film = [this.state.recentlyDisliked];
    this.setState({

      searchResults: this.state.searchResults,
      currentFilm: this.state.currentFilm,
      likedFilms: this.state.likedFilms.concat(film),
      PickFilmflag: false,
      recentlyDisliked: false,
      selectedFilm: [],
      getFilmUrl: false,
      endOfSearchResults: false,
    });

  }

  postNewFilm = (film) => {

    fetch(`${API_URL}/film`, {

      method: 'POST',
      body: JSON.stringify({
        film
      }),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      type: 'cors'
    })
      .catch(() => {
        this.props.history.push('/404');
      });
  }

  findFilm = (film) => {

    fetch(`${API_URL}/film/find/${film.id}`, {
      type: 'cors'
    })
      .then(res => {
        return res.json();
      })
      .then(body => {
        if (body.length < 1) this.postNewFilm(film);
      })
      .catch(() => {
        this.props.history.push('/404');
      });


  }

  updateFilmLikes = (film) => {
    fetch(`${API_URL}/films/${film.id}/likes`, {
      method: 'PUT',
      body: JSON.stringify({
        film: film
      }),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      type: 'cors'
    })
      .catch(() => {
        this.props.history.push('/404');
      });
  }

  updateFilmDislikes = (film) => {
    fetch(`${API_URL}/films/${film.id}/dislikes`, {
      method: 'PUT',
      body: JSON.stringify({
        film: film
      }),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      type: 'cors'
    })
      .catch(() => {

        this.props.history.push('/404');
      });
  }

  likedFilmUserUpdate = () => {


    fetch(`${API_URL}/search/results/liked/${this.state.user}`, {

      method: 'PUT',
      body: JSON.stringify({
        film: this.state.currentFilm
      }),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      type: 'cors'
    })
      .then(() => {
        this.updateFilmLikes(this.state.currentFilm);
      })
      .catch(() => {
        this.props.history.push('/404');
      });
  }

  disLikeFilmhandler = () => {

    let film = this.state.currentFilm;

    this.findFilm(film);

    this.dislikedFilmUserUpdate();

    if (!this.state.searchResults.slice(1, this.state.searchResults.length).length) {

      this.setState({

        searchResults: [],
        currentFilm: this.state.searchResults[0],
        likedFilms: this.state.likedFilms,

        PickFilmflag: false,
        selectedFilm: [],
        recentlyDisliked: film,
        getFilmUrl: false,
        endOfSearchResults: true
      });
    }
    else {
      this.setState({

        searchResults: this.state.searchResults.slice(1, this.state.searchResults.length),
        currentFilm: this.state.searchResults[0],
        likedFilms: this.state.likedFilms,

        PickFilmflag: false,
        selectedFilm: [],
        recentlyDisliked: film,
        getFilmUrl: false,
        endOfSearchResults: false

      });

    }
  }

  dislikedFilmUserUpdate = () => {
    fetch(`${API_URL}/search/results/disliked/${this.state.user}`, {

      method: 'PUT',
      body: JSON.stringify({
        film: this.state.currentFilm
      }),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      type: 'cors'
    })
      .then(() => {
        this.updateFilmDislikes(this.state.currentFilm);
      })
      .catch(() => {
        this.props.history.push('/404');
      });
  }

  pickFilmhandler = () => {

    if (this.state.likedFilms.length < 1) {
      this.setState({ pickFilmError: true })
    }
    else this.setState({
      searchResults: this.state.searchResults,
      currentFilm: this.state.currentFilm,
      PickFilmflag: true,
      likedFilms: this.state.likedFilms,
      selectedFilm: this.state.likedFilms[Math.floor(Math.random() * (this.state.likedFilms.length - 1))],
      recentlyDisliked: this.state.recentlyDisliked,
      getFilmUrl: false,
      endOfSearchResults: false
    });
  }

  getPickedFilmURLS = (title) => {
    if (!title) title = this.state.selectedFilm.title;
    this.watchedFilmsUserUpdate();
    fetch(`https://utelly-tv-shows-and-movies-availability-v1.p.mashape.com/lookup?term=${title}`,
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
          PickFilmflag: false,
          getFilmUrl: true,
          endOfSearchResults: false,
          selectedUrl: body.results[0].locations
        }
        ));
      })
      .catch(() => {
        this.props.history.push('/404');
      });
  }

  watchedFilmsUserUpdate = () => {

    fetch(`${API_URL}/search/results/${this.state.user}/watched`, {
      method: 'PUT',
      body: JSON.stringify({
        film: this.state.selectedFilm
      }),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      type: 'cors'
    })
      .catch(() => {
        this.props.history.push('/404');
      });
  }

  render() {

    return (
      <div>

        <div className="row">


          <div className="col-sm-4">
          <div className="searchResultPageItem">
            <div className="box">
              <h1 className="title is-3 searchDisplayTitle" >Film Info</h1>
            </div>
            <div className="box" style={{ 'overflow-y': 'scroll', 'height': '450px', }}>
              <h2 className="title is-4">{this.state.currentFilm.title}</h2>
              <p>{this.state.currentFilm.overview}</p>
            </div>

            <div className="box" style={{ 'text-align': 'right' }}>
              <div style={{ 'text-align': 'left' }}>
                <h1 className="title is-4">{`Liked Films:${this.state.likedFilms.length}`}</h1>
              </div>
              <div style={{ 'text-align': 'center', "marginTop": "10px" }}>
                <button className="button is-link" onClick={() => { this.pickFilmhandler(); }}> Pick a Film!</button>
                {this.state.pickFilmError && <p style={{ "color": "red" }}>You have not liked any films!</p>}
              </div>
            </div>
            </div>
          </div>

          <div className="col-sm-4">
            <div className="searchResultPageItem">
            <div className="box">
              <h1 className="title is-4 searchDisplayTitle">{`Search Results: ${this.state.searchResults.length + 1}`}</h1>
              </div>
              <div className="box " style={{ "textAlign": 'center', 'width': '100%', 'height': 'auto', 'margin-top': '20px' }}>


                <img className="img-thumbnail" src={`http://image.tmdb.org/t/p/w185//${this.state.currentFilm.poster_path}`} alt="" />


                <nav className="level is-mobile" style={{ 'margin-top': '20px', 'margin-bottom': '20px' }} >
                  <div className="level-right">
                    <button className="level-item" className="button is-success" aria-label="reply"
                      onClick={() => { this.LikeFilmHandler(); }}>Yes</button>
                  </div>

                  <div className="level-center">
                    <p className="level-item"> Watch? </p>
                  </div>

                  <div className="level-left">
                    <a className="level-item" aria-label="reply" className="button is-danger"
                      onClick={() => { this.disLikeFilmhandler(); }}>No</a>
                  </div>
                </nav>
              </div>
            </div>

          </div>

          {this.state.recentlyDisliked ?
                            <div className="col-sm-4"  >
                            <div className="searchResultPageItem">
                                <div className="box">
                                    <h1 className="title is-4 searchDisplayTitle">2nd Chance</h1>
                                </div>
                                <div className="box">
                                    <div className="content" style={{ 'text-align': 'center', 'margin-top': '30px', }}>

                                        <img className="img-thumbnail" src={`http://image.tmdb.org/t/p/w185//${this.state.recentlyDisliked.poster_path}`} alt="" />


                                    </div>
                                    <button className="button is-success"
                                        onClick={() => { this.secondChanceLikeFilmHandler(); }}
                                    >Like</button>
                                </div>
                            </div>
                            </div>
                            :
                            <div className="col-sm-4" >
                            <div className="searchResultPageItem">
                                <div className="box">
                                    <h1 className="title is-4 searchDisplayTitle" >Recently Disliked</h1>
                                </div>
                                <div className="box">

                                    <div className="content" style={{ 'text-align': 'center', 'margin-top': '30px', 'margin-bottom': '30px', "height": "auto", "minHeight":"300px" }}>
                                        <div>
                                            <figure className="image is-480x480">
                                                <img src='https://vignette.wikia.nocookie.net/creation/images/7/7e/Red_x.png/revision/latest/scale-to-width-down/480?cb=20160323201834' alt="" />
                                            </figure>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        }

   
        </div>
        {
          this.state.PickFilmflag ?
            <div className="modal is-active">
              <div className="modal-background"></div>
              <div className="modal-card">
                <header className="modal-card-head">
                  <p className="modal-card-title">Selected Film</p>
                  <button className="delete" aria-label="close" onClick={() => { this.setState(Object.assign({}, this.state, { PickFilmflag: false, getFilmUrl: false, })); }} ></button>
                </header>
                <section className="modal-card-body">
                  {
                    <div className="chosenFilmPoster">

                      <img className="img-thumbnail" src={`http://image.tmdb.org/t/p/w185//${this.state.selectedFilm.poster_path}`} alt="" />

                    </div>
                  }
                </section>
                <footer className="modal-card-foot">
                  <button className="button is-success"
                    onClick={() => { this.getPickedFilmURLS(); }}>Watch</button>
                  <button className="button"
                    onClick={() => { this.setState(Object.assign({}, this.state, { PickFilmflag: false, getFilmUrl: false, })); }}>Cancel</button>
                </footer>
              </div>
            </div> : null
        }

        {
          this.state.getFilmUrl ?
            <div className="modal is-active">
              <div className="modal-background"></div>
              <div className="modal-card">
                <header className="modal-card-head">
                  <p className="modal-card-title">Watch it Here</p>
                </header>
                <section className="modal-card-body">
                  {
                    <ul>
                      {this.state.selectedUrl.length > 0 ?
                        this.state.selectedUrl.map(result => {
                          let Link;
                          if (result.url) {
                            Link = <Linkify>{result.url.split('//')[1]}</Linkify>;
                            return <li>{`${result.name}: `}{Link}</li>;
                          }
                          else return null
                        })
                        :
                        <li>No results to show</li>
                      }
                    </ul>
                  }

                </section>
                <footer className="modal-card-foot">
                  <Link to={'/'}> <button className="button"
                    onClick={() => { this.setState(Object.assign({}, this.state, { PickFilmflag: false, getFilmUrl: false })); }}>Cancel</button>
                  </Link>
                </footer>
              </div>
            </div>

            : null

        }

        {
          this.state.endOfSearchResults ?
            <div>
              <div className="modal is-active">
                <div className="modal-background"></div>
                <div className="modal-card">
                  <header className="modal-card-head">
                    <p className="modal-card-title">Seen nothing you like?</p>
                    <Link to="/"> <button className="delete" aria-label="close" ></button></Link>
                  </header>
                  <section className="modal-card-body">
                    <p>End of Search results.....</p>
                  </section>
                  <footer className="modal-card-foot">
                    <button className="button"
                      onClick={() => { this.pickFilmhandler(); }}>Pick Liked Film</button>
                    <Link to="/"><button className="button">Search Again</button></Link>
                  </footer>
                </div>
              </div>
            </div> : null
        }
      </div>

    );
  }
}

SearchResults.propTypes = {
  match: propTypes.object,
  history: propTypes.object,
};




export default SearchResults;