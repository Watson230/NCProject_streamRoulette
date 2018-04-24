import React, { Component } from 'react';
import NavBar from './NavBar'
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom'


class UserInfo  extends Component{


    state= {
        user:''
    }

    userInfoInputHandler =(name)=>{

        this.setState({
            user:name
        })

    }

    render(){

        return (
            <div>
                       
                    <div class="field">
                        <label class="label">User</label>
                       
                            <input class="input" type="text" placeholder="user" value={this.state.user} 
                            
                            onChange={event => {
                              
                                this.userInfoInputHandler(event.target.value)
                                    console.log(this.state)
                            }}
                            
                            />
                            
                       
                    </div>

                    <div class="field">
                        <p class="control">
                            <button class="button is-success"
                            onClick={()=>{
                                this.props.createUser(this.state.user)

                            }}
                            >
                                Login
                            </button>
                        </p>
                    </div>
                </div>

                
        )




    }
}

export default UserInfo