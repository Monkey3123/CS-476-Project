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
          <a className="navbar-brand" href="#">
            <button
              className="btn btn-primary"
              type="button"
              // data-bs-toggle="offcanvas"
              // data-bs-target="#offcanvasSidebar"
              // aria-controls="offcanvasSidebar"
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

          <Link to="/" className="navbar-brand" aria-current="page">
            CaRnR
          </Link>
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
                <Link to="/" className="nav-link active" aria-current="page">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/FindCars"
                  className="nav-link active"
                  aria-current="page"
                >
                  Rent
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/ListACarPage"
                  className="nav-link active"
                  aria-current="page"
                >
                  List
                </Link>
              </li>
            </ul>
            {user && (
              <>
                <ul>Signed in with {user.email}</ul>
                <ul className="nav-item">
                  <button onClick={handleLogout}>Logout</button>
                </ul>
              </>
            )}

            {!user && (
              <>
                <ul>
                  <LoginModal />
                </ul>
                <ul>
                  <Link to="/SignUpPage" className="nav-link">
                    Sign Up
                  </Link>
                </ul>
              </>
            )}
          </div>
        </div>
      </nav>
      {/* <div
        className="offcanvas offcanvas-start"
        data-bs-backdrop="static"
        tabIndex="-1"
        id="offcanvasSidebar"
        aria-labelledby="offcanvasSidebarLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasSidebarLabel">
            CaRnR
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="list-group">
          <a
            href="#"
            className="list-group-item list-group-item-action active"
            aria-current="true"
          >
            Home
          </a>
          <a href="#" className="list-group-item list-group-item-action">
            About
          </a>
          <a href="#" className="list-group-item list-group-item-action">
            Discover
          </a>
          <a
            className="list-group-item list-group-item-action disabled"
            aria-disabled="true"
          >
            A disabled link item
          </a>
        </div>
      </div> */}
    </>
  );
};

export default NavBar;
