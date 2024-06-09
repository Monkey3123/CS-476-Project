import React from 'react';
import {FaBars} from 'react-icons/fa'
import { Nav, NavBarContainer, NavLogo, MobileIcon, NavMenu, NavItems, NavLink, NavBtn, NavBtnLink } from './NavBarElements';
const NavBar = () => {
  return (
    <>
        <Nav>
            <NavBarContainer>
                <NavLogo to = '/'>
                    CarBnB
                </NavLogo>
                <MobileIcon>
                    <FaBars />
                </MobileIcon>
                <NavMenu>
                    <NavItems>
                        <NavLink to='about'>About</NavLink>
                    </NavItems>
                    <NavItems>
                        <NavLink to='discover'>Discover</NavLink>
                    </NavItems>
                    <NavItems>
                        <NavLink to='services'>Services</NavLink>
                    </NavItems>
                    <NavItems>
                        <NavLink to='signup'>Sign Up</NavLink>
                    </NavItems>
                </NavMenu>
                <NavBtn>
                    <NavBtnLink to="/signup">Sign In</NavBtnLink>
                </NavBtn>
            </NavBarContainer>
        </Nav>
    </>
  );
};

export default NavBar;
