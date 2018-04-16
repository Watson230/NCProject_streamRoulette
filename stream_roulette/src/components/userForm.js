import React, { Component } from 'react';
import NavBar  from './NavBar'


const UserForm = (props) => {

return(
    <div>
        <NavBar/>
        <div style={{ "width": "700px", "margin-top": "100px", "border": "solid", "float": "left", "margin-left": "100px", "height": "700px", "margin-bottom": "100px" }}>
        <h1 class="is title">Search for a film</h1>
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

    </div>
)

}

export default UserForm

