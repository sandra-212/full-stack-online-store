import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import "../styles.css";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
  }

  componentDidUpdate(oldProps) {
    const newProps = this.props;
    if (oldProps.loggedIn !== newProps.loggedIn) {
      this.setState({ show: true });
    }
  }

  logout = e => {
    e.preventDefault();
    fetch("http://localhost:4000/logout")
      .then(res => res.json())
      .then(result => {
        if (!result) {
          alert("an error occurred. Please try again");
          return;
        }
        this.props.dispatch({
          type: "logout",
          loggedIn: false,
          username: " "
        });
      });
    this.props.history.push("/");
  };
  render() {
    return (
      <div className="navbar navbar-expand-lg navbar-dark bg-light">
        {this.state.show && this.props.username !== " " ? (
          <div className="links">
            <Link to="/cart">Cart</Link>
            <button className="btn btn-primary" onClick={this.logout}>
              Log out
            </button>
          </div>
        ) : (
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/signup">Sign up</Link>
            </li>
            <li className="nav-item">
              <Link to="/login">Log in</Link>
            </li>
          </ul>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.loggedIn,
    username: state.username
  };
}

export default connect(mapStateToProps)(withRouter(NavBar));
