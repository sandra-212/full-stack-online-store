import React, { Component } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import NavBar from "../containers/NavBar";
import Landing from "../containers/Landing";
import Cart from "../containers/Cart";
import Login from "../containers/Login";
import Signup from "../containers/Signup";
import AddReview from "../containers/AddReview";
import Review from "../containers/Review";
import ItemDetail from "../containers/ItemDetail";

export default class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/add-review/:id" component={AddReview} />
            <Route path="/reviews/:id" component={Review} />
            <Route path="/products/:id" component={ItemDetail} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
