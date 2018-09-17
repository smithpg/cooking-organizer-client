import React, { Component } from "react";
import { Router, Link, navigate } from "@reach/router";
import { Provider } from "react-redux";
import { configureStore } from "./store";
import { setCurrentUser, logout } from "./store/actions/auth";
import jwtDecode from "jwt-decode";
import logo from "./logo.svg";
import "./App.css";

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
  render(props) {
    if (!store.getState().currentUser.isAuthenticated) {
      navigate("/auth");
    }

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
// const Context = React.createContext({user: {}});

// const App = () => (
//   <Context.Provider>

//     <header className="App-header">
//         {/* <img src={logo} className="App-logo" alt="logo" /> */}
//         <h1 className="App-title">Home Cooking Organizer</h1>
//         <Link to="/dashboard">Dashboard</Link>
//     </header>

//     <Router className="App">
//       <Landing path="/"/>
//       <Dashboard path = "/dashboard"/>
//     </Router>

//   </Context.Provider>
// );

export default App;
