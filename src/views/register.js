import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import Recaptcha from 'react-recaptcha';
import gql from 'graphql-tag';
import validator from 'email-validator';
import complexity from 'complexity';
import { toast } from 'react-toastify';
// import { error } from 'util';

const pwOptions = {
  uppercase: 1,
  lowercase: 1,
  special: 1,
  digit: 1,
  alphaNumeric: 1,
  min: 7,
};

const REGISTER = gql`
  mutation registerUser(
    $username: String!
    $password: String!
    $email: String!
    $captchaResponse: String!
  ) {
    registerUser(
      username: $username
      password: $password
      email: $email
      captchaResponse: $captchaResponse
    ) {
      success
      errorMsg
    }
  }
`;

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
      confirm: '',
      error: false,
      captchaResponse: '',
      errorMsg: '',
    };
    // eslint-disable-next-line
    this.recaptchaInstance;
  }
  render() {
    return(
      <Mutation 
        mutation={REGISTER}
      >
        {(mutate) => 
          (
            <div className="login">
              <h1>
          Register a new account
              </h1>
              <form onSubmit={(e) => this.handleSubmit(e, mutate)}>
                <input
                  placeholder="satoshi"
                  id="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
                <input
                  placeholder="satoshin@gmx.com"
                  id="email"
                  value={this.state.email}
                  type="email"
                  onChange={this.handleChange}
                />
                <input
                  id="password"
                  type="password"
                  placeholder="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                <input
                  id="confirm"
                  type="password"
                  placeholder="Confirm Password"
                  value={this.state.confirm}
                  onChange={this.handleChange}
                />
                <Recaptcha
                  sitekey="6LdyfjkUAAAAAAoeOonnHFm0o9Tjl_NUJSvQN50u"
                  verifyCallback={this.verifyCaptcha}
                  ref={e => (this.recaptchaInstance = e)}
                />
                {
                  this.state.error &&
                  <div className="error-message">
                    Error: {this.state.errorMsg}
                  </div>
                }
                <button type="submit">Submit</button>
              </form>
            </div>
          )
        }
      </Mutation>
    );
  }
  handleChange = e => {
    const field = e.target;
    this.setState(
      {
        [field.id]: field.value,
      },
      function() {
        if (field.id === 'password') {
          this.checkPwComplexity();
        } else if (field.id === 'confirm') {
          this.verifyPassword();
        } else if (field.id === 'email') {
          this.checkEmail();
        }
      },
    );
  };
  checkEmail = () => {
    if (validator.validate(this.state.email)) {
      this.setState({ error: false });
    } else {
      this.setState({ error: true, errorMsg: 'The email must be valid' });
    }
  };
  checkPwComplexity = () => {
    if (!complexity.check(this.state.password, pwOptions)) {
      this.setState({
        error: true,
        errorMsg:
          'Passwords need to be at least 8 characters long' +
           'need at least 1 number, 1 uppercase, 1 lowercase, 1 special (! @ # $ & *) character',
      });
    } else {
      this.setState({ error: false });
    }
  };
  verifyPassword = () => {
    if (this.state.password !== this.state.confirm) {
      this.setState({ error: true, errorMsg: 'Passwords have to match up!' });
    } else {
      this.setState({ error: false });
    }
  };
  verifyCaptcha = res => {
    this.setState({
      captchaResponse: res,
    });
  };
  handleSubmit = (e, mutate) => {
    e.preventDefault();
    const { username, password, email, captchaResponse } = this.state;
    mutate({
      variables: {
        username,
        password,
        email,
        captchaResponse,
      },
    })
      .then(({ data }) => {
        if (data.registerUser.success) {
          toast.success('Registration successful! Check your email :) ');
          this.props.history.push('/login');
        } else {
          this.recaptchaInstance.reset();
          this.setState({
            error: true,
            errorMsg: data.registerUser.errorMsg,
          });
        }
      });
  };
}


export default Register;