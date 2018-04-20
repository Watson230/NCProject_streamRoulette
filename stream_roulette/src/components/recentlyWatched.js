import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import PT from 'prop-types'
import Film from './film'
import NavBar  from './NavBar'

class MostRecent extends Component {


    render() {


        return (
            <div style={{ "border": "solid", "width": "700px", "height": "700px", "float": "right", "margin-top": "100px", "margin-right": "100px", "margin-bottom": "100px" }} >
                <h1 className="title"> Watch Again?</h1>
                

            </div>
        )
    }
}

export default MostRecent