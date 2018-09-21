import React, { Component } from "react";
import { navigate, Link } from "@reach/router";
import styled from "styled-components";

const Style = styled.div`
  z-index: 3;
  height: 500px;
  width: 500px;
  background-color: white;
`;

export default class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      profileImageURL: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const authType = this.props.signUp ? "signup" : "signin";
    this.props
      .onAuth(authType, this.state)
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        return;
      });
  };

  render() {
    const { email, username, password, profileImageURL } = this.state;
    const { signUp, heading, buttonText, errors, removeError } = this.props;

    // history.listen(()=> {removeError();});

    return (
      <Style>
        <form onSubmit={this.handleSubmit}>
          <h2>{heading}</h2>
          {errors.message && <div>{errors.message}</div>}
          <label htmlFor="email">Email</label>
          <input
            type="text"
            className="form-control"
            id="email"
            name="email"
            onChange={this.handleChange}
            value={email}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={this.handleChange}
          />

          {signUp && (
            <React.Fragment>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                onChange={this.handleChange}
                value={username}
              />
              <label htmlFor="image-url">Image URL:</label>
              <input
                type="text"
                className="form-control"
                id="image-url"
                name="profileImageURL"
                onChange={this.handleChange}
                value={profileImageURL}
              />
            </React.Fragment>
          )}
          <button type="submit"> {buttonText} </button>

          {signUp ? (
            <Link to="../"> Already have an account? Sign In!</Link>
          ) : (
            <Link to="signup"> Don't have an account? Sign Up!</Link>
          )}
        </form>
      </Style>
    );
  }
}
