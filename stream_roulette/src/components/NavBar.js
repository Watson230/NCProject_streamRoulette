import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom'


const NavBar =(props)=>{

return (
    <div class="tabs">
    <ul>
    <li class="is-active"><NavLink to={'/'}>Home</NavLink></li>
    <li><NavLink to={'/search'}>Search</NavLink></li>
    <li><NavLink to={'/search/results'}>Results</NavLink></li>
    <li><NavLink to={'/search/results/mostRecent'}>Recently Watched</NavLink></li>
  </ul>
</div>
)

}

export default  NavBar