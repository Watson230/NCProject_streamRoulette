import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom'
import logo from './logo.svg';
import UserForm from './components/formContainer'
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
          <Route path="/" component={UserForm} />
        </BrowserRouter>

      </div>
    );
  }
}


export default App