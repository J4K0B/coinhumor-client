import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Recaptcha from 'react-recaptcha';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const LOGIN = gql`
  mutation login($login: String!, $password: String!, $captchaResponse: String!){
    login(login: $login, password: $password, captchaResponse: $captchaResponse) {
      token
      success
      errorMsg
      user {
        id
        username
      }
    }
  }
`;

class Login extends Component {
  constructor() {
    super();
    this.state = {
      login: '',
      password: '',
      captchaResponse: '',
      errorMsg: '',

    };
    //eslint-disable-next-line
    this.recaptchaInstance;
  }
  render() {
    return(
      <Mutation
        mutation={LOGIN}
      >
        {(mutate) => (
          <div className="login">
            <h1>Login</h1>
            <form className="login-form" onSubmit={(e) => this.handleSubmit(e, mutate)}>
              <input onChange={this.handleLoginChange} type="text" value={this.state.login} placeholder="Login" />
              <input 
                onChange={this.handlePasswordChange} 
                type="password" 
                value={this.state.password} 
                placeholder="Password" />
              <Recaptcha
                sitekey="6LdyfjkUAAAAAAoeOonnHFm0o9Tjl_NUJSvQN50u"
                verifyCallback={this.verifyCaptcha}
                ref={e => (this.recaptchaInstance = e)}
              />
              {
                this.state.errorMsg &&
                  <div className="error-message">
                    Error: {this.state.errorMsg}
                  </div>
              }
              <button type="submit">Login</button>
            </form>
            <div>
              You still need an account? <Link className="link" to="/register"> Register here </Link>
            </div>
          </div> 
        )}
      </Mutation>
    );
  }
  handleLoginChange = ({ target: { value } }) => {
    this.setState({
      login: value
    });
  }
  handlePasswordChange = ({ target: { value } }) => {
    this.setState({
      password: value
    });
  }
  verifyCaptcha = (res) => {
    this.setState({
      captchaResponse: res,
    });
  };
  handleSubmit = (e, mutate) => {
    e.preventDefault();
    const { login, password, captchaResponse } = this.state;
    mutate({ variables: {
      login,
      password,
      captchaResponse
    } }).then(({ data: { login: { token, success, errorMsg, user } } }) => {
      if(!success || !user) {
        this.setState({
          login: '',
          password: '',
          captchaResponse: '',
          errorMsg
        });
        this.recaptchaInstance.reset();
        return;
      }
      localStorage.setItem('token', token);
      localStorage.setItem('username', user.username);
      localStorage.setItem('userId', user.id);
      this.props.history.push('/');
      toast.success(`Welcome ${user.username}!`);
    });
  }
}

export default Login;