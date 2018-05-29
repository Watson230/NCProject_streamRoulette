import React, { Component } from 'react';
import { BrowserRouter, Route, Switch,} from 'react-router-dom';
import HomeFeed from './components/homeFeed';
import SearchResults from './components/searchResults';
import ErrorPage from './components/404';
import './App.css';
import './mystyles.scss';

class App extends Component {

  render() {
    return (
      <div className="main">
        <BrowserRouter>
          <Switch>
            <Route path exact ="/" component={HomeFeed}/>
            <Route path  ="/:user/search/:searchQueries/results" component={SearchResults}/>
            <Route path="/404" component={ErrorPage} />
            <Route component={ErrorPage}/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}


export default App;