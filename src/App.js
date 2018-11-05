import React, { Component } from "react";
import { Router, Link, navigate } from "@reach/router";
import { Provider } from "react-redux";
import { configureStore } from "./store";
import { setCurrentUser, logout } from "./store/actions/auth";
import jwtDecode from "jwt-decode";
import logo from "./logo.svg";
import "./App.scss";

import Navbar from "./components/navbar";
import Dashboard from "./components/dashboard";
import Landing from "./components/landing";

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
        <div className="App">
          <Navbar />

          <Router className="page-content">
            <Dashboard path="/" />
            <Landing path="auth/*" />
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
