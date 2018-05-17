import gql from 'graphql-tag';

export default gql`
                query getPosts ($offset: Int, $limit: Int, $id: Int, $tagName: String, $userId: Int){
                  Posts(
                    offset: $offset,
                    limit: $limit,
                    id: $id,
                    tagName: $tagName,
                    userId: $userId
                    )
                    @connection(key: "Posts") {
                      id
                      thumbPath
                      picPath
                      tags {
                        id
                        name
                      }
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