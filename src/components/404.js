import React from 'react';
import {Link } from 'react-router-dom';


const ErrorPage = () => {

  return (     
    <div className="tile is-parent">
      <article className="tile is-child notification is-danger">
        <p className="title">404....</p>
        <p className="subtitle">Content does not exist</p>
        <div className="content">
          <div>
          </div>
          <Link to={'/'}><button className="button is-white is-large"> Home</button></Link>
        </div>
      </article>
    </div>     
  );

};

export default ErrorPage;