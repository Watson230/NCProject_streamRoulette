import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom'


const NavBar = (props) => {

  return (

    <div>
      <section class="hero is-info">
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
    
    {/* <div class="tabs is-centered is-boxed">
      <ul>
        <li class="is-active"><NavLink to={'/'}>Home</NavLink></li>
        <li><NavLink to={'/:user/search'}>Search</NavLink></li>
        <li><NavLink to={'/search/results'}>Results</NavLink></li>
        <li><NavLink to={'/mostRecent'}>Recently Watched</NavLink></li>
      </ul>
    </div> */}
</div >

)

}

export default NavBar