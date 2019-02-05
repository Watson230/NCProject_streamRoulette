import React, { Component } from 'react';

import HomeFeed from '../Views/homeFeed'
const API_URL = 'https://safe-brook-17817.herokuapp.com/api';

class MainContainer extends Component {

    state = {

    }

    componentDidMount = () => {


        return this.getMostWatched()
            .then(() => this.getMostLiked())
            .then(() => this.getMostDisliked())
            .then(() => this.setState({ loaded: true }))

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

    getMostLiked = () => {

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

    getMostDisliked = () => {
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

    getFilmURL = (filmName) => {
        fetch(`https://utelly-tv-shows-and-movies-availability-v1.p.mashape.com/lookup?term=${filmName}`,
            {
                headers: new Headers({
                    'Accept': 'application/json',
                    'X-Mashape-Key': 'lbLD5PKDXhmshZXMNJgHsm1ahtF2p1fYk5Sjsn8XmYhTzIKQYn'
                }),
                type: 'cors'

            })
            .then(res => {
                return res.json();
            })
            .then(body => {
                this.setState(Object.assign({}, this.state, {
                    watchedFilmUrl: body.results[0].locations
                }), ()=>this.watchHereHandler(true));
            })
            .catch(() => {
                this.props.history.push('/404');
            });
    }

    watchHereHandler=(bool)=>{
        this.setState({
            watchNowFlag:bool
        })

    }


    render() {

        return (
            <div className="container">
                {this.state.loaded ?
                    <HomeFeed
                        mostWatchdfilms={this.state.mostWatchedFilms}
                        mostPopularFilms={this.state.mostPopularFilms}
                        mostDislikedFilms={this.state.mostDislikedFilms}
                        watchedFilmUrl={this.state.watchedFilmUrl}
                        getFilmURL={this.getFilmURL}
                        watchNowFlag={this.state.watchNowFlag}
                        watchHereHandler={this.watchHereHandler}

                    />
                    :
                    null
                }
            </div>
        );
    }
}

export default MainContainer