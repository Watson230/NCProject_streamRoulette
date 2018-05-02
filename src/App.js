import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom'
import logo from './logo.svg';

import HomeFeed from './components/homeFeed'
import UserForm from './components/userForm'
import SearchResults from './components/searchResults'


import './App.css';
import './mystyles.scss';

// const backgroundStyle = 

class App extends Component {

  state={


  }

  render() {
    return (
      <div className="main">
        <BrowserRouter>
          <Switch>
            <Route path exact ="/" component={HomeFeed}/>
            {/* <Route path exact ="/:user/search" component={UserForm}/> */}
            <Route path  ="/:user/search/:searchQueries/results" component={SearchResults}/>
            {/* <Route path="/mostRecent" component={mostRecentFilms}/> */}
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}


export default App