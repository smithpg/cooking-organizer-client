import React from 'react';
import { navigate } from "@reach/router";
import { connect } from "react-redux";
import styled from "styled-components";

import logo from '../logo.svg';
import {logout} from "../store/actions/auth";

const Style = styled.header`
    display: flex;
    justify-content: space-between;

    div{
        display: flex;
        align-items: center;

    }

    .username{
        margin-right: 1rem;
        color: white;
    }
`

const Navbar = ({currentUser, logout}) =>(
    <Style className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <h1 className="App-title">Home Cooking Organizer</h1>
        
        {currentUser.isAuthenticated
            ? (
                <div>
                    <span className="username">{currentUser.user.username}</span>
                    <button onClick={() => {logout(); navigate("/auth");}}>Logout</button>
                </div>
            )
            : null
        }
            
    </Style>
)

 
function mapStateToProps(state){
    return {
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps,{logout})(Navbar);