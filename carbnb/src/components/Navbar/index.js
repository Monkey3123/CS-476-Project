import React from "react";
import LoginModal from "./LoginModal";
import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { useUserContext } from "../../hooks/useUserContext";

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
        <Link to="/" className="navbar-brand" aria-current="page">
          <img
            src={require("./logo.png")}
            alt="logo"
            style={{ height: "52px", marginLeft: "75px" }} // Adjusted margin for the logo
          />
        </Link>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/Rent" className="nav-link">About Us</Link>
            </li>
            <li className="nav-item">
              <Link to="/List" className="nav-link">Contact Us</Link>
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
                    <Link to="/SignUpPage" className="nav-link">
                      <button
                        className="btn"
                        style={{ backgroundColor: '#2b4275', color: '#ffffff', borderColor: '#001f3f' }}
                      >
                        Sign Up
                      </button>
                    </Link>
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
