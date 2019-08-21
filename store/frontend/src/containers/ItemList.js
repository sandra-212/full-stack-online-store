import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class ItemList extends Component {
  constructor() {
    super();
    this.state = {
      items: []
    };
  }
  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    fetch("http://localhost:4000/products")
      .then(res => res.json())
      .then(result => {
        this.setState({
          items: result.products
        });
      });
  };
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          {this.state.items.map(item => (
            <ul key={item._id}>
              <p
                style={{
                  color: "#9900cc",
                  fontSize: "1em"
                }}
              >
                {item.name}
              </p>
              <img alt=" " src={item.img} style={{ width: 150, height: 170 }} />
              <div style={{ margin: "10px" }}>
                <Link to={`/products/${item._id}`}>More </Link>
              </div>
            </ul>
          ))}
        </div>
      </div>
    );
  }
}
