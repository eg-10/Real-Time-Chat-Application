import React, { Component } from 'react';
import '../css/swipe.min.css';

export default class Message extends Component {
    render() {
        return (

            <div className={this.props.me ? "message me" : "message"}>
                {
                    this.props.me ? null :
                        <img
                            className="avatar-md"
                            src={this.props.dp_url}
                            alt="avatar" />
                }
                <div className="text-main">
                    <div className="text-group">
                        <div className={this.props.me ? "text me" : "text"}>
                            {!(this.props.me) ?
                                <p className="text-dark text-primary font-weight-bold">{this.props.sender}</p>
                                : null
                            }
                            <p className={this.props.me ? "" : "text-dark"}>{this.props.message}</p>
                        </div>
                    </div>
                    <span>{this.props.time}</span>
                </div>
            </div>

        );
    }
}