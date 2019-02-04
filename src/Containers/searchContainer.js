import React, { Component } from 'react';

import HomeFeed from '../components/homeFeed'
const API_URL = 'https://safe-brook-17817.herokuapp.com/api';

class SearchContainer extends Component {

    state = {
       
    }

    componentDidMount =()=>{

    }


    fetchGenres = ()=>{
      fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=b714d4feb8707f01b7dd25f75051d8a6&language=en-US')
      .then(res => {
        return res.json();
      })
      .then(body => {
        this.setState({
          genres: body.genres
        });
      })
      .catch(() => {
        this.props.history.push('/404');
      });
    }


    render() {

        return (
            <div>
       
            
            </div>
        );
    }
}

export default SearchContainer