import React, { Component } from 'react';
import NavBar from './NavBar';
import MostPopular from './mostPopular';
import MostDisliked from './mostDisliked';
import MostWatched from './mostWatched';
import UserForm from './searchForm';
import UserInfo from './userInfo'
import Carousel from './carousel'
import UrlResults from './urlResults'


const HomeFeed = (props) => {
  console.log(props)
  return (
    <div className="container">
      <NavBar />
      <div className="row">

        <div class="card" style={{"width":"75%", "marginTop":"5%", "marginLeft":"15%"}}>
          <div class="card-body">
          <h3>Welcome to Stream Routlette</h3>
          <p> Step 1 - click the search button above and search for a film based off its release year and genre.</p>
          <p>Step 2 -  Select a few that you like the look of my 'liking' the film</p>
          <p>Step 3 - Let us do the Picking for you!</p>
          <p>Step 4 -Follow the URL to your chosen film on any streaming platform</p>
  </div>
        </div>


      </div>
      <div className="row" style={{ "marginTop": "5%" }}>


        <div className="col-sm-4">
          <Carousel popularFilms={props.mostPopularFilms} title='Most Popular'    watchedFilmUrl={props.watchedFilmUrl}
                getFilmURL={props.getFilmURL}/>
        </div>
        <div className="col-sm-4">
          <Carousel popularFilms={props.mostWatchdfilms} title='Most Watched'   watchedFilmUrl={props.watchedFilmUrl}
                getFilmURL={props.getFilmURL} />
        </div>
        <div className="col-sm-4">
          <Carousel popularFilms={props.mostDislikedFilms} title='Most Disliked'   watchedFilmUrl={props.watchedFilmUrl}
                getFilmURL={props.getFilmURL}/>
          
        </div>


      </div>
      <UrlResults flag ={props.watchNowFlag} watchedFilmUrl={props.watchedFilmUrl} watchHereHandler={props.watchHereHandler}/>

    </div>
  );
}


export default HomeFeed;