import React  from 'react';
import {Link } from 'react-router-dom';


const NavBar = () => {

  return (
    <nav className="navbar is-black has-navbar-fixed-top">
      <div className="navbar-brand">
        <Link to={'/'}> <a className="navbar-item" href="https://bulma.io">
          <img src="https://image.flaticon.com/icons/svg/819/819577.svg" alt="stream roulette" width="80" height="80"/>
          <div>
            <h1 className="title is-3" style={{'color':'white'}}>Stream Roulette</h1>
          </div>
        </a></Link>
      </div>
    </nav>

  );};

export default NavBar;