import React from "react";
import { navigate } from "@reach/router";
import { connect } from "react-redux";

import styles from "./navbar.module.scss";

import Button from "./button";

import logo from "../logo.svg";
import { logout } from "../store/actions/auth";

const Navbar = ({ currentUser, logout }) => (
  <nav className={styles.Navbar}>
    {/* <img src={logo} className="App-logo" alt="logo" /> */}
    <h1>Home Cooking Organizer</h1>

    {currentUser.isAuthenticated ? (
      <div>
        <h5 className={styles.username}>{currentUser.user.username}</h5>
        <Button
          color="#FF9800"
          onClick={() => {
            logout();
            navigate("/auth");
          }}
        >
          Logout
        </Button>
      </div>
    ) : null}
  </nav>
);

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
