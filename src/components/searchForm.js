import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { years } from '../helpers/helpers'

class UserForm extends Component {

  state = {

    genres: [],
    searchFlag: 1,

    userInfo: [],
    discoverTab: 'is-active',
    searchTabClass: null,
    selectSearchFlag: false,
    queries: {}

  }

  componentDidMount() {

    this.getFilmGenres()

  }

  userInputHandler(key, value) {

    const newState = Object.assign({}, this.state);
    const newQueries = Object.assign({}, newState.queries);
    newQueries[key] = value;
    newState.queries = newQueries;
  
    this.setState(newState);
  }

  submitQueries = () => {

    let usedQueries = Object.keys(this.state.queries);
    let queryString = usedQueries.reduce((acc, key) => {

      if (key === 'keywords') acc = acc + `with_keywords=${this.state.queries.keywords}` + '&';
      if (key === 'year') {
        if (parseInt(this.state.queries.year, 10) < 2018 && parseInt(this.state.queries.year, 10) > 1980) acc = acc + `primary_release_year=${parseInt(this.state.queries.year, 10)}` + '&';
        else acc = acc + `primary_release_year=${'2018' + '&'}`;
        return acc;
      }
      if (key === 'genre') acc = acc + `with_genres=${this.state.queries.genre}` + '&';
      if (key === 'search') acc = acc + `term=${this.state.queries.search}`;
      return acc;
    }, '');

    this.setState(Object.assign({}, this.state, {
      submitFlag: 1,
      queriesString: queryString
    }));
  }

  searchTabHandler = (num, tab) => {

    if (tab === 'search') {
      this.setState(Object.assign({}, this.state, {
        searchFlag: num,
        searchTab: 'is-active',
        discoverTab: null
      }));
    }
    else {
      this.setState(Object.assign({}, this.state, {
        searchFlag: num,
        searchTab: null,
        discoverTab: 'is-active'
      }));
    }
  }


  userSelectSearchHandler = (arg) => {
    this.setState({
      genres: this.state.genres,
      searchFlag: this.state.searchFlag,

      userInfo: this.state.userInfo,
      discoverTabClass: 'is-active',
      selectSearchFlag: arg,
      queries: this.state.queries
    });
  }


  UpdateStateUser = (user, userInfo) => {

    this.setState(Object.assign({}, this.state, {
      user: user,
      userInfo: userInfo
    }));

  }


  getFilmGenres = () => {
    fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=b714d4feb8707f01b7dd25f75051d8a6&language=en-US')
      .then(res => {
        return res.json();
      })
      .then(body => {
        this.setState({
          genres: body.genres
        });
      })
      .catch(() => {
        this.props.history.push('/404');
      });

  }

  render() {

    return (
      <div >
        <div >
          <div style={{ 'text-align': 'center', 'margin-bottom': '20px', 'margin-top': '20px' }}>
            <button class="button  is-medium is-black is-rounded"
              onClick={() => { this.userSelectSearchHandler(true); }}>Search Here</button>
          </div>

        </div>

        {this.state.selectSearchFlag ?
          <div className="box">
            <div className="modal is-active">
              <div className="modal-background"></div>
              <div className="modal-card">
                <header className="modal-card-head">
                  <p className="modal-card-title">Search Options</p>
                  <button className="delete" aria-label="close" onClick={() => { this.userSelectSearchHandler(false); }}></button>
                </header>
                <section className="modal-card-body">
                  <div style={{ 'width': '100%', 'height': '100%', 'margin': '0,auto' }}>
                    <div className="box">
                      <h1 className="is subtitle"> 1) Enter your preferred genre and release year between 2000 - 2017 with the discover tab </h1>
                      <h1 className="is subtitle"> 2) Search for a title with the search tab</h1>
                    </div>
                    <div className="tabs is-centered is-boxed">
                      <ul>
                        <li className={`${this.state.discoverTab}`}
                          onClick={() => { this.searchTabHandler(1, 'discover'); }}><a>Discover</a></li>
                        <li className={`${this.state.searchTab}`}
                          onClick={() => { this.searchTabHandler(0, 'search'); }}><a>Search</a></li>
                      </ul>
                    </div>

                    {this.state.searchFlag > 0 ?
                      <div className="discover">

                        <div className="field">
                          <label className="label">Release Date</label>
                       <div class="control">
                            <div class="select">
                              <select onChange={event => { this.userInputHandler('year', event.target.value); }}>
                                {
                                  years.map(year => <option value={year}>{year}</option>)
                                }
                              </select>
                            </div>
                          </div>

                        </div>

                        <div className="field">
                          <label className="label">Genre</label>
                          <div className="field has-addons">
                            <div className="control is-expanded">
                              <div className="select is-fullwidth">
                                <select id="genre"
                                  onChange={event => { this.userInputHandler('genre', event.target.value); }}>
                                  <option>Choose one</option>
                                  {this.state.genres.map((genre, i) => {
                                    return <option value={genre.id} key={i}>{genre.name}</option>;
                                  })}
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>



                        <div className="field is-grouped">
                          <div className="control">
                            <button className="button is-link" onClick={() => { this.submitQueries(); }}>Submit</button>
                          </div>

                        </div>
                      </div>
                      :
                      <div className="search">
                        <div className="field">
                          <label className="label">Title</label>
                          <div className="control">
                            <input className="input" type="text" placeholder="search" value={this.state.queries.search}
                              onChange={event => { this.userInputHandler(event.target.placeholder, event.target.value); }} />
                          </div>
                        </div>
                        <div className="field is-grouped">
                          <div className="control">
                            <button className="button is-link"
                              disabled={Object.keys(this.state.queries).length < 1 ? true : false}
                              onClick={() => { this.submitQueries(); }}>Submit</button>
                          </div>

                        </div>
                      </div>
                    }
                  </div>
                </section>
                <footer className="modal-card-foot" >
                  <button className="button" onClick={() => { this.userSelectSearchHandler(false); }}>Cancel</button>
                </footer>
              </div>
            </div>
          </div>
          : null
        }

        {
          this.state.submitFlag > 0 && <div>
            <div className="modal is-active">
              <div className="modal-background"></div>
              <div className="modal-card">
                <header className="modal-card-head">
                  <p className="modal-card-title">Search Complete</p>
                  <button className="delete" aria-label="close"></button>
                </header>
                <section className="modal-card-body">
                  <p>Search complelete! See your results by clicking see results..</p>
                </section>
                <footer className="modal-card-foot">
                  <Link to={`/${this.state.user}/search/${this.state.queriesString}/results`}><button className="button is-success">See Results</button></Link>
                  <button className="button">Cancel</button>
                </footer>
              </div>
            </div >
          </div>
        }
      </div>
    );
  }
}

UserForm.propTypes = {
  match: propTypes.object,
  UpdateStateUser: propTypes.func,
  history: propTypes.object,
  createUser: propTypes.func,
};


export default UserForm;

