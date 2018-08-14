import React from 'react';
import {Link } from 'react-router-dom';


const ErrorPage = () => {

  return (     
    <div style={{'textAlign':'center'}}>
      <div className="box" >
        <p className="title is-1"> 404....</p>
        <p className="subtitle">Content does not exist</p>
        <div className="content">
          <div>
          </div>
          <Link to={'/'}><button className="button is-danger is-large"> Home</button></Link>
        </div>
      </div>
      
      
    </div>     
  );

};

export default ErrorPage;