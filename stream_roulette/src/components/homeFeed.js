import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import NavBar  from './NavBar'
import PT from 'prop-types';

import MostPopular from '../components/mostPopular'
import UserForm from './userForm'



class HomeFeed extends Component {



    render() {



        return (
            <div >
          
                <div style={{ "display": "block" ,"margin-top":"50px"}}>

                    <UserForm />

                </div>

                <div>
                    <MostPopular/>

                </div>
            </div>

        )
    }
}

export default HomeFeed