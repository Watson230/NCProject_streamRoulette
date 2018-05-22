import React, { Component } from 'react';
import NavBar from './NavBar';
import MostPopular from './mostPopular';
import MostDisliked from './mostDisliked';
import MostWatched from './mostWatched';
import UserForm from './userForm';


class HomeFeed extends Component {

    state = {
      userName: 'random'
    }

    render() {

      return (
        <div className = "" style={{'width': '100%', 'height': '100%'}}>
          <div  style={{'width': '100%'}} >
            <NavBar/>
          </div>
          <div className="container">
            <div className="columns"style={{ 'margin-bottom':'100px','margin-top':'80px'}}>
                    
              <div className="column">
                <div  style={{  'margin-top': '50px' , 'width': '100%', 'height': '100%' }}>
                  <UserForm user={this.state.userName}/>
                </div>
              </div>

              <div className="column is-four-fifths" style={{ 'margin-bottom':'100px',}}>
                    
                <div className="columns">

                  <div className="column" style={{  'margin-top': '50px' , 'margin-left': '20px' ,'margin-right': '20px'  }}>
                    <MostWatched/>
                  </div>
                  <div className="column" style={{  'margin-top': '50px' , 'margin-left': '20px','margin-right': '20px'   }}>
                    <MostPopular/>
                  </div>

                  <div className="column" style={{  'margin-top': '50px' , 'margin-left': '20px', 'margin-right': '20px'  }}>
                    <MostDisliked/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
}

export default HomeFeed;