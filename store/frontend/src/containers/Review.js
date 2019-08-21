import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemId: this.props.match.params.id || null,
      reviews: []
    };
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData = () => {
    fetch(`http://localhost:4000/reviews/${this.state.itemId}`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({
          reviews: data.reviews
        });
      });
  };

  render() {
    return (
      <div>
        <h3 style={{ padding: "20px", margin: "10px" }}>Reviews</h3>
        {this.state.reviews.length === 0 ? (
          <h4 style={{ padding: "20px" }}>There are no reviews yet!</h4>
        ) : (
          this.state.reviews.map(review => (
            <ul key={review._id}>
              {review.user}
              {": "}
              {review.review}
            </ul>
          ))
        )}
        {this.props.loggedIn && (
          <div style={{ padding: "20px", margin: "10px" }}>
            <Link to={`/add-review/${this.state.itemId}`}>Add a review</Link>
          </div>
        )}
      </div>
    );
  }
}
let mapStateToProps = state => {
  return { loggedIn: state.loggedIn };
};

export default connect(mapStateToProps)(Review);
