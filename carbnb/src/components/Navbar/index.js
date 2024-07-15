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
    <>
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
            style={{ marginRight: "auto" }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="d-flex align-items-center">
          <Link to="/" className="navbar-brand" aria-current="page">
            <img src={require("./logo.png")} alt="logo" style={{ height: "52px", marginLeft:"100px" }} />
          </Link>
          </div>
          <div className="collapse navbar-collapse justify-content-end" id="navbarText">
            {user && (
              <>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <span className="nav-link active" style={{marginLeft: "1030px"}}> {user.first} {user.last}</span>
                  </li>
                </ul>
                <button
                    className="btn"
                    style={{ backgroundColor: '#2b4275', color: '#ffffff', borderColor: '#001f3f' }}
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
              </>
            )}

            {!user && (
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
      </nav>
    </>
  );
};

export default NavBar;
