import React, { Component } from 'react';
import { BrowserRouter, Route, Switch,} from 'react-router-dom';
import SearchResults from './components/searchResults';
import ErrorPage from './components/404';
import MainContainer from './Containers/mainContainers'
import NavBar from './components/NavBar'
import './App.css';
import './mystyles.scss';

class App extends Component {

  render() {
    return (
      <div className=" container-fluid main">
          <NavBar />
        <BrowserRouter>
          <Switch>
            <Route path exact ="/" component={MainContainer}/>
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