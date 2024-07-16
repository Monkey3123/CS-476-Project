import React from "react";
import LoginModal from "./LoginModal";
import { Link as RouterLink } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { useUserContext } from "../../hooks/useUserContext";
import { Link as ScrollLink } from "react-scroll";

const NavBar = () => {
  const { logout } = useLogout();
  const { user } = useUserContext();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
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
        <RouterLink to="/" className="navbar-brand" aria-current="page">
          <img
            src={require("./logo.png")}
            alt="logo"
            style={{ height: "52px", marginLeft: "75px" }} 
          />
        </RouterLink>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
            <ScrollLink to="about" smooth={true} duration={5} className="nav-link" style={{ cursor: 'pointer' }}>About Us</ScrollLink>
            </li>
            <li className="nav-item">
            <ScrollLink to="contact" smooth={true} duration={5} className="nav-link" style={{ cursor: 'pointer' }}>Contact Us</ScrollLink>
            </li>
          </ul>
          <div className="d-flex align-items-center ms-auto">
            {user ? (
              <>
                <span className="navbar-text" style={{ marginRight: "10px" }}>
                  {user.first} {user.last}
                </span>
                <button
                  className="btn"
                  style={{ backgroundColor: '#2b4275', color: '#ffffff', borderColor: '#001f3f' }}
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <LoginModal />
                  </li>
                  <li className="nav-item">
                    <RouterLink to="/SignUpPage" className="nav-link">
                      <button
                        className="btn"
                        style={{ backgroundColor: '#2b4275', color: '#ffffff', borderColor: '#001f3f' }}
                      >
                        Sign Up
                      </button>
                    </RouterLink>
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
