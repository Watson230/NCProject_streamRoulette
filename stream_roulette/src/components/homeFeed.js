import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import NavBar from './NavBar'
import PT from 'prop-types';

import MostPopular from './mostPopular'
import UserForm from './userForm'
import UserInfo from './userInfo'



class HomeFeed extends Component {

    state = {
        userName: 'random'
    }



    render() {



        return (
            <div>
               <NavBar/>
                <div class="columns"  >
                    
                    <div class="column is-two-thirds" style={{ "display": "block", "margin-top": "50px" , "margin-left": "20px" }}>
                        <UserForm user={this.state.userName} />
                    </div>

                    <div class="column" style={{  "margin-top": "50px" , "margin-left": "20px" }}>
                        <MostPopular />
                    </div>
                </div>
            </div>

        )
    }
}

export default HomeFeed