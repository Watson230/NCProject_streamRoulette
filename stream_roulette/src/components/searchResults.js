import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import NavBar from './NavBar'
import Film from "./film"
import Linkify from 'react-linkify'

class SearchResults extends Component {

    state = {
        searchResults: [],
        currentFilm: [],
        likedFilms: [],
        recentlyDisliked: [],
        PickFilmflag: false,
        getFilmUrl: false,
        endOfSearchResults: false,
        user: this.props.match.params.user
    }

    componentDidMount() {
        let searchQuery;
        // let user = this.props.match.params.user

        if (this.props.match.params.searchQueries) {
            searchQuery = this.props.match.params.searchQueries.slice(0, this.props.match.params.searchQueries.length - 1)
        }

        console.log('search queries', searchQuery)
        if (searchQuery.split('=')[0] === 'term') {
            let title = searchQuery.split('=')[1]
            this.getPickedFilmURLS(title)
        }
        else fetch(`https://api.themoviedb.org/3/discover/movie?api_key=b714d4feb8707f01b7dd25f75051d8a6&language=en-US&sort_by=popularity.desc&include_adult=false&primary_release_date.lte=2017&include_video=false&${searchQuery}`)
            .then(res => {
                console.log(res)
                return res.json();
            })
            .then(body => {
                this.setState({

                    searchResults: body.results,
                    currentFilm: body.results[0],
                    likedFilms: [],
                    PickFilmflag: false,
                    selectedFilm: [],
                    recentlyDisliked: this.state.recentlyDisliked,
                    getFilmUrl: false

                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    LikeFilmHandler = () => {
        let film = [this.state.currentFilm]
        this.findFilm(film[0])

        this.likedFilmUserUpdate()


        if (this.state.searchResults.slice(1, this.state.searchResults.length).length < 1) {

            this.setState({

                searchResults: [],
                currentFilm: this.state.currentFilm,
                likedFilms: this.state.likedFilms.concat(film),
                PickFilmflag: false,
                selectedFilm: [],
                recentlyDisliked: this.state.recentlyDisliked,
                getFilmUrl: false,
                endOfSearchResults: true

            })

        }

        else this.setState({

            searchResults: this.state.searchResults.slice(1, this.state.searchResults.length),
            currentFilm: this.state.searchResults[0],
            likedFilms: this.state.likedFilms.concat(film),
            PickFilmflag: false,
            selectedFilm: [],
            recentlyDisliked: this.state.recentlyDisliked,
            getFilmUrl: false,
            endOfSearchResults: false,
        })
    }

    postNewFilm = (film) => {

        console.log('new film created')
        fetch(`http://localhost:4000/api/film`, {

            method: 'POST',
            body: JSON.stringify({
                film
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            type: 'cors'
        })
            .then(res => {

                return res.json();
            })
            .then(body => {

                // this.setState({

                //     userInfo: body,
                //     user: user

                // })
                console.log(body)
            }

            )
            .catch(err => {
                console.log(err)

            })



    }

    findFilm = (film) => {
        console.log('findfilmID', film.id)

        fetch(`http://localhost:4000/api/film/find/${film.id}`, {

            type: 'cors'
        })
            .then(res => {

                return res.json();
            })
            .then(body => {
                console.log(body)
                if (body.length > 0) {
                    console.log('film exists')

                }
                else this.postNewFilm(film)

            }

            )
            .catch(err => {
                console.log(err)
            })


    }

    updateFilmLikes = (film) => {

        console.log('likedfilm', film)

        fetch(`http://localhost:4000/api/films/${film.id}/likes`, {

            method: 'PUT',
            body: JSON.stringify({
                film: film
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            type: 'cors'
        })
            .then(res => {

                return res.json();
            })
            .then(body => {
                console.log('liked film', body)
                // this.setState({

                //     likedFilms: this.state.likedFilms.concat(body)

                // })

            }

            )
            .catch(err => {
                console.log(err)
            })


    }

    updateFilmDislikes = (film) => {

        console.log('dislikedfilm', film)

        fetch(`http://localhost:4000/api/films/${film.id}/dislikes`, {

            method: 'PUT',
            body: JSON.stringify({
                film: film
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            type: 'cors'
        })
            .then(res => {

                return res.json();
            })
            .then(body => {
                console.log('liked film', body)
                // this.setState({

                //     likedFilms: this.state.likedFilms.concat(body)

                // })

            }

            )
            .catch(err => {
                console.log(err)
            })


    }

    likedFilmUserUpdate = () => {

        fetch(`http://localhost:4000/api/search/results/liked/${this.state.user}`, {

            method: 'PUT',
            body: JSON.stringify({
                film: this.state.currentFilm
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            type: 'cors'
        })
            .then(res => {

                return res.json();
            })
            .then(body => {

                this.updateFilmLikes(this.state.currentFilm)

                // this.setState({

                //     likedFilms: this.state.likedFilms.concat(body)

                // })

            }

            )
            .catch(err => {
                console.log(err)
            })



    }

    disLikeFilmhandler = () => {

        let film = this.state.currentFilm

        this.findFilm(film)


        this.dislikedFilmUserUpdate();

        this.setState({

            searchResults: this.state.searchResults.slice(1, this.state.searchResults.length),
            currentFilm: this.state.searchResults[0],
            likedFilms: this.state.likedFilms,

            PickFilmflag: false,
            selectedFilm: [],
            recentlyDisliked: film,
            getFilmUrl: false
        })

    }

    dislikedFilmUserUpdate = () => {
        console.log(this.state.currentFilm)
        let film = this.state.currentFilm
        fetch(`http://localhost:4000/api/search/results/disliked/${this.state.user}`, {

            method: 'PUT',
            body: JSON.stringify({
                film: this.state.currentFilm
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            type: 'cors'
        })
            .then(res => {
                console.log(res)
                return res.json();
            })
            .then(body => {
                console.log(body)
                this.updateFilmDislikes(this.state.currentFilm)

                console.log(body)
            }

            )
            .catch(err => {
                console.log(err)
            })



    }

    pickFilmhandler = () => {

        this.setState({

            searchResults: this.state.searchResults,
            currentFilm: this.state.currentFilm,
            PickFilmflag: true,
            likedFilms: this.state.likedFilms,
            selectedFilm: this.state.likedFilms[Math.floor(Math.random() * (this.state.likedFilms.length - 1))],
            recentlyDisliked: this.state.recentlyDisliked,
            getFilmUrl: false,
            endOfSearchResults: false

        })
        console.log(this.state.selectedFilm)
        console.log(this.state.likedFilms)

    }

    getPickedFilmURLS = (title) => {
        if (!title) title = this.state.selectedFilm.title
        console.log('title', title)

        this.watchedFilmsUserUpdate()

        fetch(`https://utelly-tv-shows-and-movies-availability-v1.p.mashape.com/lookup?term=${title}`,
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
                console.log(body)
                this.setState(Object.assign({}, this.state, {
                    PickFilmflag: false,
                    getFilmUrl: true,
                    endOfSearchResults: false,
                    selectedUrl: body.results[0].locations
                }
                ))

                console.log(this.state)
            })
            .catch(err => {
                console.log(err)

            })

        // fetch(`https://utelly-tv-shows-and-movies-availability-v1.p.mashape.com/lookup?term=${title}`,
        // {
        //     headers: new Headers({
        //         'Accept': 'application/json',
        //         'X-Mashape-Key': "lbLD5PKDXhmshZXMNJgHsm1ahtF2p1fYk5Sjsn8XmYhTzIKQYn"
        //     }),
        //     type: 'cors',
        //     method:"PUT"

        // })
        // .then(res => {        
        //     return res.json();
        // })
        // .then(body => {
        //     console.log(body)
        //     this.setState(Object.assign({}, this.state, {
        //         PickFilmflag: false,
        //         getFilmUrl: true,
        //         selectedUrl:body.results[0].locations
        //     }
        //     ))

        //     console.log(this.state)
        // })
        // .catch(err => {
        //     console.log(err)

        // })

    }

    watchedFilmsUserUpdate = () => {
        console.log(this.state.selectedFilm)
        fetch(`http://localhost:4000/api/search/results/${this.state.user}/watched`, {

            method: 'PUT',
            body: JSON.stringify({
                film: this.state.selectedFilm
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            type: 'cors'
        })
            .then(res => {
                console.log(res)
                return res.json();
            })
            .then(body => {


                console.log(body)
            }

            )
            .catch(err => {
                console.log(err)
            })




    }

    render() {

        return (
            <div>
                <div>
                    <NavBar />
                    <div class="columns">>

                    <div style={{ "width": "30%", "height": "100%", "margin-right": "100px", "margin-left": "20px", "margin-top": "20px" }} class="column">
                            <div class="box">
                                <h1 class="title is-1" >Film Info</h1>
                            </div>
                            <div class="box">
                                <h2 class="title is-2">{this.state.currentFilm.title}</h2>
                                <p>{this.state.currentFilm.overview}</p>
                            </div>

                            <div class="box" style={{ "text-align": "right" }}>
                                <div style={{ "text-align": "left" }}>
                                    <h1 class="title is-2">{`Liked Films:${this.state.likedFilms.length}`}</h1>
                                </div>
                                <div style={{ "text-align": "right" }}>
                                    <button class="button is-link" onClick={() => {
                                        this.pickFilmhandler()
                                    }}

                                    > Pick a Film!</button>
                                </div>

                            </div>
                        </div>


                        <div style={{ "width": "600px", "height": "800px", "margin": "0 auto", "margin-top": "20px" }} class="column">
                            <div>
                                <div class="box">

                                    <h1 class="title is-1">{`Search Results: ${this.state.searchResults.length + 1}`}</h1>
                                </div>
                                <div class="box">

                                    <div class="content">
                                        <figure class="image is-4by5">
                                            <img src={`http://image.tmdb.org/t/p/w185//${this.state.currentFilm.poster_path}`} alt="Image" />
                                        </figure>

                                    </div>
                                    <nav class="level is-mobile">
                                        <div class="level-right">
                                            <button class="level-item" class="button is-success" aria-label="reply"
                                                onClick={() => { this.LikeFilmHandler() }} >Yes</button>
                                        </div>

                                        <div class="level-center">
                                            <p class="level-item"> Watch? </p>
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
                        </div>




                        <div style={{ "margin-left": "100px", "width": "400px", "margin-right": "100px", "margin-top": "20px" }} class="column">
                            <div class="box">
                                <h1 class="title is-1">Are you sure?</h1>
                            </div>
                            <div class="box">

                                <div class="content">
                                    <figure class="image is-4by5">
                                        <img src={`http://image.tmdb.org/t/p/w185//${this.state.recentlyDisliked.poster_path}`} alt="Image" />
                                    </figure>

                                </div>
                            </div>



                        </div>
                    </div>
                    {
                        this.state.PickFilmflag ?

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
                                            onClick={() => {
                                                this.setState(Object.assign({}, this.state, {
                                                    PickFilmflag: false,
                                                    getFilmUrl: false,

                                                }
                                                ))
                                            }}

                                        >Cancel</button>
                                    </footer>

                                </div>
                            </div> : <div></div>
                    }

                    {

                        this.state.getFilmUrl ?

                            <div class="modal is-active">
                                <div class="modal-background"></div>
                                <div class="modal-card">
                                    <header class="modal-card-head">
                                        <p class="modal-card-title">Watch it Here</p>
                                        <button class="delete" aria-label="close"></button>
                                    </header>
                                    <section class="modal-card-body">
                                        {

                                            <ul>
                                                {
                                                    this.state.selectedUrl.map(result => {
                                                        console.log(this.state)
                                                        let Link;
                                                        if (result.url) {
                                                            Link = <Linkify>{result.url.split("//")[1]}</Linkify>

                                                            return <li>{`${result.name}:`}{Link}</li>
                                                        }




                                                    })
                                                }


                                            </ul>

                                        }

                                    </section>
                                    <footer class="modal-card-foot">

                                        <Link to={"/"}> <button class="button"
                                            onClick={() => {
                                                this.setState(Object.assign({}, this.state, {
                                                    PickFilmflag: false,
                                                    getFilmUrl: false,

                                                }
                                                ))
                                            }}
                                        >Cancel</button></Link>
                                    </footer>
                                </div>
                            </div>

                            : <div></div>

                    }

                    {
                        this.state.endOfSearchResults ?
                            <div>
                                <div class="modal is-active">
                                    <div class="modal-background"></div>
                                    <div class="modal-card">
                                        <header class="modal-card-head">
                                            <p class="modal-card-title">Seen nothing you like?</p>
                                            <button class="delete" aria-label="close"></button>
                                        </header>
                                        <section class="modal-card-body">
                                            {

                                                <p>End of Search results.....</p>

                                            }

                                        </section>
                                        <footer class="modal-card-foot">

                                            <button class="button"
                                                onClick={() => {
                                                    this.pickFilmhandler()
                                                }}

                                            >Pick Liked Film</button>

                                            <Link to="/"><button class="button"

                                            >Search Again</button></Link>
                                        </footer>

                                    </div>
                                </div>




                            </div> : null
                    }
                </div>
            </div>



        )
    }
}
export default SearchResults