import React, { useState } from 'react';
import logo from '../assets/logo.png'

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';

export default function NavbarTop (args) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
      <Navbar className='navbar' fixed='top' expand={true} container={'fluid'}{...args}>
        <div className='container navbar'>
            <NavbarBrand className='navbarItem' href="/"><img src={logo} alt="" className="logo" /></NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="me-auto" navbar>
                  <NavLink className='navbarItem' target='_blank' href="https://www.instagram.com/adonccio/">
                  Instagram
                  </NavLink>
                <NavItem>
                  <NavLink className='navbarItem' target='_blank'  href="https://www.linkedin.com/in/gustavo-adoncio-51a4a8276/">
                    LinkedIn
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className='navbarItem' target='_blank' href="https://github.com/Adonccio">
                    GitHub
                  </NavLink>
                </NavItem>
                {/* <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle className='navbarItem'  nav caret>
                    Options
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem className='navbarItem' >Option 1</DropdownItem>
                    <DropdownItem className='navbarItem' >Option 2</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem className='navbarItem' >Reset</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown> */}
              </Nav>
              <NavbarText className='navbarItem' ><p >Adoncio</p></NavbarText>
            </Collapse>
    </div>
      </Navbar>
  );
}