import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import { toast } from 'react-toastify';

import GET_POSTS from '../queries/get-posts';

const VOTE_POST = gql`
  mutation votePost ($token: String!, $postId: Int!, $positive: Boolean!) {
    votePost (token: $token, postId: $postId, positive: $positive) {
      success
      errorMsg
    }
  }
`;

const GET_VOTE_BY_USER = gql`
  query votedOnPost ($token: String!, $postId: Int!) {
    votedOnPost(token: $token, postId: $postId) {
      value
    }
  }
`;

class VotingSection extends Component {
  render() {
    const { postId, score } = this.props;
    const token = localStorage.getItem('token');
    if(token)
      return (
        <Query query={GET_VOTE_BY_USER} variables={{ token, postId }} >
          { ({ data: { votedOnPost } }) => (
            <Mutation
              mutation={VOTE_POST} 
            >
              {(votePost) => {
                let value = null;
                if(votedOnPost) {
                  value = votedOnPost.value;
                }
                return(
                  <React.Fragment>
                    <button 
                      className={`vote ${value === 1 ? 'positive' : ''}`}
                      onClick={() => this.vote(1, token, votePost, value)}
                    >+</button>
                    { score }
                    <button 
                      className={`vote ${value === -1 ? 'negative' : ''}`}
                      onClick={() => this.vote(-1, token, votePost, value)}
                    >-</button>
                  </React.Fragment>
                );}
              }
            </Mutation>
          )}
        </Query>
      );
    return(<React.Fragment>{score} Login to Vote</React.Fragment>);
  }
  vote = (value, token, votePost, previousValue) => {
    const positive = value === 1 ? true : false;
    const { postId } = this.props;
    votePost({
      variables: { positive, token, postId },
      update: (store, { data: { votePost: { success, errorMsg } } }) => {
        if(!success || errorMsg) {
          toast.error('There was an error voting: ' + errorMsg);
        } 
        store.writeQuery({ 
          query: GET_VOTE_BY_USER,
          variables:{ postId, token },
          data: { votedOnPost: { value, __typename: 'Vote' } } 
        });
        const { Posts } = store.readQuery({ query: GET_POSTS });
        const newPostsArray = Posts.slice(0);
        // find right post
        for(let i = 0; i<newPostsArray.length; i++) {
          if(newPostsArray[i].id === postId){
            newPostsArray[i].score = newPostsArray[i].score + value - previousValue;
            break;
          }
        }
        store.writeQuery({ query: GET_POSTS, data: { Posts: newPostsArray } });
      }
    });
  }
}

export default VotingSection;
