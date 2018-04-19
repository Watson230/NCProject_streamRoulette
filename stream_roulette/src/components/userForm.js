import React, { Component } from 'react';
import NavBar from './NavBar'


class UserForm extends Component {

    state = {

        genres: [],
    




    }

    userInputHandler(key ,value) {


        this.setState(Object.assign({}, this.state, {
            [key]: value
        }))

        console.log(this.state)
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
                <div style={{ "width": "700px", "margin-top": "100px", "border": "solid", "float": "left", "margin-left": "100px", "height": "700px", "margin-bottom": "100px" }}>
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
                                                
                                                return <option>{genre.name}</option>
                                                
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
                            <button class="button is-link">Submit</button>
                        </div>
                        <div class="control">
                            <button class="button is-text">Cancel</button>
                        </div>
                    </div>
                </div>

            </div>
        )
    }

}

export default UserForm

