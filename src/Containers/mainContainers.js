import React, { Component } from 'react';

import HomeFeed from '../components/homeFeed'
const API_URL = 'https://safe-brook-17817.herokuapp.com/api';

class MainContainer extends Component {

    state = {
       
    }

    componentDidMount =()=>{


        return this.getMostWatched()
        .then(()=>this.getMostLiked())
        .then(()=>this.getMostDisliked())
        .then(()=>this.setState({loaded:true}))

    }





    getMostWatched = () => {
        return fetch(`${API_URL}/film/watched`)
            .then(res => {
                return res.json();
            })
            .then(body => {
                console.log(body)
                let films = body.map(film => film.film);
                this.setState({
                    mostWatchedFilms: films,
                });
            })
            .catch(() => {
                this.props.history.push('/404');
            });
    }

    getMostLiked = ()=>{

        return fetch(`${API_URL}/film/liked`)
        .then(res => {
          return res.json();
        })
        .then(body => {
          let films = body.map(film => film.film);
          this.setState({
            mostPopularFilms: films,
          
          });
        })
        .catch(() => {
          this.props.history.push('/404');
        });
    }

    getMostDisliked = ()=>{
      return fetch(`${API_URL}/film/disliked`)
      .then(res => {
        return res.json();
      })
      .then(body => {
        let films = body.map(film => film.film);
        this.setState({
          mostDislikedFilms: films,
        });
      })
      .catch(() => {
        this.props.history.push('/404');
      });
    }

    render() {

        return (
            <div className="container-fluid">
            {this.state.loaded?
                <HomeFeed 
                mostWatchdfilms={this.state.mostWatchedFilms}
                mostPopularFilms={this.state.mostPopularFilms}
                mostDislikedFilms ={this.state.mostDislikedFilms}
                />
                :
                null
            }
            </div>
        );
    }
}

export default MainContainer