import React from 'react';
import Carousel from '../components/carousel'
import UrlResults from '../components/urlResults'
import SearchForm from '../components/searchForm'
const HomeFeed = (props) => {
  console.log(props)
  return (
    <div>

      <div className="row">

        <div className="col-sm-7 userInfo" >
          <div class="card" >
            <div class="card-body">
              <h3 class="title is-5" >Welcome to Stream Routlette</h3>
              <p> 1. - Click the search button and search for a film based off its release year and  genre.</p>
              <p>2. -  Select a few that you like the look of my 'liking' the film</p>
              <p>3. - Let us do the Picking for you!</p>
              <p>4. - Follow the URL to your chosen film on any streaming platform</p>
            </div>
          </div>
        </div>

        <div className="col" >
        <div className="searchForm-text">
          <p>Begin your Search here...</p>
          </div>
          <SearchForm />
        </div>


      </div>
      <div className="row" style={{ "marginTop": "5%" }}>


        <div className="col-sm-4">
          <Carousel popularFilms={props.mostPopularFilms} title='Most Popular' watchedFilmUrl={props.watchedFilmUrl}
            getFilmURL={props.getFilmURL} />
        </div>
        <div className="col-sm-4">
          <Carousel popularFilms={props.mostWatchdfilms} title='Most Watched' watchedFilmUrl={props.watchedFilmUrl}
            getFilmURL={props.getFilmURL} />
        </div>
        <div className="col-sm-4">
          <Carousel popularFilms={props.mostDislikedFilms} title='Most Disliked' watchedFilmUrl={props.watchedFilmUrl}
            getFilmURL={props.getFilmURL} />

        </div>


      </div>
      <UrlResults flag={props.watchNowFlag} watchedFilmUrl={props.watchedFilmUrl} watchHereHandler={props.watchHereHandler} />

    </div>
  );
}


export default HomeFeed;