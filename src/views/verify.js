import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { toast } from 'react-toastify';

const VERIFY = gql`
  mutation verifyUser($verifyId: String!) {
    verifyUser(verifyId: $verifyId) {
      success
      errorMsg
    }
  }
`;

const verify = props => (
  <Mutation
    mutation={VERIFY}
  >
    {(mutate) => (
      <div>
        <h1> Click the button to verify the account</h1>
        <button onClick={() => onClick(props, mutate)}>
      Verify
        </button>
      </div>

    )}
  </Mutation>
);
function onClick(props, mutate) {
  const slashIndex = props.history.location.pathname.indexOf('/',1);
  const verifyId =  props.location.pathname.substring(slashIndex + 1);

  mutate({
    variables: {
      verifyId
    },

  })
    .catch(() => toast.error('something wrong with the code'))
    .then(({ data }) => {
      if (data.verifyUser.success) {
        toast.success('You are verified!');
        props.history.push('/login');
      } else {
        toast.error(data.verifyUser.errorMsg);
      }
    });
}

export default verify;
