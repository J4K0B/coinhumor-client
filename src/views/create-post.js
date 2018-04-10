import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { ApolloConsumer } from 'react-apollo';

import GET_POSTS from '../queries/get-posts';

class createPost extends Component {
  constructor() {
    super();
    this.state = {
      file: null,
      imgPath: null,
      tagText: '',
      tags: []
    };
  }
  render() {
    return(
      <ApolloConsumer>
        { cache => (
          <div>
            <Dropzone
              multiple={false}
              onDrop={(files) => this.handleDrop(files)}
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
            <input
              placeholder="Enter Tags seperated by commas: "
              value={this.state.tagText}
              type="text"
              onChange={this.handleChangeTags}
            />
            <button onClick={() => this.handleSubmit(cache)}>Post</button>
          </div>
        )}
      </ApolloConsumer>
    );
  }
  handleDrop = ([file]) => {
    this.setState({
      file,
      imgPath: file.preview,
    });
  }
  handleChangeTags = (e) => {
    const value = e.target.value;
    const tags = value.split(',');
    for (let i = 0; i < tags.length; i++) {
      tags[i] = tags[i].trim();
    }
    this.setState({
      tagText: value,
      tags,
    });
  };
  handleSubmit = (cache) => {
    const { file, tags } = this.state;
    const token = localStorage.getItem('token');
    // create data for post
    const data = new FormData();
    data.append('file', file);
    data.append('token', token);
    data.append('tags', tags);

    fetch('http://localhost:8080/create-post', {
      method: 'POST',
      body: data,
    }).then( res => res.json())
      .then(({ post, id, username }) => {
        //eslint-disable-next-line
        if (!post) return console.log('error');
        // set missing properties
        post['__typename'] = 'Post';
        post.comments = [];
        const owner = { id, username, __typename: 'User' };
        post.owner = owner;
        // get posts and add new post to the beginning into cache
        const { Posts } = cache.readQuery({ query: GET_POSTS });
        Posts.unshift(post);
        cache.writeQuery({ query: GET_POSTS, data: { Posts } });

        this.props.history.push('/');
      });
  }
}

export default createPost;