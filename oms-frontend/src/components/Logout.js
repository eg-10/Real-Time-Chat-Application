import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import '../css/swipe.min.css';
import { connect } from "react-redux";

import * as actions from "../store/actions/auth";

class Logout extends Component {

    componentDidMount() {
        this.props.logout(this.props.token);
    }

    render() {
        return (
            <Redirect to="/" />
        );
    }
}

const mapStateToProps = state => {
	return {
		token: state.auth.token
	};
};

const mapDispatchToProps = dispatch => {
	return {
		logout: (token) => dispatch(actions.authLogout(token))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Logout);