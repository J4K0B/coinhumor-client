import React, { Component } from 'react';
import { Query } from 'react-apollo';
import Images from '../comps/Images';
import GET_POSTS from '../queries/get-posts';

class App extends Component {
  render() {
    const slashIndex = this.props.history.location.pathname.indexOf('/',1);
    const tagName =  this.props.location.pathname.substring(slashIndex + 1);
    
    return (
      <div>
        <Query query={GET_POSTS} variables={{ tagName }}
        >
          {({ loading, error, data: { Posts } }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error: {error}</p>;
            const filteredPosts = Posts.filter((post) => {
              for(let tag of post.tags) {
                if (tag.name === tagName)
                  return true;
              }
              return false;
            });
            if(filteredPosts.length < 1) {
              return <div>Nothing found here!</div>;
            }
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

