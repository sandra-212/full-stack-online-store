import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Cart extends Component {
  constructor() {
    super();
    this.state = {
      items: []
    };
  }
  componentDidMount = () => {
    fetch("http://localhost:4000/cart", {
      method: "GET"
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({ items: data });
      });
  };
  removeItem = id => {
    fetch(`http://localhost:4000/remove-cart/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ itemId: id })
    })
      .then(res => res.text())
      .then(res => {
        // return res.json();

        fetch("http://localhost:4000/cart", {
          method: "GET"
        })
          .then(res => {
            return res.json();
          })
          .then(data => {
            this.setState({ items: data });
          });
      });
  };

  render() {
    return (
      <div>
        {this.state.items.length === 0 ? (
          <div style={{ padding: "20px", margin: "10px" }}>
            You have no items in your shopping cart
          </div>
        ) : (
          ""
        )}

        <div>
          {this.state.items.map((item, i) => (
            <ul key={i}>
              {item.name}
              <button
                style={{
                  backgroundColor: "white",
                  color: "#9900cc",
                  border: "none",
                  fontSize: "1em"
                }}
                onClick={() => this.removeItem(item.itemId)}
              >
                Remove from Cart
              </button>
            </ul>
          ))}
          <div style={{ padding: "20px", margin: "10px" }}>
            <Link to="/">Home</Link>
          </div>
        </div>
      </div>
    );
  }
}
