import gql from 'graphql-tag';

export default gql`
                {
                  Posts {
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