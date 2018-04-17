import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import NavBar from './NavBar'
import Film from "./film"


class SearchResults extends Component {

    state = {
        searchResults: [],
        currentFilm: [],
        filmNumber: 4,
        likedFilms: [],
        PickFilmflag: false,
        recentlyDisliked: []
    }

    componentDidMount() {

        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=b714d4feb8707f01b7dd25f75051d8a6&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&release_date.lte=2015`)
            .then(res => {
                console.log(res)
                return res.json();
            })
            .then(body => {

                this.setState({

                    searchResults: body.results.slice(0, 30),
                    currentFilm: body.results[0],
                    likedFilms: [],
                    PickFilmflag: false,
                    selectedFilm: [],
                    recentlyDisliked: this.state.recentlyDisliked


                })
            })
            .catch(err => {
                console.log(err)

            })

    }


    LikeFilmHandler = () => {
        console.log('liked film')
        let film = [this.state.currentFilm]
        console.log(film)

        this.setState({

            searchResults: this.state.searchResults.slice(1, this.state.searchResults.length),
            currentFilm: this.state.searchResults[0],
            likedFilms: this.state.likedFilms.concat(film),
            PickFilmflag: false,
            selectedFilm: [],
            recentlyDisliked: this.state.recentlyDisliked
        })
    }

    disLikeFilmhandler = () => {

        let film = this.state.currentFilm

        this.setState({

            searchResults: this.state.searchResults.slice(1, this.state.searchResults.length),
            currentFilm: this.state.searchResults[0],
            likedFilms: this.state.likedFilms,
            PickFilmflag: false,
            selectedFilm: [],
            recentlyDisliked: film
        })

    }

    pickFilmhandler = () => {

        this.setState({

            searchResults: this.state.searchResults,
            currentFilm: this.state.currentFilm,
            PickFilmflag: true,
            likedFilms: this.state.likedFilms,
            selectedFilm: this.state.likedFilms[Math.floor(Math.random() * this.state.likedFilms.length)],
            recentlyDisliked: this.state.recentlyDisliked

        })

    }

    getPickedFilmURLS = () => {
        console.log(this.state.selectedFilm.title)
        fetch(`https://utelly-tv-shows-and-movies-availability-v1.p.mashape.com/lookup?term=${this.state.selectedFilm.title}`,
            {


                headers: new Headers({
                    'Accept': 'application/json',
                    'X-Mashape-Key': "lbLD5PKDXhmshZXMNJgHsm1ahtF2p1fYk5Sjsn8XmYhTzIKQYn"
                }),
                type: 'cors'

            })
            .then(res => {
                console.log(res)
                return res.json();
            })
            .then(body => {
                console.log(body)
            })
            .catch(err => {
                console.log(err)

            })


    }

    render() {

        return (
            <div>
                <NavBar />
                <div style={{ "text-align": "left" }}>
                    <div style={{ "width": "400px", "float": "left", "margin-right": "100px", "margin-left": "20px" }}>
                        <h1 class="title is-1" >Film Info</h1>
                        <h2 class="title is-2">{this.state.currentFilm.title}</h2>
                        <p>{this.state.currentFilm.overview}</p>
                    </div>
                    <div style={{ "width": "600px", "height": "800px", "margin": "0 auto", "float": "left", }}>
                        <h1 class="title is-1">{`Search Results: ${this.state.searchResults.length + 1}`}</h1>
                        <div class="box">



                            <div class="content">
                                <figure class="image is-4by5">
                                    <img src={`http://image.tmdb.org/t/p/w185//${this.state.currentFilm.poster_path}`} alt="Image" />
                                </figure>

                            </div>


                            <nav class="level is-mobile">
                                <div class="level-right">
                                    <button class="level-item" class="button is-success" aria-label="reply"
                                        onClick={() => {
                                            this.LikeFilmHandler()
                                        }}

                                    >Yes</button>

                                </div>

                                <div class="level-left">
                                    <a class="level-item" aria-label="reply" class="button is-danger"
                                        onClick={() => {
                                            this.disLikeFilmhandler()
                                        }}

                                    >No</a>

                                </div>
                            </nav>
                        </div>
                    </div>
                    <div style={{ "float": "left", "margin-left": "100px", "width": "400px" }}>
                        <h1 class="title is-1">Are you sure?</h1>
                        <div class="box">

                            <div class="content">
                                <figure class="image is-4by5">
                                    <img src={`http://image.tmdb.org/t/p/w185//${this.state.recentlyDisliked.poster_path}`} alt="Image" />
                                </figure>

                            </div>
                        </div>

                        <div>

                            <h1 class="title is-2">{`Liked Films:${this.state.likedFilms.length}`}</h1>

                            <button class="button is-link" onClick={() => {
                                this.pickFilmhandler()
                            }}

                            > Pick a Film!</button>

                        </div>

                    </div>
                </div>
                {
                    this.state.PickFilmflag > 0 ?

                        <div class="modal is-active">
                            <div class="modal-background"></div>
                            <div class="modal-card">

                                <header class="modal-card-head">
                                    <p class="modal-card-title">Selected Film</p>
                                    <button class="delete" aria-label="close"></button>
                                </header>

                                <section class="modal-card-body">
                                    {
                                        <div class="content">
                                            <figure class="image is-4by5">
                                                <img src={`http://image.tmdb.org/t/p/w185//${this.state.selectedFilm.poster_path}`} alt="Image" />
                                            </figure>

                                        </div>

                                    }
                                </section>

                                <footer class="modal-card-foot">
                                    <button class="button is-success"
                                        onClick={() => {
                                            this.getPickedFilmURLS()
                                        }}

                                    >Watch</button>
                                    <button class="button"


                                    >Cancel</button>
                                </footer>

                            </div>
                        </div> : <div></div>
                }
            </div>



        )
    }
}
export default SearchResults