import React, { Component } from 'react';
import { Query } from 'react-apollo';
import Images from '../comps/Images';
import GET_POSTS from '../queries/get-posts';

class App extends Component {
  render() {
    return (
      <div>
        <Query query={GET_POSTS} variables={{ offset: 0, limit: 42 }}
        >
          {({ loading, error, data : { Posts }, fetchMore }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error: </p>;
	    if (Posts.length < 1) {
	      return ( <div> Nothing found here.. </div> );
	    }
            return <Images 
              Posts={Posts} 
              history={this.props.history}
              loading={loading}
              onLoadMore={() => fetchMore({
                variables: {
                  offset: Posts.length
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                  if (!fetchMoreResult) return prev;
                  return Object.assign({}, prev, {
                    Posts: [...prev.Posts, ...fetchMoreResult.Posts]
                  });
                }
              })} 
            />;
          }}
        </Query>
      </div>
    );
  }
}

export default App;

