import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import NavBar  from './NavBar'
import Film  from "./film"


class SearchResults extends Component{

    render(){
        return (
            <div>
            <NavBar/>
            <div style={{"text-align": "left"}}>
            <div style={{"width":"400px","float": "left","margin-right":"100px","margin-left":"20px"}}>
                <h1 class="title is-1" >Film Info</h1>
                <h2 class="title is-2"> Title</h2>
                <p>random info about the film</p>
                </div>
            <div style={{"width":"600px", "height":"800px", "margin":"0 auto","float": "left",}}>
            <h1 class="title is-1">Search Results: 0</h1>
            <div class="box">
                
               
                    
                        <div class="content">
                        <figure class="image is-4by5">
                            <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image" />
                        </figure>
     
                        </div>
                   
           
                        <nav class="level is-mobile">
                            <div class="level-right">
                                <button class="level-item" class="button is-success" aria-label="reply">Yes</button>
                               
                            </div>

                              <div class="level-left">
                                <a class="level-item" aria-label="reply" class="button is-danger">No</a>
                               
                            </div>
                        </nav>
            </div>
            </div>
            <div style={{"float": "left","margin-left":"100px","width":"400px"}}>
            <h1 class="title is-1">Are you sure?</h1>
                <div class="box">
                        <Film/>
                    </div>

            </div>
            </div>
            </div>


        )
    }
}
export default SearchResults