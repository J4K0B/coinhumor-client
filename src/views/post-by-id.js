import React, { Component } from 'react';
import { Query } from 'react-apollo';
import Images from '../comps/Images';
import GET_POSTS from '../queries/get-posts';

class App extends Component {
  render() {
    const regex = /\d+/;
    let id = parseInt(this.props.history.location.search.match(regex)[0], 10);
    return (
      <div>
        <Query query={GET_POSTS} variables={{ id }}
        >
          {({ loading, error, data: { Posts } }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error: {error}</p>;
            if(Posts.length < 1) {
              return <div>Nothing found here!</div>;
            }
            return <Images 
              Posts={Posts}
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

