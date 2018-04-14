import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import PT from 'prop-types';



const Film = (props) => {
   return( <div style={{"max-width":"60%","max-height":"60%"}}>
        <div class="card">
            <div class="card-image">
                <figure class="image is-4by3">
                    <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image" />
                </figure>
            </div>
            <div class="card-content">
                <div class="media">
                    <div class="media-left">
                        <figure class="image is-48x48">
                            <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image" />
                        </figure>
                    </div>
                    <div class="media-content">
                        <p class="title is-4"> film tit;e</p>
                        <p class="subtitle is-6">@johnsmith</p>
                    </div>
                </div>

                <div class="content">
       film Bio
     
                    <br />
                    <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                </div>
            </div>
        </div>
    </div>
   )
}


Film.propTypes = {}

export default Film