import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import NavBar from './NavBar'
import PT from 'prop-types';

import MostPopular from './mostPopular'
import MostDisliked from './mostDisliked'
import MostWatched from './mostWatched'
import UserForm from './userForm'
import UserInfo from './userInfo'





class HomeFeed extends Component {

    state = {
        userName: 'random'
    }

 



    render() {



        return (
            <div class = "" style={{"width": "100%", "height": "100%"}}>
            <div  style={{"width": "100%"}} >
               <NavBar/>
               </div>
               <div class="container">
                <div class="columns"style={{ "margin-bottom":"100px","margin-top":"80px"}}>
                    
                    <div class="column">
                    <div  style={{  "margin-top": "50px" , "width": "100%", "height": "100%" }}>
                        <UserForm user={this.state.userName} />
                        </div>
                    </div>

                    <div class="column is-four-fifths" style={{ "margin-bottom":"100px",}}>
                    
                    <div class="columns">

                    <div class="column" style={{  "margin-top": "50px" , "margin-left": "20px" ,"margin-right": "20px"  }}>
                        <MostWatched />
                    </div>
                    <div class="column" style={{  "margin-top": "50px" , "margin-left": "20px","margin-right": "20px"   }}>
                        <MostPopular />
                    </div>

                    <div class="column" style={{  "margin-top": "50px" , "margin-left": "20px", "margin-right": "20px"  }}>
                        <MostDisliked />
                    </div>
                    </div>
                        </div>
                </div>
                </div>
            </div>

        )
    }
}

export default HomeFeed