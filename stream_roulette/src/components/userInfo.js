import React, { Component } from 'react';
import NavBar from './NavBar'
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom'


class UserInfo extends Component {


    state = {
        user: '',
        userNotExists: false,
        userInfo: []
    }

    userInfoInputHandler = (name) => {

        this.setState({
            user: name
        })

    }

    SearchUser = () => {
        console.log(this.state.user)
        fetch(`http://localhost:4000/api/user/${this.state.user}`)
            .then(res => {
                console.log(res)
                return res.json();
            })
            .then(body => {
                console.log(body)
                if (body.length < 1) {
                    this.setState({
                        userNotExists: true,
                        userInfo: []

                    })
                }
                else {
                    this.setState({
                        userNotExists: false,
                        userInfo: body

                    })

                }


                console.log(this.state)
            }

            )
            .catch(err => {
                console.log(err)

            })


    }

    render() {

        return (
            <div>
                <h1 class="is title">User Info</h1>

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
                            onClick={() => {
                                // this.props.createUser(this.state.user)
                                this.SearchUser()

                            }}
                        >
                            Search
                            </button>
                    </p>
                </div>

                <div>
                    {this.state.userInfo.length > 0 ?
                        <div class="tile is-parent">
                            <article class="tile is-child notification is-success">
                                <div class="content">
                                    <p class="title">Recently Watched</p>
                                    <p class="subtitle">{this.state.user}</p>
                                    <div class="content">

                                        <ul>
                                            <li>hello</li>
                                        </ul>
                                    </div>
                                </div>
                            </article>
                        </div>
                        : null}
                </div>


                {
                    this.state.userNotExists ? <div>
                        <div class="modal is-active">
                            <div class="modal-background"></div>
                            <div class="modal-card">
                                <header class="modal-card-head">
                                    <p class="modal-card-title">User Not Found</p>
                                    <button class="delete" aria-label="close"></button>
                                </header>
                                <section class="modal-card-body">
                                    <p>Please search for another user or create a new one below!</p>
                                </section>
                                <footer class="modal-card-foot">
                                    <button class="button is-success"
                                        onClick={() => {
                                            this.props.createUser(this.state.user)
                                            this.setState({
                                                userNotExists: false,
                                                user: this.state.user
                                            })


                                        }}
                                    >Create User</button>

                                    <Link to={"/"}
                                        onClick={() => {
                                            this.setState({
                                                userNotExists: false,
                                                user: ''
                                            })


                                        }}
                                    ><button class="button">Cancel</button></Link>
                                </footer>
                            </div>
                        </div >
                    </div> : null
                }


            </div >

        )




    }
}

export default UserInfo