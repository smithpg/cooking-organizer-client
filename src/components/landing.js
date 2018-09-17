import React, { Component } from 'react';
import { Router } from "@reach/router";
import { connect } from "react-redux";

import styled from "styled-components";

import { authUser } from "../store/actions/auth"
import { removeError } from "../store/actions/error";
import AuthForm from "./authForm";

const Style = styled.div`
    height: 100vh;
    width: 100vw;

    background-color: teal; 
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;   
`


const Landing = props=> {
    
    const { authUser, errors, removeError, currentUser } = props;

    return ( 
        <Style>
            <Router>
                <AuthForm 
                    path="/"
                    errors={errors}
                    removeError = {removeError}
                    onAuth = {authUser} 
                    buttonText = "Log in" 
                    heading="Welcome Back." 
                />
        
                <AuthForm 
                    path="signup"
                    errors={errors}
                    removeError = {removeError}
                    signUp
                    onAuth = {authUser} 
                    buttonText = "Sign me up!" 
                    heading="Join today!" 
                />
            </Router>
        </Style>
    );    
}


function mapStateToProps(state){
    return {
        currentUser: state.currentUser,
        errors: state.errors
    }
}

export default connect(mapStateToProps, { authUser, removeError })(Landing);