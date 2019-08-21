import React, { Component } from "react";
import { connect } from "react-redux";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }
  handleSubmit = e => {
    e.preventDefault();
    let user = this.state.username;
    let pass = this.state.password;
    fetch("http://localhost:4000/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ username: user, password: pass })
    })
      .then(res => res.json())
      .then(result => {
        if (!result.success) {
          alert("username not available");
          return;
        }
        this.props.dispatch({
          type: "login",
          loggedIn: true,
          username: user
        });
      })
      .catch(error => {
        if (error) {
          alert("wrong email or password");
        }
      });
    this.props.history.push("/");
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit} className="login">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            className="form-control"
            onChange={this.handleChange}
            value={this.state.username}
            placeholder="Choose a username"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="pass">Password </label>
          <input
            id="password"
            name="password"
            type="password"
            className="form-control"
            onChange={this.handleChange}
            value={this.state.password}
            placeholder="Choose a password"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {" "}
          sign up
        </button>
      </form>
    );
  }
}
let mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn
  };
};

export default connect(mapStateToProps)(Signup);
