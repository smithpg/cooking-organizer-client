import React, { Component } from "react";
import { Router, Link, navigate } from "@reach/router";
import { Provider } from "react-redux";
import { configureStore } from "./store";
import { setCurrentUser, logout } from "./store/actions/auth";
import jwtDecode from "jwt-decode";
import logo from "./logo.svg";
import "./App.scss";

import Navbar from "./components/navbar";
import Landing from "./components/landing";
import Dashboard from "./components/dashboard";

const store = configureStore();

if (localStorage.jwtToken) {
  try {
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
  } catch (err) {
    store.dispatch(setCurrentUser({}));
  }
}

class App extends Component {
  componentDidMount() {
    if (!store.getState().currentUser.isAuthenticated) {
      navigate("/auth");
    }
  }

  render(props) {
    return (
      <Provider store={store}>
        <React.Fragment>
          <Navbar />

          <Router className="App">
            <Dashboard path="/" />
            <Landing path="auth/*" />
          </Router>
        </React.Fragment>
      </Provider>
    );
  }
}

export default App;
