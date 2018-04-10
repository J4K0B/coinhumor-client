import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CommentSection from './CommentSection';

class Modal extends Component {
  componentWillMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }  
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }
  render() {
    const { activePost } = this.props;
    return(
      <div 
        onClick={this.props.toggleModal}
        className={`modal ${this.props.hideModal ? 'hidden' : ''}`}
      >
        <div className="modal-center-outer">
          <div className="modal-center-middle">
            <div className="modal-center-inner">
              <div onClick={this.preventOnClick} className="modal-content">
                <div className="modal-header">
                  <span className="username"> by  
                    <Link 
                      className="username-link" 
                      to={`/users?id=${activePost.owner.id}`}
                    > {activePost.owner.username}</Link>
                  </span>
                  <button className="close-button" onClick={this.props.toggleModal}>Close</button>
                </div>
                <div className="modal-main">
                  <div className="modal-img">
                    <figure>
                      <img  src={`http://localhost:8080/${activePost.picPath}`} alt="Funny Crypto Meme" />
                      <figcaption className="voting"> 
                        <button>+</button>
                        {activePost.score} 
                        <button>-</button>
                      </figcaption>
                    </figure>
                  </div>
                  <CommentSection 
                    history={this.props.history} 
                    activePostId={activePost.id} 
                    comments={activePost.comments}
                    toggleModal={this.props.toggleModal} 
                  />

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  preventOnClick = (e) => {
    e.stopPropagation();
  }
  handleKeyDown = (e) => {
    const { activePostIndex } = this.props;
    switch (e.keyCode) {
    // left arrow
    case 37:
      this.props.setActivePostIndex(activePostIndex - 1);
      break;
    // right arrow
    case 39:
      this.props.setActivePostIndex(activePostIndex + 1);
      break;
    // enter
    case 27:
      this.props.toggleModal();
      break;
    default:
      break;
    }
  }
}

export default Modal;