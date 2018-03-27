import React, { Component } from 'react';
import Modal from './Modal';
class Images extends Component {
  constructor() {
    super();
    this.state = {
      hideModal: true,
      picPath: null,
      comments: [],
      username: null,
      userId: null,
      activePostIndex: 0,
    };
  } 
  render(){
    return (
      <React.Fragment>
        <div className="image-container">
          {
            this.props.Posts.map(({ thumbPath }, i) => (
              <img 
                onClick={() => this.setImageAndToggleModal(i)}
                src={`http://localhost:8080${thumbPath}`}
                key={i}
                alt="Funny Crypto Meme"/>
            ))
          }
        </div>
        <Modal 
          toggleModal={this.toggleModal}
          hideModal= {this.state.hideModal}
          activePost = {this.props.Posts[this.state.activePostIndex]}
          setActivePostIndex = {(i) => this.setActivePostIndex(i)}
          activePostIndex = {this.state.activePostIndex}
          history= {this.props.history}
        />
      </React.Fragment>
    );
  }
  setImageAndToggleModal(activePostIndex) {
    this.setState(()=> {
      return {
        activePostIndex 
      };
    });
    this.toggleModal();
  }
  toggleModal = () => {
    this.setState((prevState) => {
      return {
        hideModal: !prevState.hideModal,
      };
    }, () => {
      document.body.style.overflow = this.state.hideModal ? 'auto' : 'hidden';
    });
  }
  setActivePostIndex = (i) => {
    if(i < 0 || i >= this.props.Posts.length)
      return;
    this.setState({
      activePostIndex: i
    });
  }
  
} 

export default Images;