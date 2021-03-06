import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import '../css/swipe.min.css';
import { connect } from 'react-redux';
import { CircularProgress, Dialog } from '@material-ui/core';
import Select from 'react-select';

import * as actions from '../store/actions/chat';


class Contacts extends Component {

    state = {
        open_add_contact_dialog: false,
        open_create_group_dialog: false,
        contact_options: [],
        selectedOptions: []
    }

    componentDidMount() {
        let contact_options = this.getContactOptions();
        this.setState({ contact_options });
    }

    componentDidUpdate(previousProps, previousState) {
        if (previousProps.contacts != this.props.contacts) {
            let contact_options = this.getContactOptions();
            this.setState({ contact_options });
        }
    }

    getContactOptions = () => {
        let options = [];
        if (this.props.contacts) {
            this.props.contacts.map(contact => {
                options.push({
                    value: contact.id,
                    label: (
                        contact.user.first_name + ' ' +
                        contact.user.last_name + ' (' + contact.user.username
                        + ')'
                    )
                });
            });
        }
        console.log("Contact Options: ", options);
        return options;
    }

    handleOpenAddContactDialog = () => {
        this.setState({ open_add_contact_dialog: true });
    }

    handleCloseAddContactDialog = () => {
        this.setState({ open_add_contact_dialog: false });
    }

    handleOpenCreateGroupDialog = () => {
        this.setState({ open_create_group_dialog: true });
    }

    handleCloseCreateGroupDialog = () => {
        this.setState({ open_create_group_dialog: false });
    }

    handleAddNewContact = e => {
        e.preventDefault();
        this.props.addNewContact(
            e.target.new_contact_username.value,
            this.props.token
        );
        this.handleCloseAddContactDialog();
    }

    handleSelectGroupContact = selectedOptions => {
        this.setState({ selectedOptions });
    }

    handleCreateNewGroup = e => {
        e.preventDefault();
        let participants = [];
        this.state.selectedOptions.map(opt => {
            participants.push(opt.value);
        });
        participants.push(this.props.customer_id);
        console.log("participants", participants);
        this.props.createNewGroup(e.target.group_name.value, participants, this.props.token);
        this.handleCloseCreateGroupDialog();
    }

    handleContactSelected = contact_id => {
        this.props.contactSelected(contact_id, this.props.customer_id, this.props.chats, this.props.token);
    }

    render() {
        return (
            this.props.chats_loading ?
                <Redirect to="/" /> :
                <div className="main">
                    <div className="tab-content" id="nav-tabContent">
                        <div className="babble tab-pane fade active show" id="list-chat" role="tabpanel" aria-labelledby="list-chat-list">
                            <div className="chat">
                                <div className="top">
                                    <div className="container">
                                        <div className="col-md-12">
                                            <div className="inside">
                                                <h1 className="text-dark">Contacts</h1>
                                                <div className="ml-auto">
                                                    <Fab
                                                        className="mr-4"
                                                        style={{ backgroundColor: "#2196F3", outline: "none" }}
                                                        onClick={this.handleOpenCreateGroupDialog}>
                                                        <GroupAddIcon style={{ fill: "white" }} />
                                                    </Fab>
                                                    <Fab
                                                        style={{ backgroundColor: "#2196F3", outline: "none" }}
                                                        onClick={this.handleOpenAddContactDialog}>
                                                        <AddIcon style={{ fill: "white" }} />
                                                    </Fab>
                                                    <Dialog open={this.state.open_add_contact_dialog} onClose={this.handleCloseAddContactDialog} >
                                                        <div className="p-5">
                                                            <form onSubmit={this.handleAddNewContact} className="position-relative w-100">
                                                                <h1>Add a New Contact</h1>
                                                                <hr />
                                                                <input name="new_contact_username" type="text" className="form-control" placeholder="Enter username..." required></input>
                                                                <br />
                                                                <button type="submit" className="btn button" >Add</button>
                                                            </form>
                                                        </div>
                                                    </Dialog>
                                                    <Dialog
                                                        open={this.state.open_create_group_dialog}
                                                        onClose={this.handleCloseCreateGroupDialog}
                                                        fullWidth={true}
                                                        maxWidth="sm"
                                                    >
                                                        <div className="p-5">
                                                            <form onSubmit={this.handleCreateNewGroup} className="position-relative w-100">
                                                                <h1>Create a Group Chat</h1>
                                                                <hr />
                                                                <input name="group_name" type="text" className="form-control" placeholder="Enter group name..." required></input>
                                                                <br />
                                                                <Select
                                                                    isMulti
                                                                    placeholder="Select the Members of Group..."
                                                                    onChange={this.handleSelectGroupContact}
                                                                    options={this.state.contact_options}
                                                                    closeMenuOnSelect={false}
                                                                />
                                                                <br />
                                                                <button type="submit" className="btn button" >Create</button>
                                                            </form>
                                                        </div>
                                                    </Dialog>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="content" id="content">
                                    <div className="container mt-0">
                                        <div className="col-md-12">
                                            <div className="contacts">
                                                <div className="list-group text-dark" id="contacts" role="tablist">
                                                    {
                                                        this.props.error ?
                                                            <p className="text-center text-danger mb-2">{this.props.error}</p>
                                                            : null
                                                    }
                                                    {
                                                        this.props.contacts_loading ?
                                                            <p className="text-center mb-2"><CircularProgress /></p>
                                                            : null
                                                    }

                                                    {
                                                        this.props.contacts && this.props.contacts.length ?
                                                            this.props.contacts.map(contact => {
                                                                return (
                                                                    <Link
                                                                        key={contact.id}
                                                                        to="/#chat-layout"
                                                                        className="pt-2 pb-2 filterMembers all online contact border-bottom mb-2"
                                                                        onClick={() => this.handleContactSelected(contact.id)}
                                                                    >
                                                                        <img
                                                                            className="avatar-lg float-left mr-5"
                                                                            src={
                                                                                contact.profile_photo && contact.profile_photo.length ?
                                                                                contact.profile_photo
                                                                                : "no-profile.png"
                                                                            }
                                                                            alt="avatar" />
                                                                        <div className="data float-left ml-5">
                                                                            <h2>{contact.user.first_name} {contact.user.last_name}</h2>
                                                                            <p>{contact.user.username}</p>
                                                                        </div>
                                                                    </Link>
                                                                );
                                                            })
                                                            : <p className="text-center">You haven't added any contacts yet!</p>
                                                    }
                                                    {/* <Link to="#" className="filterMembers all online contact border-bottom mb-2">
                                                        <img className="avatar-lg float-left mr-5" src={require("../img/avatars/avatar-female-1.jpg")} title="Janette" alt="avatar" />
                                                        <div className="data float-left ml-5">
                                                            <h2>Janette Dalton</h2>
                                                            <p>Sofia, Bulgaria</p>
                                                        </div>
                                                    </Link> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        contacts_loading: state.chat.contacts_loading,
        error: state.chat.error,
        token: state.auth.token,
        chats: state.chat.chats,
        contacts: state.chat.contacts,
        customer_id: state.auth.customer_id,
        chats_loading: state.chat.chats_loading,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addNewContact: (contact_username, token) =>
            dispatch(actions.addContact(contact_username, token)),
        createNewGroup: (name, participants, token) =>
            dispatch(actions.createGroup(name, participants, token)),
        contactSelected: (contact_id, user_id, chats, token) =>
            dispatch(actions.contactSelected(contact_id, user_id, chats, token)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);

{/* <div className="tab-pane fade" id="members">
    <div className="search">
        <form className="form-inline position-relative">
            <input type="search" className="form-control" id="people" placeholder="Search for people..." />
            <button type="button" className="btn btn-link loop"><i className="material-icons">search</i></button>
        </form>
        <button className="btn create" data-toggle="modal" data-target="#exampleModalCenter"><i className="material-icons">person_add</i></button>
    </div>
    <div className="list-group sort">
        <button className="btn filterMembersBtn active show" data-toggle="list" data-filter="all">All</button>
        <button className="btn filterMembersBtn" data-toggle="list" data-filter="online">Online</button>
        <button className="btn filterMembersBtn" data-toggle="list" data-filter="offline">Offline</button>
    </div>
    <div className="contacts">
        <h1>Contacts</h1>
        <div className="list-group" id="contacts" role="tablist">
            <a href="#" className="filterMembers all online contact" data-toggle="list">
                <img className="avatar-md" src={require("../img/avatars/avatar-female-1.jpg")} data-toggle="tooltip" data-placement="top" title="Janette" alt="avatar" />
                <div className="status">
                    <i className="material-icons online">fiber_manual_record</i>
                </div>
                <div className="data">
                    <h5>Janette Dalton</h5>
                    <p>Sofia, Bulgaria</p>
                </div>
                <div className="person-add">
                    <i className="material-icons">person</i>
                </div>
            </a>
            <a href="#" className="filterMembers all online contact" data-toggle="list">
                <img className="avatar-md" src={require("../img/avatars/avatar-male-1.jpg")} data-toggle="tooltip" data-placement="top" title="Michael" alt="avatar" />
                <div className="status">
                    <i className="material-icons online">fiber_manual_record</i>
                </div>
                <div className="data">
                    <h5>Michael Knudsen</h5>
                    <p>Washington, USA</p>
                </div>
                <div className="person-add">
                    <i className="material-icons">person</i>
                </div>
            </a>
            <a href="#" className="filterMembers all online contact" data-toggle="list">
                <img className="avatar-md" src={require("../img/avatars/avatar-female-2.jpg")} data-toggle="tooltip" data-placement="top" title="Lean" alt="avatar" />
                <div className="status">
                    <i className="material-icons online">fiber_manual_record</i>
                </div>
                <div className="data">
                    <h5>Lean Avent</h5>
                    <p>Shanghai, China</p>
                </div>
                <div className="person-add">
                    <i className="material-icons">person</i>
                </div>
            </a>
            <a href="#" className="filterMembers all online contact" data-toggle="list">
                <img className="avatar-md" src={require("../img/avatars/avatar-male-2.jpg")} data-toggle="tooltip" data-placement="top" title="Mariette" alt="avatar" />
                <div className="status">
                    <i className="material-icons online">fiber_manual_record</i>
                </div>
                <div className="data">
                    <h5>Mariette Toles</h5>
                    <p>Helena, Montana</p>
                </div>
                <div className="person-add">
                    <i className="material-icons">person</i>
                </div>
            </a>
            <a href="#" className="filterMembers all online contact" data-toggle="list">
                <img className="avatar-md" src={require("../img/avatars/avatar-female-3.jpg")} data-toggle="tooltip" data-placement="top" title="Harmony" alt="avatar" />
                <div className="status">
                    <i className="material-icons online">fiber_manual_record</i>
                </div>
                <div className="data">
                    <h5>Harmony Otero</h5>
                    <p>Indore, India</p>
                </div>
                <div className="person-add">
                    <i className="material-icons">person</i>
                </div>
            </a>
            <a href="#" className="filterMembers all offline contact" data-toggle="list">
                <img className="avatar-md" src={require("../img/avatars/avatar-female-5.jpg")} data-toggle="tooltip" data-placement="top" title="Keith" alt="avatar" />
                <div className="status">
                    <i className="material-icons offline">fiber_manual_record</i>
                </div>
                <div className="data">
                    <h5>Keith Morris</h5>
                    <p>Chisinau, Moldova</p>
                </div>
                <div className="person-add">
                    <i className="material-icons">person</i>
                </div>
            </a>
            <a href="#" className="filterMembers all offline contact" data-toggle="list">
                <img className="avatar-md" src={require("../img/avatars/avatar-female-6.jpg")} data-toggle="tooltip" data-placement="top" title="Louis" alt="avatar" />
                <div className="status">
                    <i className="material-icons offline">fiber_manual_record</i>
                </div>
                <div className="data">
                    <h5>Louis Martinez</h5>
                    <p>Vienna, Austria</p>
                </div>
                <div className="person-add">
                    <i className="material-icons">person</i>
                </div>
            </a>
            <a href="#" className="filterMembers all offline contact" data-toggle="list">
                <img className="avatar-md" src={require("../img/avatars/avatar-male-3.jpg")} data-toggle="tooltip" data-placement="top" title="Ryan" alt="avatar" />
                <div className="status">
                    <i className="material-icons offline">fiber_manual_record</i>
                </div>
                <div className="data">
                    <h5>Ryan Foster</h5>
                    <p>Oslo, Norway</p>
                </div>
                <div className="person-add">
                    <i className="material-icons">person</i>
                </div>
            </a>
            <a href="#" className="filterMembers all offline contact" data-toggle="list">
                <img className="avatar-md" src={require("../img/avatars/avatar-male-4.jpg")} data-toggle="tooltip" data-placement="top" title="Mildred" alt="avatar" />
                <div className="status">
                    <i className="material-icons offline">fiber_manual_record</i>
                </div>
                <div className="data">
                    <h5>Mildred Bennett</h5>
                    <p>London, United Kingdom</p>
                </div>
                <div className="person-add">
                    <i className="material-icons">person</i>
                </div>
            </a>
        </div>
    </div>
</div> */}