import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom'
import logo from './logo.svg';

import HomeFeed from './components/homeFeed'
import UserForm from './components/userForm'
import SearchResults from './components/searchResults'

import mostRecentFilms from './components/mostRecentResults'
import './App.css';

class App extends Component {
  render() {
    return (
      <div >

        <section class="hero is-danger">
          <div class="hero-body">
            <div class="container">
              <h1 class="title">
                Stream Roulette
                   </h1>
              <h2 class="subtitle">
                
              </h2>
            </div>
          </div>
        </section>

        <BrowserRouter>
        <Switch>
          <Route path exact ="/" component={HomeFeed}/>
          {/* <Route path exact ="/search" component={UserForm}/> */}
          <Route path ="/search/results" component={SearchResults}/>
          <Route path="/mostRecent" component={mostRecentFilms}/>
          </Switch>
        </BrowserRouter>

      </div>
    );
  }
}


export default App