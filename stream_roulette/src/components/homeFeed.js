import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import NavBar  from './NavBar'
import PT from 'prop-types';

import MostRecent from '../components/recentlyWatched'
import UserForm from './userForm'



class HomeFeed extends Component {



    render() {



        return (
            <div>
          
                <div style={{ "display": "block" }}>

                    <UserForm />

                </div>

                <div>
                    <MostRecent />

                </div>
            </div>

        )
    }
}

export default HomeFeed