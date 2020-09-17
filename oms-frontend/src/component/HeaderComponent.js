import React, { Component } from 'react';
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, Jumbotron } from 'reactstrap';
import { NavLink } from 'react-router-dom';

export class Header extends Component {

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

    return(
    <div>
                <Navbar dark expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto" href="/"><img src='https://www.pngmart.com/files/11/Chat-Logo-PNG-Image.png' height="30" width="41" alt='OMS' />  Online Messaging System</NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar >
                            <NavItem >
                                <NavLink className="nav-link"  to='/'><span className="fa fa-home fa-lg"></span> Home</NavLink>
                            </NavItem>
            
                            <NavItem>
                                <NavLink className="nav-link"  to='/signin'><span className="fa fa-sign-in fa-lg"></span> signin</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to='/signup'><span className="fa fa-user-circle fa-lg"></span> sign up</NavLink>
                            </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
                
            </div>
    );
  }
}
