import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import PT from 'prop-types';




class Form extends Component {



    render() {



        return (

            <div style ={{"display":"block"}}>

            <div style={{ "width": "700px", "margin-top": "100px", "border": "solid", "float":"left","margin-left": "100px","height": "700px", }}>
                <div class="field">
                    <label class="label">Title</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="Text input" />
                    </div>
                </div>
                <div class="field">
                    <label class="label">Genre</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="Text input" />
                    </div>
                </div>
                <div class="field">
                    <label class="label">Rating</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="Text input" />
                    </div>
                </div>

                <div class="field">
                    <label class="label">Year</label>
                    <div class="control">
                        <div class="select">
                            <select>
                                <option>Select dropdown</option>
                                <option>With options</option>
                            </select>
                        </div>
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

            <div style ={{"border":"solid", "width": "700px", "height": "700px", "float":"right","margin-top": "100px","margin-right": "100px" }} >
            <h1 className ="title"> Recently watched</h1>

                </div>

            </div>
        )
    }
}

export default Form