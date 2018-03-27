import React, { Component } from 'react';
import { Query } from 'react-apollo';
import Images from '../comps/Images';
import GET_POSTS from '../queries/get-posts';

class App extends Component {
  render() {
    return (
      <div>
        <Query query={GET_POSTS}
        >
          {({ loading, error, data : { Posts } }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error: </p>;

            return <Images Posts={Posts} history={this.props.history} />;
          }}
        </Query>
      </div>
    );
  }
}

export default App;

