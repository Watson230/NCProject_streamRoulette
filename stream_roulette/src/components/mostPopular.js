import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import PT from 'prop-types'
import Film from './film'
import NavBar  from './NavBar'

class MostRecent extends Component {

    state={
        mostPopularFilms:[]
    }

    userInputHandler(key, value) {


        this.setState(Object.assign({}, this.state, {
            [key]: value
        }))

    }

    submitQueries = () => {
        let usedQueries = Object.keys(this.state)


        let queryString = usedQueries.reduce((acc, key) => {
            if (key === 'keywords') acc = acc + `with_keywords=${this.state.keywords}` + '&';
            if (key === 'Year') acc = acc + `primary_release_year=${parseInt(this.state.Year)}` + '&';
            if (key === 'genre') acc = acc + `with_genres=${this.state.genre.split(':')[1]}` + '&';

            if (key === 'search') acc = acc + `term=${this.state.search}`;

            return acc
        }, '')

        this.setState(Object.assign({}, this.state, {

            submitFlag: 1,
            queriesString: queryString
        }))

    }

    componentWillMount(){

        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=b714d4feb8707f01b7dd25f75051d8a6&language=en-US&sort_by=popularity.desc&include_adult=false&release_date.lte=2017&include_video=false`)
        .then(res => {
            console.log(res)
            return res.json();
        })
        .then(body => {
            this.setState({

                mostPopularFilms: body.results,  
                currentFilm:body.results[Math.floor(Math.random() * (this.state.mostPopularFilms.length - 1))]

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
        
        let filmNum=Math.floor(Math.random() * (this.state.mostPopularFilms.length - 1))
        this.setState({
            
            mostPopularFilms: this.state.mostPopularFilms,  
            currentFilm:this.state.mostPopularFilms[filmNum]
            
        })
        
        
        
        
    }
    
    
    render() {
        


        return (
            <div style={{ "width":"500px", "height": "700px", }} >
               

                 {this.state.currentFilm?
                 
                           
                            <div class="tile is-parent">
                            <article class="tile is-child notification is-info">
                              <p class="title">Most Popular </p>
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

export default MostRecent