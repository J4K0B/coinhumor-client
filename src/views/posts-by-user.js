import React, { Component } from 'react';
import { Query } from 'react-apollo';
import Images from '../comps/Images';
import GET_POSTS from '../queries/get-posts';

class App extends Component {
  render() {
    const regex = /\d+/;
    let id = parseInt(this.props.history.location.search.match(regex)[0]);
    return (
      <div>
        <Query query={GET_POSTS} variables={{ userId: id }}
        >
          {({ loading, error, data: { Posts } }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error: {error}</p>;
            const filteredPosts = Posts.filter(Post => Post.owner.id === id);
            return <Images 
              Posts={filteredPosts}
              history={this.props.history}
              loading={loading}
              byId = {true}
            />;
          }}
        </Query>
      </div>
    );
  }
}

export default App;


