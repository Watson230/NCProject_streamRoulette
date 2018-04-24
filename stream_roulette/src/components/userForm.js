import React, { Component } from 'react';
import NavBar from './NavBar'
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom'
import UserInfo from './userInfo'


class UserForm extends Component {

    state = {

        genres: [],
        searchFlag: 0,
        user: 'daveWats',
        userInfo: [],
        searchTabClass: 'is-active',
        queries:{}

    }

    userInputHandler(key,value) {

        const newState = Object.assign({}, this.state)

        const newQueries= Object.assign({}, newState.queries)
        console.log('newQueries', newQueries);
        newQueries[key] = value;
        newState.queries = newQueries;
          console.log('updated queries',newQueries)
        this.setState(newState, () => console.log('state', this.state));

        
    }

    submitQueries = () => {

        console.log(this.state)

        this.saveQueries()

        let usedQueries = Object.keys(this.state.queries)
        let queryString = usedQueries.reduce((acc, key) => {
            if (key === 'keywords') acc = acc + `with_keywords=${this.state.queries.keywords}` + '&';
            if (key === 'Year') acc = acc + `primary_release_year=${parseInt(this.state.queries.Year)}` + '&';
            if (key === 'genre') acc = acc + `with_genres=${this.state.queries.genre.split(':')[1]}` + '&';

            if (key === 'search') acc = acc + `term=${this.state.search}`;





            return acc
        }, '')

        this.setState(Object.assign({}, this.state, {

            submitFlag: 1,
            queriesString: queryString
        }))

        console.log(queryString)
        

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

    saveQueries =()=>{

        fetch(`http://localhost:4000/api/search/${this.state.user}/queries`, {

            method: 'POST',
            body: JSON.stringify({
                queries: this.state.queries,
                userName:this.state.user
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


    CreateUser = () => {
            console.log(this.state.user)
        fetch(`http://localhost:4000/api/user`, {

            method: 'POST',
            body: JSON.stringify({
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

                this.setState({

                    userInfo: body

                })
                console.log(this.state)
            }

            )
            .catch(err => {
                console.log(err)

            })


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
            <div class="columns">
                
                {/* <div class="column" style={{ "margin-left": "20px" }}>
                    <div class="field">
                        <label class="label">User</label>
                        <p class="control has-icons-left has-icons-right">
                            <input class="input" type="email" placeholder="User" value={this.state.user} />
                            <span class="icon is-small is-left">
                                <i class="fas fa-envelope"></i>
                            </span>
                            <span class="icon is-small is-right">
                                <i class="fas fa-check"></i>
                            </span>
                        </p>
                    </div>

                    <div class="field">
                        <p class="control">
                            <button class="button is-success"
                            onClick={()=>{
                                this.CreateUser()

                            }}
                            >
                                Login
                            </button>
                        </p>
                    </div>
                </div> */}
                <div class="column is-one-third">
                <UserInfo createUser ={this.CreateUser}/>
                </div>
                                 

                <div class="column" style={{ "width": "500px",  "height": "760px", "margin":"0,auto"}}>

                
                    <div class="tabs is-centered is-boxed">
                        <ul>
                            <li class={`${this.state.searchTabClass}`}
                                onClick={() => {

                                    this.searchTabHandler(0, 'search')
                                }}
                            ><a>Search</a></li>
                            <li class={`${this.state.discoverTabClass}`}
                                onClick={() => {

                                    this.searchTabHandler(1, 'discover')
                                }}
                            ><a>Discover</a></li>
                        </ul>
                    </div>

                    {this.state.searchFlag > 0 ?
                        <div class="discover">
                            <h1 class="is title">Search for a film</h1>

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


                            <div class="field">
                                <label class="label">Rating</label>
                                <div class="control">
                                    <input class="input" type="text" placeholder="rating" value={this.state.queries.rating}
                                        onChange={event => {

                                            this.userInputHandler(event.target.placeholder, event.target.value)


                                        }} />
                                </div>
                            </div>

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

                            <div class="field">
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
                        :
                        <div class="search">
                            <h1 class="is title">Search for a film</h1>
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

