import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import '../css/swipe.min.css';

import * as actions from '../store/actions/chat';
import { Dialog } from '@material-ui/core';


class Navigation extends Component {

    state = {
        open_change_dp_dialog: false,
        dp: null,
    }

    handleOpenChangeDPDialog = () => {
        this.setState({ open_change_dp_dialog: true });
    }

    handleCloseChangeDPDialog = () => {
        this.setState({ open_change_dp_dialog: false });
    }

    handleImageChange = e => {
        this.setState({ dp: e.target.files[0] });
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.changeDP(this.state.dp, this.props.token);
        this.handleCloseChangeDPDialog();
    }

    render() {
        return (
            <div className="navigation">
                <div className="container">
                    <div className="inside">
                        <div className="nav nav-tab menu">
                            <button className="btn" onClick={this.handleOpenChangeDPDialog}>
                                <img 
                                    className="avatar-xl" 
                                    src={
                                        this.props.dp_url && this.props.dp_url.length ? 
                                        this.props.dp_url :
                                        "no-profile.png"
                                    } 
                                    alt="avatar" />
                            </button>
                            <Dialog open={this.state.open_change_dp_dialog} onClose={this.handleCloseChangeDPDialog} >
                                <div className="p-5">
                                    <form onSubmit={this.handleSubmit} className="position-relative w-100">
                                        <h1>Change Your DP</h1>
                                        <hr />
                                        <input type="file"
                                            id="dp_input"
                                            accept="image/png, image/jpeg" onChange={this.handleImageChange} required />
                                        <br /><br />
                                        <button type="submit" className="btn button" >Submit</button>
                                    </form>
                                </div>
                            </Dialog>
                            <NavLink activeClassName="active" to="/contacts" className="material-icons">account_circle</NavLink>
                            <NavLink exact to="/" activeClassName="active" className="material-icons">chat_bubble_outline</NavLink>
                            {/* <a href="#notifications" data-toggle="tab" className="f-grow1"><i className="material-icons">notifications_none</i></a> */}
                            {/* <button className="btn mode"><i className="material-icons">brightness_2</i></button>
                            <a href="#settings" data-toggle="tab"><i className="material-icons">settings</i></a> */}
                            <NavLink to="/logout" activeClassName="active" className="btn power material-icons">power_settings_new</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        dp_url: state.chat.dp_url,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeDP: (dp, token) => dispatch(actions.changeDP(dp, token)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);