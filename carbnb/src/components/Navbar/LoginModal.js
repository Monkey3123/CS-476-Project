import React, { useState } from "react";
import { Modal } from "bootstrap";
import NavBar from "./index";

function LoginModal() {
  const [show, setShow] = useState(false);
  const modalRef = React.createRef();

  const handleClose = () => {
    const modal = Modal.getInstance(modalRef.current);
    modal.hide();
    setShow(false);
  };

  const handleShow = () => {
    const modal = new Modal(modalRef.current);
    modal.show();
    setShow(true);
  };

  return (
    <>
      <a
        href="#"
        className="list-group-item list-group-item-action nav-link"
        onClick={handleShow}
      >
        Log In
      </a>

      <div
        className="modal"
        ref={modalRef}
        id="loginModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="loginModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="loginModalLabel">
                CaRnR Login
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                  <div id="emailHelp" className="form-text">
                    We'll never share your email with anyone else.
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Submit
                </button>

                <a className="link-opacity-75-hover" href="#">
                  I don't have an account Sign In
                </a>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginModal;
