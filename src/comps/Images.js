import React, { Component } from 'react';
import Modal from './Modal';

import url from '../url';

let loading = false;

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
  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
    document.body.style.overflow = this.state.hideModal ? 'auto' : 'hidden';

  }
  componentWillUnmount(){
    window.removeEventListener('scroll', this.onScroll);
    document.body.style.overflow = 'auto';
  }
  render(){
    return (
      <React.Fragment>
        <div className="image-container-wrapper">
          <div className="image-container">
            {
              this.props.Posts.map(({ thumbPath }, i) => (
                <img 
                  onClick={() => this.setImageAndToggleModal(i)}
                  src={`${url}${thumbPath}`}
                  key={i}
                  alt="Funny Crypto Meme"/>
              ))
            }
          </div>
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
    if(!this.props.byId) {
      this.props.history.push(`/post/?id=${this.props.Posts[activePostIndex].id}`);
    }
    this.toggleModal();
  }
  toggleModal = () => {
    this.setState((prevState) => {
      return {
        hideModal: !prevState.hideModal,
      };
    }, () => {
      document.body.style.overflow = this.state.hideModal ? 'auto' : 'hidden';
      if(this.state.hideModal && !this.props.byId) {
        this.props.history.push('/');
      }
    });
  }
  onScroll = async () => {
    if(window.scrollY + window.innerHeight >= document.body.scrollHeight - 150 && !loading) {
      loading = true;
      await this.props.onLoadMore();
      loading = false;
    }
  }
  setActivePostIndex = async (i) => {
    if(i < 0)
      return;
    if(i === this.props.Posts.length && !loading && !this.props.byId) {
      loading = true;
      await this.props.onLoadMore();
      loading = false;
    }
    if(i >= this.props.Posts.length) {
      return;
    }
    this.setState({
      activePostIndex: i
    });
    if(!this.props.byId){
      this.props.history.push(`/post/?id=${this.props.Posts[i].id}`);
    }
  }
  
} 

export default Images;