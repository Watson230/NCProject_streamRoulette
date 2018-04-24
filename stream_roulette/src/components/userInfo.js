import React, { Component } from 'react';
import NavBar from './NavBar'
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom'
import Linkify from "react-linkify"




class UserInfo extends Component {


    state = {
        user: '',
        userNotExists: false,
        userInfo: [],
        watchAgain: false,
        watchedFilmUrl: []
    }

    userInfoInputHandler = (name) => {

        this.setState({
            user: name
        })

    }

    SearchUser = () => {
        console.log(this.state.user)
        fetch(`http://localhost:4000/api/user/${this.state.user}`)
            .then(res => {
                console.log(res)
                return res.json();
            })
            .then(body => {
                console.log(body)
                if (body.length < 1) {
                    this.setState({
                        userNotExists: true,
                        userInfo: []

                    })
                }
                else {
                    this.props.UpdateStateUser(this.state.user, body)
                    this.setState({
                        userNotExists: false,
                        userInfo: body

                    })

                }


                console.log(this.state)
            }

            )
            .catch(err => {
                console.log(err)

            })


    }


    prevWatchedURL = (filmName) => {
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
                console.log(body)
                this.setState(Object.assign({}, this.state, {

                    watchedFilmUrl: body.results[0].locations
                }
                ))

                console.log(this.state)
            })
            .catch(err => {
                console.log(err)

            })




    }

    render() {

        return (
            <div>
                <div class="tile is-parent" className="userInfo">
                    <article class="tile is-child notification is-success">
                        <div class="content">

                            <div class="content">
                                <h1 class="is title">User Info</h1>

                                <div class="field">
                                    <label class="label">User</label>

                                    <input class="input" type="text" placeholder="user" value={this.state.user}

                                        onChange={event => {

                                            this.userInfoInputHandler(event.target.value)
                                            console.log(this.state)
                                        }}

                                    />


                                </div>

                                <div class="field">
                                    <p class="control">
                                        <button class="button is-white"
                                            onClick={() => {
                                                // this.props.createUser(this.state.user)
                                                this.SearchUser()

                                            }}
                                        >
                                            Search
                            </button>
                                    </p>
                                </div>

                                <div>
                                    {this.state.userInfo.length > 0 ?
                                        <div >


                                            <p class="subtitle">{`${this.state.user}'s film history`}</p>
                                            <p class="subtitle"> Recently Watched</p> 
                                            <div class="content">

                                                <ul>
                                                    {
                                                        this.state.userInfo[0].watchedFilms.slice(this.state.userInfo[0].watchedFilms.length - 5).reverse().map(film => {

                                                            if (film) return <li><a
                                                                onClick={() => {

                                                                    this.setState(Object.assign({}, this.state, {
                                                                        watchAgain: true,
                                                                        userNotExists: false,


                                                                    }))

                                                                    this.prevWatchedURL(film.title)

                                                                }}

                                                            >{film.title}</a></li>

                                                        }
                                                        )
                                                    }
                                                </ul>
                                                <div>
                                                    <p class="subtitle">Recently liked </p>
                                                    <ul>
                                                        {
                                                            this.state.userInfo[0].likedFilms.slice(this.state.userInfo[0].likedFilms.length - 5).reverse().map(film => {

                                                                return <li>{film.title}</li>

                                                            })

                                                        }

                                                    </ul>
                                                </div>

                                                <div>
                                                    <p class="subtitle"> Recently disliked </p>
                                                    <ul>
                                                        {
                                                            this.state.userInfo[0].dislikedFilms.slice(this.state.userInfo[0].dislikedFilms.length - 5).reverse().map(film => {

                                                                return <li>{film.title}</li>

                                                            })

                                                        }

                                                    </ul>
                                                </div>
                                            </div>


                                        </div>
                                        : null}
                                </div>

                                <div>
                                    {this.state.watchAgain ?
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
                                                                        console.log('res', result)
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

                                                        <Link to={"/"}
                                                            onClick={() => {
                                                                this.setState({
                                                                    watchAgain: false,
                                                                    user: this.state.user
                                                                })


                                                            }}
                                                        ><button class="button">Cancel</button></Link>
                                                    </footer>
                                                </div>
                                            </div >

                                        </div> :
                                        null
                                    }
                                </div>


                                {
                                    this.state.userNotExists ? <div>
                                        <div class="modal is-active">
                                            <div class="modal-background"></div>
                                            <div class="modal-card">
                                                <header class="modal-card-head">
                                                    <p class="modal-card-title">User Not Found</p>
                                                    <button class="delete" aria-label="close"></button>
                                                </header>
                                                <section class="modal-card-body">
                                                    <p>Please search for another user or create a new one below!</p>
                                                </section>
                                                <footer class="modal-card-foot">
                                                    <button class="button is-success"
                                                        onClick={() => {
                                                            this.props.createUser(this.state.user)
                                                            this.setState({
                                                                userNotExists: false,
                                                                user: this.state.user
                                                            })


                                                        }}
                                                    >Create User</button>

                                                    <Link to={"/"}
                                                        onClick={() => {
                                                            this.setState({
                                                                userNotExists: false,
                                                                user: ''
                                                            })


                                                        }}
                                                    ><button class="button">Cancel</button></Link>
                                                </footer>
                                            </div>
                                        </div >
                                    </div> : null
                                }
                            </div>
                        </div>
                    </article>
                </div>

            </div >

        )




    }
}

export default UserInfo