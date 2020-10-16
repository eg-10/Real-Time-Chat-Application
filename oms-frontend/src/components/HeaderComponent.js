import React, { Component } from 'react';
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, Jumbotron } from 'reactstrap';
import { Link, NavLink } from 'react-router-dom';
import { connect } from "react-redux";

class Header extends Component {

	constructor(props) {
		super(props);

		this.toggleNav = this.toggleNav.bind(this);
		this.state = {
			isNavOpen: false
		};
	}

	toggleNav() {
		this.setState({
			isNavOpen: !this.state.isNavOpen
		});
	}

	render() {
		return (
			<div>
				<Navbar dark expand="md">
					<div className="container">
						<NavbarToggler onClick={this.toggleNav} />
						<Link to="/">
							<NavbarBrand className="mr-md-auto" href="#">
								<img src='chatlogo.png' height="30" width="41" alt='OMS' /> Real Time Chat App
							</NavbarBrand>
						</Link>
						<Collapse isOpen={this.state.isNavOpen} navbar>
							{this.props.isAuthenticated ?
								<Nav navbar className="ml-auto" >
									<NavItem>
										<NavLink className="nav-link" to='/logout'><span className="fa fa-sign-out fa-lg"></span> Logout</NavLink>
									</NavItem>
								</Nav>
								:
								<Nav navbar className="ml-auto" >
									<NavItem>
										<NavLink className="nav-link" to='/login'><span className="fa fa-sign-in fa-lg"></span> Login</NavLink>
									</NavItem>
									<NavItem>
										<NavLink className="nav-link" to='/signup'><span className="fa fa-user-circle fa-lg"></span> Sign Up</NavLink>
									</NavItem>
								</Nav>
							}
						</Collapse>
					</div>
				</Navbar>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null,
	};
};

export default connect(mapStateToProps)(Header);
