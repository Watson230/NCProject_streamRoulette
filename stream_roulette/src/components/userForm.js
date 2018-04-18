import React, { Component } from 'react';
import NavBar from './NavBar'


class UserForm extends Component {

    state = {

        genres: [],
        title: '',
        keywords: '',
        genre: '',
        rating: 0,
        realaseDate: '',
        director:'',
        starring:'',




    }

    userInputHandler(event) {


        this.setState(Object.assign({}, this.state, {
            [event.target.placeholder]: event.target.value
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
                                    this.userInputHandler(event)

                                }}
                            />
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Keywords</label>
                        <div class="control">
                            <input class="input" type="text" placeholder="keywords" value={this.state.keywords}
                                onChange={event => {

                                    this.userInputHandler(event)

                                }}
                            />
                        </div>
                    </div>
                    <div class="field">
                    <label class="label">genre</label>
                    <div class="field has-addons">
                        <div class="control is-expanded">
                            <div class="select is-fullwidth">
                                <select name="genre">
                                    {this.state.genres.map(genre => {

                                        return <option>{genre.name}</option>

                                    })}
                                </select>
                            </div>
                        </div>
                        <div class="control">
                            <button type="submit" class="button is-primary"
                            onClick={(event =>{
                                event.preventDefault()
                                console.log(event)
                            })}
                            
                            >Choose</button>
                        </div>
                    </div>
                    </div>


                    <div class="field">
                        <label class="label">Rating</label>
                        <div class="control">
                            <input class="input" type="text" placeholder="Text input" />
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Release Date</label>
                        <div class="control">
                            <input class="input" type="text" placeholder="date - yyyy/mmm/dd" value={this.state.realaseDate}/>
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
                            <input class="input" type="text" placeholder="Text input" value={this.state.starring}/>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Director</label>
                        <div class="control">
                            <input class="input" type="text" placeholder="Text input" value={this.state.director}/>
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

