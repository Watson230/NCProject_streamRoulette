import React from 'react';
import { Link } from 'react-router-dom';


const NavBar = () => {

  return (


    <nav class="navbar" id="navbarCustom">
      <div className="navbar-brand" >
         <a className="navbar-item">
          <img src="https://image.flaticon.com/icons/svg/819/819577.svg" alt="stream roulette" width="80" height="80" />
          <div>
            <h1 style={{ 'color': 'white' }}>Stream Roulette</h1>
          </div>
        </a>
      </div>

    </nav>

  );
};

export default NavBar;