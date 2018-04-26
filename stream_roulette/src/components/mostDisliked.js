import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import PT from 'prop-types'
import Film from './film'
import NavBar  from './NavBar'

class MostDisliked extends Component {

    state={
        mostDislikedFilms:[]
    }


    componentWillMount(){

        
    // fetch(`https://api.themoviedb.org/3/discover/movie?api_key=b714d4feb8707f01b7dd25f75051d8a6&language=en-US&sort_by=popularity.desc&include_adult=false&release_date.lte=2017&include_video=false`)

   fetch(`http://localhost:4000/api/film/disliked`)
        .then(res => {
            console.log(res)
            return res.json();
        })
        .then(body => {
            let films = body.map(film => film.film)
            console.log(films)
            this.setState({

                mostDislikedFilms: films ,
                currentFilm:films[Math.floor(Math.random() * (this.state.mostDislikedFilms.length - 1))]

            })
        })
        .catch(err => {
            console.log(err)
        })


    }


    componentDidUpdate(){
        setTimeout(()=>{
        this.mostPopularFilms()},5000)
    }
    
    
    mostPopularFilms =()=> {
        
        let filmNum=Math.floor(Math.random() * (this.state.mostDislikedFilms.length - 1))
        this.setState({
            
            mostDislikedFilms: this.state.mostDislikedFilms,  
            currentFilm:this.state.mostDislikedFilms[filmNum]
            
        })
        
        
        
        
    }
    
    
    render() {
        


        return (
            <div style={{ "width":"500px", "height": "700px", }} >
               

                 {this.state.currentFilm?
                 
                           
                            <div class="tile is-parent">
                            <article class="tile is-child notification is-info">
                              <p class="title">Most Disliked films </p>
                              <p class="subtitle">{`${this.state.currentFilm.title}`}</p>
                              <figure class="image is-4by5">
                                    <img src={`http://image.tmdb.org/t/p/w185//${this.state.currentFilm.poster_path}`} alt="Image" />
                                </figure>
                            </article>
                          </div>
                        
                            
                            
                            
                            :                 <div class="tile is-parent">
                            <article class="tile is-child notification is-info">
                              <p class="title">loading.....</p>
                            
                              
                            </article>
                          </div>
                 }
                

            </div>
        )
    }

}

export default MostDisliked