import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom'


const NavBar = (props) => {

  return (

    
<nav class="navbar is-white has-navbar-fixed-top">
  <div class="navbar-brand">
    <a class="navbar-item" href="https://bulma.io">
      <img src="https://image.flaticon.com/icons/svg/819/819577.svg" alt="stream roulette" width="80" height="80"/>
      <div>
    <h1 class="title is-3" >
      Stream Roulette
    </h1>
    </div>
    </a>

    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>
</nav>


)

}

export default NavBar