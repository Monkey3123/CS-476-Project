import React from "react";
import { FaBars } from "react-icons/fa";
import {
  Nav,
  NavBarContainer,
  NavLogo,
  MobileIcon,
  NavMenu,
  NavItems,
  NavLink,
  NavBtn,
  NavBtnLink,
} from "./NavBarElements";

const onClick = () => {
  // code to be executed when the button is clicked
  console.log("Button clicked!");
};

const NavBar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <button
              className="btn btn-primary"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#staticBackdrop"
              aria-controls="staticBackdrop"
              onClick={onClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-layout-sidebar"
                viewBox="0 0 16 16"
              >
                <path d="M0 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm5-1v12h9a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1zM4 2H2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h2z" />
              </svg>
            </button>
          </a>
          <a className="navbar-brand" href="#">
            CaRnR
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Discover
                </a>
              </li>
            </ul>
            <ul className="nav-item">
              <a className="nav-link" href="#">
                Log In
              </a>
            </ul>
            <ul className="nav-item">
              <a className="nav-link" href="#">
                Sign Up
              </a>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
