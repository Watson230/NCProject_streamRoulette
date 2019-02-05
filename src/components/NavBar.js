import React from 'react';
import { Link } from 'react-router-dom';
import UserForm from './searchForm';

const NavBar = () => {

  return (


    <nav class="navbar  bg-dark">
      <div className="navbar-brand" >
        <Link to={'/'}> <a className="navbar-item">
          <img src="https://image.flaticon.com/icons/svg/819/819577.svg" alt="stream roulette" width="80" height="80" />
          <div>
            <h1 style={{ 'color': 'white' }}>Stream Roulette</h1>
          </div>
        </a></Link>
      </div>
      <div style={{ "textAlign": "right" , "width":"60%", "margin":"auto"}}>
        <p  style={{ 'color': 'white' }}>
          Start your search here......
        </p>
      </div>
      <div style={{ "margin":"auto"}} >
        <UserForm />
      </div>
    </nav>

  );
};

export default NavBar;