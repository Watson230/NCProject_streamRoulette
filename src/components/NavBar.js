import React from 'react';
import { Link } from 'react-router-dom';
import UserForm from './userForm';

const NavBar = () => {

  return (
  

    <nav class="navbar navbar-light bg-dark">
      <div className="navbar-brand" >
        <Link to={'/'}> <a className="navbar-item" href="https://bulma.io">
          <img src="https://image.flaticon.com/icons/svg/819/819577.svg" alt="stream roulette" width="80" height="80" />
          <div>
            <h1 className="title is-3" style={{ 'color': 'white' }}>Stream Roulette</h1>
          </div>
        </a></Link>
      </div>
      <div style={{"textAlign":"right"}}>
        <p class="navbar-text" style={{'color':'white'}}>
          Start your search here
  </p>
      </div>


      
      <UserForm/>

    </nav>

  );
};

export default NavBar;