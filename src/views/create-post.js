import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

class createPost extends Component {
  constructor() {
    super();
    this.state = {
      file: null,
      imgPath: null
    };
  }
  render() {
    return(
      <div>
        <Dropzone
          multiple={false}
          onDrop={this.handleDrop.bind(this)}
          accept="image/jpeg, image/png, image/gif"
        >
          { () => {
            if(this.state.imgPath) {
              return <img src={this.state.imgPath} alt="" />;
            }
            return <div>Drop an Image here or click the box</div>;
          }
          }
        </Dropzone>
      </div>
    );
  }
  handleDrop = ([file]) => {
    this.setState({
      file,
      imgPath: file.preview,
    });
  }
    
}

export default createPost;