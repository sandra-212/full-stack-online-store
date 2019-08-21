import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

class ItemDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemId: this.props.match.params.id || null,
      item: {}
    };
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData = () => {
    fetch(`http://localhost:4000/products/${this.state.itemId}`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({
          item: data
        });
      });
  };

  addToCart = () => {
    let itemId = this.state.itemId;
    fetch(`http://localhost:4000/add-to-cart/${this.state.itemId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ itemId: itemId })
    })
      .then(res => {
        return res.json();
      })
      .catch(err => console.log(err));
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="blockquote text-justify">
        <h1>{this.state.item.name}</h1>
        <p>{this.state.item.description}</p>

        <Link to={`/reviews/${this.state.item._id}`}>reviews</Link>

        {this.props.loggedIn && (
          <button className="btn btn-light" onClick={this.addToCart}>
            Add To Cart
          </button>
        )}
      </div>
    );
  }
}

let mapStateToProps = state => {
  return { loggedIn: state.loggedIn };
};

export default connect(mapStateToProps)(withRouter(ItemDetail));
