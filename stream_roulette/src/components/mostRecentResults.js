import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import PT from 'prop-types';
import Film from './film'
import NavBar  from './NavBar'

const RecentlyWatchedFilms = (props) => {

    return (
        <div>
        <NavBar/>
        <div style={{"height":"800px","border":"solid"}}>

        <div class='carousel is-5 carousel-animated carousel-animate-slide'>
            <div class='carousel-container'>
                <div class='carousel-item is-active'>
                    <Film/>
                </div>
                <div class='carousel-item'>
                <Film/>
                </div>
                <div class='carousel-item'>
                    <Film/>
                </div>
                <div class='carousel-item'>
                    <Film/>
                </div>
                <div class='carousel-item'>
                    <Film/>
                </div>
                <div class='carousel-item'>
                    <Film/>
                </div>
                <div class='carousel-item'>
                    <Film/>
                </div>
            </div>
            <div class="carousel-navigation is-centered">
                <div class="carousel-nav-left">
                    <i class="fa fa-chevron-left" aria-hidden="true"></i>
                </div>
                <div class="carousel-nav-right">
                    <i class="fa fa-chevron-right" aria-hidden="true"></i>
                </div>
            </div>
        </div>
        </div>
        </div>
    )
}

export default  RecentlyWatchedFilms