import React, { Component } from 'react';
import '../css/swipe.min.css';
import {Contacts} from './Contacts';
import Discussions from './Discussions';
import {Notification} from './Notification';
import {Setting } from './Settings';

export class Sidebar extends Component{
    render(){
        return(
            
                <div className="sidebar" id="sidebar">
                            <div className="container">
                                <div className="col-md-12">
                                    <div className="tab-content">
										<Discussions/>
									</div>
                               	</div>
                        	</div>
						</div>
            
        )
    }
}
