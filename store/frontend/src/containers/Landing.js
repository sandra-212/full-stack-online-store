import React, { Component } from "react";
import ItemList from "./ItemList";

const Heading = () => {
  return <h1 style={{ color: "#9900cc" }}>Online Store</h1>;
};

export default class Landing extends Component {
  render() {
    return (
      <div>
        <Heading />
        <div>
          <ItemList />
        </div>
      </div>
    );
  }
}
