import gql from 'graphql-tag';

export default gql`
                query getPosts ($offset: Int, $limit: Int){
                  Posts(offset: $offset, limit: $limit) {
                    id
                    thumbPath
                    picPath
                    score
                    comments {
                      id
                      owner {
                        id
                        username
                      }
                      content
                    }
                    owner {
                      id
                      username
                    }
                  }
                }
            `;