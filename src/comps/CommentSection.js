import React, { Component } from 'react'; 
import Comment from './Comment';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import GET_POSTS from '../queries/get-posts';

const ADD_COMMENT = gql`
  mutation addCommentToPost(
    $comment: String!,
    $PostId: Int!,
    $token: String!
  ) {
    addCommentToPost(comment: $comment, PostId: $PostId, token: $token) {
      id
      content
      owner {
        id
        username
      }
      post {
        id
      }
    }
  }
`;

class CommentSection extends Component {
  constructor() {
    super();
    this.state = {
      newComment: '',
    };
  }
  render() {
    return(
      <Mutation 
        mutation={ADD_COMMENT}
      >
        {(addComment) => 
          (
            <div className="comment-section">
              <h4>Comments</h4>
              {
                this.props.comments.map((comment) => {
                  return (<Comment key={comment.id} comment={comment} />);
                })
              }
              <form onSubmit={(e) => this.handleSubmit(e, addComment)} id="comment-form">
                <textarea 
                  value={this.state.newComment} 
                  onChange={this.handleChange} 
                  onKeyPress={(e) => this.handleEnter(e, addComment)}
                  id="comment-input" 
                  name="comment-input" 
                  aria-label="Write a comment"
                  placeholder="Funny comment ...">
                </textarea>
                <button type="submit">Comment</button>
              </form>
            </div>
          ) }
      </Mutation>
    );
  }
  handleSubmit = (e, addComment) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    addComment({
      variables: { comment: this.state.newComment, PostId: this.props.activePostId, token },
      update: (store, { data: { addCommentToPost: newComment } }) => {
        const { Posts } = store.readQuery({ query: GET_POSTS });
        const newPostsArray = Posts.slice(0);
        // find right post
        for(let i = 0; i<newPostsArray.length; i++) {
          if(newPostsArray[i].id === this.props.activePostId){
            newPostsArray[i].comments = newPostsArray[i].comments.concat([ newComment ]);
            break;
          }
        }
        store.writeQuery({ query: GET_POSTS, data: { Posts: newPostsArray } });
      }
    }).catch(() => {
      this.props.toggleModal();
      this.props.history.push('/login');
    });
    this.setState({
      newComment: ''
    });
  }
  handleChange = (e) => {
    this.setState({
      newComment: e.target.value,
    });
  }
  handleEnter = (e, addComment) => {
    if(e.which === 13 && !e.shiftKey) {
      this.handleSubmit(e, addComment);
    }
  }
}

export default CommentSection;