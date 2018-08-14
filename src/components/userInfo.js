import React, { Component } from 'react';
import {Link,} from 'react-router-dom';
import Linkify from 'react-linkify';
import propTypes from 'prop-types';


const API_URL = 'https://safe-brook-17817.herokuapp.com/api';

class UserInfo extends Component {


    state = {
      user: '',
      userNotExists: false,
      userInfo: [],
      watchAgain: false,
      watchedFilmUrl: []
    }
userInfoInputHandler = (name) => {
  this.setState({
    user: name
  });
}
SearchUser = () => {
  fetch(`${API_URL}/user/${this.state.user}`)
    .then(res => {
      return res.json();
    })
    .then(body => {
      if (body.length < 1) {
        this.setState({
          userNotExists: true,
          userInfo: []
        });
      } else {
        this.props.UpdateStateUser(this.state.user, body);
        this.setState({
          userNotExists: false,
          userInfo: body
        });}
    })
    .catch(() => {
      this.props.history.push('/404');
    });
}

 prevWatchedURL = (filmName) => {
   fetch(`https://utelly-tv-shows-and-movies-availability-v1.p.mashape.com/lookup?term=${filmName}`,
     {
       headers: new Headers({
         'Accept': 'application/json',
         'X-Mashape-Key': 'lbLD5PKDXhmshZXMNJgHsm1ahtF2p1fYk5Sjsn8XmYhTzIKQYn'
       }),
       type: 'cors'
     })
     .then(res => {
       return res.json();
     })
     .then(body => {
       this.setState(Object.assign({}, this.state, {
         watchedFilmUrl: body.results[0].locations
       }));
     })
     .catch(() => {
       this.props.history.push('/404');
     });
 }

 render() {

   return (
     <div>
       <div className="tile is-parent" className="userInfo">
         <article className="tile is-child notification is-black">
           <div className="content">

             <div className="content">
               <h1 className="title">User Info</h1>
               <div className="field">
                 <label className="label subtitle">User</label>
                 <input className="input" type="text" placeholder="Enter Username" value={this.state.user}
                   onChange={event => { this.userInfoInputHandler(event.target.value);
                   }}/>
               </div>

               <div className="field">
                 <p className="control">
                   <button className="button is-white" onClick={() => {
                     if(this.state.user !== '') this.SearchUser();
                     else alert('please enter a user name');
                     }}>Search for User</button>
                     
                 </p>
               </div>

               <div>
                 {this.state.userInfo.length > 0 ?
                   <div >
                     <p className="subtitle">{`${this.state.user}'s film history`}</p>
                     <p className="subtitle"> Recently Watched</p> 
                     <div className="content">

                       <ul>
                         {
                           this.state.userInfo[0].watchedFilms.slice(this.state.userInfo[0].watchedFilms.length - 5).reverse().map(film => {

                             if (film){ return <li><a
                               onClick={() => {this.setState(Object.assign({}, this.state, {
                                 watchAgain: true,
                                 userNotExists: false,}));
                               this.prevWatchedURL(film.title);}}>{film.title}</a></li>;
                             }
                             return null;
                           })
                         }
                       </ul>                                   
                     </div>
                   </div>
                   : null}
               </div>

               <div>
                 {this.state.watchAgain ?
                   <div>
                     <div className="modal is-active">
                       <div className="modal-background"></div>
                       <div className="modal-card">
                         <header className="modal-card-head">
                           <p className="modal-card-title">You can watch it again here</p>
                           <button className="delete" aria-label="close"></button>
                         </header>
                         <section className="modal-card-body">
                           {this.state.watchedFilmUrl ?
                             <ul style={{ 'color': 'black' }}>
                               {
                                 this.state.watchedFilmUrl.map(result => {
                                   let Link;
                                   if (result.url) {
                                     Link = <Linkify>{result.url.split('//')[1]}</Linkify>;
                                     return <li>{`${result.name}:`}{Link}</li>;
                                   }
                                   return null;
                                 })
                               }
                             </ul> : null
                           }
                         </section>
                         <footer className="modal-card-foot">
                           <Link to={'/'}
                             onClick={() => {
                               this.setState({
                                 watchAgain: false,
                                 user: this.state.user
                               });}}><button className="button">Cancel</button></Link>
                         </footer>
                       </div>
                     </div >
                   </div> :
                   null
                 }
               </div>
               {
                 this.state.userNotExists ? <div>
                   <div className="modal is-active">
                     <div className="modal-background"></div>
                     <div className="modal-card">
                       <header className="modal-card-head">
                         <p className="modal-card-title">User Not Found</p>
                         <button className="delete" aria-label="close"></button>
                       </header>
                       <section className="modal-card-body">
                         <p>Please search for another user or create a new one below!</p>
                       </section>
                       <footer className="modal-card-foot">
                         <button className="button is-success"
                           onClick={() => {
                             this.props.createUser(this.state.user);
                             this.setState({
                               userNotExists: false,
                               user: this.state.user
                             });}}>Create User</button>
                         <Link to={'/'} onClick={() => {this.setState({userNotExists: false,user: ''});}}><button className="button">Cancel</button></Link>
                       </footer>
                     </div>
                   </div >
                 </div> : null
               }
             </div>
           </div>
         </article>
       </div>
     </div >

   );
 }
}

UserInfo.propTypes={
  match:propTypes.object,
  UpdateStateUser:propTypes.func,
  history:propTypes.object,
  createUser:propTypes.func,
};

export default UserInfo;