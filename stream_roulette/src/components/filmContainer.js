import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import Film from './film'
import PT from 'prop-types';


class FilmContainer extends Component{

state={
    film:[]
}

render(){
    return(

        <div>
            <Film/>

            </div>
    )
}


}

export default FilmContainer