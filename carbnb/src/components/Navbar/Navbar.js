import React from "react";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { useUserContext } from "../../hooks/useUserContext";
import { Link as ScrollLink } from "react-scroll";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";
import CustomUserIcon from "./user.png";

const NavBar = () => {
  const { logout } = useLogout();
  const { user } = useUserContext();
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
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
          {location.pathname === "/" && (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <ScrollLink
                  to="about"
                  smooth={true}
                  duration={5}
                  className="nav-link"
                  style={{ cursor: "pointer" }}
                >
                  About
                </ScrollLink>
              </li>
              <li className="nav-item">
                <ScrollLink
                  to="services"
                  smooth={true}
                  duration={5}
                  className="nav-link"
                  style={{ cursor: "pointer" }}
                >
                  Services
                </ScrollLink>
              </li>
              <li className="nav-item">
                <ScrollLink
                  to="testimonials"
                  smooth={true}
                  duration={5}
                  className="nav-link"
                  style={{ cursor: "pointer" }}
                >
                  Testimonials
                </ScrollLink>
              </li>
              <li className="nav-item">
                <ScrollLink
                  to="complaint"
                  smooth={true}
                  duration={5}
                  className="nav-link"
                  style={{ cursor: "pointer" }}
                >
                  Complaints
                </ScrollLink>
              </li>
              <li className="nav-item">
                <ScrollLink
                  to="contact"
                  smooth={true}
                  duration={5}
                  className="nav-link"
                  style={{ cursor: "pointer" }}
                >
                  Contact
                </ScrollLink>
              </li>
            </ul>
          )}
          <div className="d-flex align-items-center ms-auto">
            {user ? (
              <Dropdown align="end">
                <Dropdown.Toggle
                  variant="link"
                  id="dropdown-basic"
                  className="custom-dropdown-toggle"
                >
                  <img
                    src={CustomUserIcon}
                    alt="User Icon"
                    style={{ width: "38px", height: "38px" }}
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.ItemText>
                    {user.first} {user.last}
                  </Dropdown.ItemText>
                  <Dropdown.Divider />
                  <Dropdown.Item as={RouterLink} to="/my-listings">
                    My Listings
                  </Dropdown.Item>
                  <Dropdown.Item as={RouterLink} to="/my-bookings">
                    My Bookings
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <>
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <LoginModal />
                  </li>
                  <li className="nav-item">
                    <SignUpModal />
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
      <style>{`
        .custom-dropdown-toggle::after {
          display: none !important;
        }
      `}</style>
    </nav>
  );
};

export default NavBar;
