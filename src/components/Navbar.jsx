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
                  <NavLink className='navbarItem' href="#sobreMim">
                  Sobre Mim
                  </NavLink>
                <NavItem>
                  <NavLink className='navbarItem' href="#techsSection">
                    Tecnologias
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className='navbarItem' href="#sectionProjetos">
                    Projetos
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
            </Collapse>
    </div>
      </Navbar>
  );
}