import React, { useState } from "react";
import { Modal } from "bootstrap";
import { useLogin } from "../../hooks/useLogin";
import SignUpModal from "./SignUpModal";
import "../Styles/LoginModal.css";

function LoginModal() {
  const modalRef = React.createRef();

  const handleClose = () => {
    const modal = Modal.getInstance(modalRef.current);
    modal.hide();
  };

  const handleShow = () => {
    const modal = new Modal(modalRef.current);
    modal.show();
  };

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    const modal = Modal.getInstance(modalRef.current);
    e.preventDefault();
    const res = await login(email, password);
    if (res) {
      modal.hide();
    }
  };

  return (
    <>
      <a href="#" className="nav-link" onClick={handleShow}>
        <button
          className="btn"
          style={{
            backgroundColor: "#324b5f",
            color: "#ffffff",
            borderColor: "#001f3f",
          }}
        >
          Log In
        </button>
      </a>

      <div
        className="modal fade"
        ref={modalRef}
        id="loginModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="loginModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 id="loginModalLabel">CaRnR Login</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="login" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
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
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn"
                  style={{
                    backgroundColor: "#324b5f",
                    color: "#ffffff",
                    borderColor: "#001f3f",
                  }}
                >
                  Submit
                </button>
                {error && <div className="error">{error}</div>}
                <div className="sign-up-link">
                  <div onClick={handleClose}>
                    <span>Need an account? </span>
                    <SignUpModal />
                  </div>
                </div>
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
