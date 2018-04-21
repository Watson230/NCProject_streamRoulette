import React, { Component } from 'react';
import NavBar from './NavBar'
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom'


class UserForm extends Component {

    state = {

        genres: [],
        searchFlag: 0,
        searchTabClass: 'is-active'

    }

    userInputHandler(key, value) {


        this.setState(Object.assign({}, this.state, {
            [key]: value
        }))

        console.log(this.state)
    }

    submitQueries = () => {
        let usedQueries = Object.keys(this.state)

        let queryString = usedQueries.reduce((acc, key) => {
            if (key === 'keywords') acc = acc + `with_keywords=${this.state.keywords}`
            if (key === 'Year') acc = acc + `primary_release_year=${parseInt(this.state.Year)}`
            if (key === 'genre') acc = acc + `with_genres=${this.state.genre.split(':')[1]}`



            acc = acc + '&'

            return acc
        }, '')

        this.setState(Object.assign({}, this.state, {

            submitFlag: 1,
            queriesString: queryString
        }))




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
            <div>
                <NavBar />
                <div style={{ "width": "700px", "margin-top": "100px", "border": "solid", "float": "left", "margin-left": "100px", "height": "760px", "margin-bottom": "100px" }}>
                    <div class="tabs">
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
                            ><a>discover</a></li>
                        </ul>
                    </div>

                    {this.state.searchFlag > 0 ?
                        <div class="discover">
                            <h1 class="is title">Search for a film</h1>
                            <div style={{ "margin-bottom": "20px" }}>
                                <div class="field">
                                    <label class="label">User</label>
                                    <div class="control">
                                        <input class="input" type="text" placeholder="keywords" value={this.state.user}
                                            onChange={event => {
                                                this.userInputHandler(event.target.placeholder, event.target.value)

                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Keywords</label>
                                <div class="control">
                                    <input class="input" type="text" placeholder="keywords" value={this.state.keywords}
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
                                    <input class="input" type="text" placeholder="rating" value={this.state.rating}
                                        onChange={event => {

                                            this.userInputHandler(event.target.placeholder, event.target.value)


                                        }} />
                                </div>
                            </div>

                            <div class="field">
                                <label class="label">Release Date</label>
                                <div class="control">
                                    <input class="input" type="text" placeholder="Year" value={this.state.Year}
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
                                    <input class="input" type="text" placeholder="starring" value={this.state.starring}
                                        onChange={event => {

                                            this.userInputHandler(event.target.placeholder, event.target.value)


                                        }} />
                                </div>
                            </div>

                            <div class="field">
                                <label class="label">Director</label>
                                <div class="control">
                                    <input class="input" type="text" placeholder="director" value={this.state.director}
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
                                    <input class="input" type="text" placeholder="title" value={this.state.title}
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
                                    <p class="modal-card-title">Modal title</p>
                                    <button class="delete" aria-label="close"></button>
                                </header>
                                <section class="modal-card-body">
                                    <p>Search complelete!</p>
                                </section>
                                <footer class="modal-card-foot">
                                    <Link to={`/search/${this.state.queriesString}/results`}><button class="button is-success">See Results</button></Link>
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

