import React, { Component } from 'react';
import NavBar from './NavBar'
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom'
import UserInfo from './userInfo'

const API_URL = 'https://safe-brook-17817.herokuapp.com/api'
class UserForm extends Component {

    state = {

        genres: [],
        searchFlag: 1,

        userInfo: [],
        discoverTabClass: 'is-active',
        selectSearchFlag: false,
        queries: {}

    }

    userInputHandler(key, value) {

        const newState = Object.assign({}, this.state)

        const newQueries = Object.assign({}, newState.queries)

        newQueries[key] = value;
        newState.queries = newQueries;

        this.setState(newState, () => console.log('state', this.state));


    }

    submitQueries = () => {

        if (!this.state.user) {

            this.setState(Object.assign({}, this.state, {

                user: 'default'
            }), () => {
                console.log(this.state)
                this.saveQueries()
            })
        }

        else this.saveQueries()



        let usedQueries = Object.keys(this.state.queries)
        let queryString = usedQueries.reduce((acc, key) => {

            if (key === 'keywords') acc = acc + `with_keywords=${this.state.queries.keywords}` + '&';
            if (key === 'year') {
                if(parseInt(this.state.queries.year)< 2018) acc = acc + `primary_release_year=${parseInt(this.state.queries.year)}` + '&';
                return acc
            }
            if (key === 'genre') acc = acc + `with_genres=${this.state.queries.genre.split(':')[1]}` + '&';

            if (key === 'search') acc = acc + `term=${this.state.search}`;





            return acc
        }, '')

        this.setState(Object.assign({}, this.state, {

            submitFlag: 1,
            queriesString: queryString
        }))

        console.log(queryString)
        console.log(this.state)


    }

    searchTabHandler = (num, tab) => {

        if (tab === 'search') {
            this.setState(Object.assign({}, this.state, {
                searchFlag: num,
                searchTabClass: 'is-active',
                discoverTabClass: null


            }))
        }


        else {

            this.setState(Object.assign({}, this.state, {
                searchFlag: num,
                searchTabClass: null,
                discoverTabClass: 'is-active'


            }))

        }

    }

    saveQueries = () => {

        fetch(`${API_URL}/search/${this.state.user}/queries`, {

            method: 'POST',
            body: JSON.stringify({
                queries: this.state.queries,
                userName: this.state.user
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

    userSelectSearchHandler = (arg) => {
        this.setState({
            genres: this.state.genres,
            searchFlag: this.state.searchFlag,

            userInfo: this.state.userInfo,
            discoverTabClass: 'is-active',
            selectSearchFlag: arg,
            queries: this.state.queries
        })


    }


    CreateUser = (user) => {

        fetch(`${API_URL}/user`, {

            method: 'POST',
            body: JSON.stringify({
                userName: user
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

                this.setState({

                    userInfo: body,
                    user: user

                })
                console.log(this.state)
            }

            )
            .catch(err => {
                console.log(err)

            })


    }

    UpdateStateUser = (user, userInfo) => {

        this.setState(Object.assign({}, this.state, {
            user: user,
            userInfo: userInfo
        }))

    }


    componentDidMount() {

        fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=b714d4feb8707f01b7dd25f75051d8a6&language=en-US')
            .then(res => {
                console.log(res)
                return res.json();
            })
            .then(body => {

                this.setState({

                    genres: body.genres

                })
            })
            .catch(err => {
                console.log(err)

            })

    }

  

    render() {
        return (
            <div >


                <div >
                    <div  style={{"text-align":"center", "margin-bottom":"20px"}}>
                    <button class="button is-black is-large is-rounded"
                        onClick={() => {
                            this.userSelectSearchHandler(true)
                        }}

                    >Search Here</button>
                    </div>
                    <UserInfo createUser={this.CreateUser} UpdateStateUser={this.UpdateStateUser} />
                </div>

                {this.state.selectSearchFlag ?
                <div class="box">
                    <div class="modal is-active"> 
                        <div class="modal-background"></div>
                        <div class="modal-card">
                            <header class="modal-card-head">
                                <p class="modal-card-title">Search</p>
                                <button class="delete" aria-label="close"></button>
                            </header>
                            <section class="modal-card-body">
                                <div  style={{ "width": "100%", "height": "100%", "margin": "0,auto" }}>

                                    <h1 class="is title">Search for a film</h1>

                                    <div class="tabs is-centered is-boxed">
                                        <ul>
                                            <li class={`${this.state.discoverTabClass}`}
                                                onClick={() => {

                                                    this.searchTabHandler(1, 'discover')
                                                }}
                                            ><a>Discover</a></li>
                                            <li class={`${this.state.searchTabClass}`}
                                                onClick={() => {

                                                    this.searchTabHandler(0, 'search')
                                                }}
                                            ><a>Search</a></li>
                                        </ul>
                                    </div>

                                    {this.state.searchFlag > 0 ?
                                        <div class="discover">

                                            <div class="field">
                                                <label class="label">Keywords</label>
                                                <div class="control">
                                                    <input class="input" type="text" placeholder="keywords" value={this.state.queries.keywords}
                                                        onChange={event => {
                                                            this.userInputHandler(event.target.placeholder, event.target.value)

                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div class="field">
                                                <label class="label">genre</label>
                                                <div class="field has-addons">
                                                    <div class="control is-expanded">
                                                        <div class="select is-fullwidth">
                                                            <select id="genre"

                                                                onChange={event => {
                                                                    console.log(event.target)
                                                                    this.userInputHandler('genre', event.target.value)


                                                                }}>
                                                                <option>Choose one</option>
                                                                {this.state.genres.map(genre => {

                                                                    return <option>{`${genre.name} - id:${genre.id}`}</option>

                                                                })}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                            {/* <div class="field">
                                                <label class="label">Rating</label>
                                                <div class="control">
                                                    <input class="input" type="text" placeholder="rating" value={this.state.queries.rating}
                                                        onChange={event => {

                                                            this.userInputHandler(event.target.placeholder, event.target.value)


                                                        }} />
                                                </div>
                                            </div> */}

                                            <div class="field">
                                                <label class="label">Release Date</label>
                                                <div class="control">
                                                    <input class="input" type="text" placeholder="year" value={this.state.queries.year}
                                                        onChange={event => {

                                                            this.userInputHandler(event.target.placeholder, event.target.value)


                                                        }}
                                                    />
                                                </div>


                                                <div class="field">
                                                    <input class="is-checkradio" id="exampleRadioInline1" type="radio" name="exampleRadioInline" checked="checked" />
                                                    <label for="exampleRadioInline1">Before</label>
                                                    <input class="is-checkradio" id="exampleRadioInline2" type="radio" name="exampleRadioInline" />
                                                    <label for="exampleRadioInline2">After</label>
                                                    <input class="is-checkradio" id="exampleRadioInline3" type="radio" name="exampleRadioInline" />
                                                    <label for="exampleRadioInline2">Only</label>
                                                </div>
                                            </div>

                                            {/* <div class="field">
                                                <label class="label">Starring</label>
                                                <div class="control">
                                                    <input class="input" type="text" placeholder="starring" value={this.state.queries.starring}
                                                        onChange={event => {

                                                            this.userInputHandler(event.target.placeholder, event.target.value)


                                                        }} />
                                                </div>
                                            </div>

                                            <div class="field">
                                                <label class="label">Director</label>
                                                <div class="control">
                                                    <input class="input" type="text" placeholder="director" value={this.state.queries.director}
                                                        onChange={event => {

                                                            this.userInputHandler(event.target.placeholder, event.target.value)

                                                        }} />
                                                </div>
                                            </div> */}

                                            <div class="field is-grouped">
                                                <div class="control">
                                                    <button class="button is-link"
                                                        onClick={() => {

                                                            this.submitQueries()

                                                        }}
                                                    >Submit</button>
                                                </div>
                                                <div class="control">
                                                    <button class="button is-text">Cancel</button>
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        <div class="search">

                                            <div class="field">
                                                <label class="label">Title</label>
                                                <div class="control">
                                                    <input class="input" type="text" placeholder="search" value={this.state.queries.search}
                                                        onChange={event => {
                                                            console.log(event.target)
                                                            this.userInputHandler(event.target.placeholder, event.target.value)

                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div class="field is-grouped">
                                                <div class="control">
                                                    <button class="button is-link"
                                                        onClick={() => {

                                                            this.submitQueries()

                                                        }}
                                                    >Submit</button>
                                                </div>
                                                <div class="control">
                                                    <button class="button is-text">Cancel</button>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>

                            </section>
                            <footer class="modal-card-foot">

                                <button class="button"
                                    onClick={() => {
                                        this.userSelectSearchHandler(false)
                                    }}
                                >Cancel</button>
                            </footer>
                        </div>
                    </div>
                    </div>
                    : <div></div>
                }

                {
                    this.state.submitFlag > 0 ? <div>
                        <div class="modal is-active">
                            <div class="modal-background"></div>
                            <div class="modal-card">
                                <header class="modal-card-head">
                                    <p class="modal-card-title">Search</p>
                                    <button class="delete" aria-label="close"></button>
                                </header>
                                <section class="modal-card-body">
                                    <p>Search complelete!</p>
                                </section>
                                <footer class="modal-card-foot">
                                    <Link to={`/${this.state.user}/search/${this.state.queriesString}/results`}><button class="button is-success">See Results</button></Link>
                                    <button class="button">Cancel</button>
                                </footer>
                            </div>
                        </div >
                    </div> : null
                }

            </div>
        )
    }

}

export default UserForm

