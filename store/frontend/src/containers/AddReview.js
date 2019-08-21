import React, { Component } from "react";
import { connect } from "react-redux";

class AddReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemId: this.props.match.params.id || null,
      review: ""
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    let user = this.props.username;
    let review = this.state.review;
    let itemId = this.state.itemId;

    fetch(`http://localhost:4000/post-review/${this.state.itemId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ username: user, itemId: itemId, review: review })
    })
      .then(res => res.json())
      .then(result => {
        if (!result) {
          alert("an error occurred. Please try again");
          return;
        }
        this.setState({ review: "" });
        this.props.history.push("/");
      });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="addReview">
        <div className="input-group">
          <input
            id="review"
            name="review"
            type="textarea"
            className="form-control"
            onChange={this.handleChange}
            value={this.state.review}
            required
          />
        </div>
        <button type="submit" className="btn btn-light">
          {" "}
          add your review
        </button>
      </form>
    );
  }
}
let mapStateToProps = state => {
  return {
    username: state.username
  };
};

export default connect(mapStateToProps)(AddReview);
