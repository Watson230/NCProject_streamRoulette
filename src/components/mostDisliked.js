import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import PT from 'prop-types'

import NavBar from './NavBar'

import Linkify from "react-linkify"

class MostDisliked extends Component {

    state = {
        mostDislikedFilms: []
    }


    componentWillMount() {

        fetch(`http://localhost:4000/api/film/disliked`)
            .then(res => {
                console.log(res)
                return res.json();
            })
            .then(body => {

                let films = body.map(film => film.film)

                this.setState({

                    mostDislikedFilms: films,
                    currentFilm: films[Math.floor(Math.random() * (this.state.mostDislikedFilms.length - 1))]

                })

            })
            .catch(err => {
                console.log(err)
            })


    }


    componentDidUpdate() {
        setTimeout(() => {
            this.mostDislikedFilms()
        }, 7000)
    }

    getFilmURL = (filmName) => {
        fetch(`https://utelly-tv-shows-and-movies-availability-v1.p.mashape.com/lookup?term=${filmName}`,
            {
                headers: new Headers({
                    'Accept': 'application/json',
                    'X-Mashape-Key': "lbLD5PKDXhmshZXMNJgHsm1ahtF2p1fYk5Sjsn8XmYhTzIKQYn"
                }),
                type: 'cors'

            })
            .then(res => {
                return res.json();
            })
            .then(body => {
                console.log('fetch', body)
                this.setState(Object.assign({}, this.state, {

                    watchedFilmUrl: body.results[0].locations
                }
                ))
            })
            .catch(err => {
                console.log(err)

            })
    }


    mostDislikedFilms = () => {

        let filmNum = Math.floor(Math.random() * (this.state.mostDislikedFilms.length - 1))
        this.setState({

            mostDislikedFilms: this.state.mostDislikedFilms,
            currentFilm: this.state.mostDislikedFilms[filmNum]

        })

    }

    watchNowButtonHandler = (arg) => {

        this.setState({

            mostPopularFilms: this.state.mostPopularFilms,
            watchFilm: arg,
            watchedFilmUrl: this.state.watchedFilmUrl,
            currentFilm: this.state.currentFilm

        })
    }


    render() {



        return (
            <div style={{ "width": "120%", "height": "100%", }} >


                {this.state.currentFilm ?

                    <div>
                        <div class="tile is-parent">
                            <article class="tile is-child notification is-black">
                                <div  style={{ "text-align": "center", "margin-bottom": "10px" }}>
                                    <p class="title" style={{"fomt-size":"1.5rem"}}>Most Disliked</p>
                                    </div>
                                       <div style={{"margin-bottom":"10px"}}>
                                    <p class="subtitle">{`${this.state.currentFilm.title}`}</p>
                                </div>
                                <figure class="image is-4by5">
                                    <img src={`http://image.tmdb.org/t/p/w185//${this.state.currentFilm.poster_path}`} alt="Image" />
                                </figure>
                            </article>
                        </div>
                        
                        <div style={{"text-align": "center"}}>
                        <button
                        
                        onClick={()=>{
                            this.watchNowButtonHandler(true)
                            console.log(this.state.currentFilm)
                            this.getFilmURL(this.state.currentFilm.title)
                        }}
                        class = "button is-rounded"
                        > Show Some Love </button>
                        </div>

                    </div>


                    : <div class="tile is-parent">
                        <article class="tile is-child notification is-black">
                            <p class="title">loading.....</p>


                        </article>


                    </div>
                }

                {
                    this.state.watchFilm ?
                        <div>
                            <div class="modal is-active">
                                <div class="modal-background"></div>
                                <div class="modal-card">
                                    <header class="modal-card-head">
                                        <p class="modal-card-title">You can watch it again here</p>
                                        <button class="delete" aria-label="close"></button>
                                    </header>
                                    <section class="modal-card-body">
                                        {this.state.watchedFilmUrl ?
                                            <ul style={{ "color": 'black' }}>
                                                {
                                                    this.state.watchedFilmUrl.map(result => {
                                                        let Link;
                                                        if (result.url) {

                                                            Link = <Linkify>{result.url.split("//")[1]}</Linkify>

                                                            return <li>{`${result.name}:`}{Link}</li>
                                                        }

                                                    })

                                                }
                                            </ul> :
                                            null

                                        }

                                    </section>
                                    <footer class="modal-card-foot">

                                        <button class="button"
                                            onClick={() => {
                                                this.watchNowButtonHandler(false)

                                            }}
                                        >Cancel</button>
                                    </footer>
                                </div>
                            </div >


                        </div> : <div></div>
                }


            </div>


        )
    }

}

export default MostDisliked