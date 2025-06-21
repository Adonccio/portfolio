import React, { useState } from 'react'
import logo from '../assets/logo.png'
import { useTranslation } from 'react-i18next'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap'
import usa from '../assets/usa.png'
import br from '../assets/br.png'

export default function NavbarTop (args) {
  const [isOpen, setIsOpen] = useState(false)
  const { t, i18n } = useTranslation()

  const toggleLanguage = () => {
    const newLang = i18n.language === 'pt' ? 'en' : 'pt'
    i18n.changeLanguage(newLang)
  }

  const toggle = () => setIsOpen(!isOpen)

  return (
    <Navbar className='navbar' fixed='top' expand={true} container={'fluid'} {...args}>
      <div className='container navbar'>
        <NavbarBrand className='navbarItem' href="/">
          <img src={logo} alt="Logo" className="logo" />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
        <Nav className="mx-auto d-flex align-items-center gap-3" navbar>
            <NavItem>
              <NavLink className='navbarItem' href="#sobreMim">{t('navbar.about')}</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className='navbarItem' href="#techsSection">{t('navbar.techs')}</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className='navbarItem' href="#sectionProjetos">{t('navbar.projects')}</NavLink>
            </NavItem>
            <NavItem>
              <button onClick={toggleLanguage} className="btn btn-link p-0 border-0 m-auto">
                <img
                  src={i18n.language === 'pt' ? usa : br}
                  alt="Toggle language"
                  style={{ width: '24px', height: '24px' }}
                />
              </button>
            </NavItem>
          </Nav>
        </Collapse>
      </div>
    </Navbar>
  )
}
