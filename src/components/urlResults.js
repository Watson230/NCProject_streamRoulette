import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Linkify from 'react-linkify';
class UrlResults extends React.Component {
    state = {}


    render() {
        return (
            <div style={{"zIndex":"-1"}}>

                <Modal isOpen={this.props.flag}>
                    <ModalHeader toggle={this.toggle}>Watch Here</ModalHeader>
                    <ModalBody>
                    {this.props.watchedFilmUrl ?
                        <ul >
                          {
                            this.props.watchedFilmUrl.map(result => {
                              let Link;
                              if (result.url) {
                                Link = <Linkify>{result.url.split('//')[1]}</Linkify>;
                                return <li>{`${result.name}:`}{Link}</li>;
                              }
                              return null;
                            })
                          }
                        </ul> :
                        null
                      }
          </ModalBody>
                    <ModalFooter>
                    
                        <Button color="secondary" onClick={()=>this.props.watchHereHandler(false)}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default  UrlResults 