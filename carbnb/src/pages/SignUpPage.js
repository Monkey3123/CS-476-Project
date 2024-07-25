import React, { useState } from "react";
import carBanner from "../images/option2.jpg";
import "../components/Styles/SignupPage.css";
import { useSignup } from "../hooks/useSignup";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [first, setfirst] = useState("");
  const [last, setlast] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  //const [cpassword, csetpassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signup(first, last, email, password);
    if (res) {
      navigate("/");
    }
  };

  return (
    <div
      className="banner-image"
      style={{
        backgroundImage: `url(${carBanner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <div className="signup template d-flex justify-content-center align-items-center vh-100">
        <form
          className="form1 p-4 bg-light border rounded"
          onSubmit={handleSubmit}
        >
          <h1>Sign Up to CaRnR</h1>
          <div className="mb-3">
            <label htmlFor="exampleInputFirstName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              name="first"
              id="first"
              className="form-control"
              placeholder="first"
              value={first}
              onChange={(e) => setfirst(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputLastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              name="last"
              id="last"
              className="form-control"
              placeholder="last"
              value={last}
              onChange={(e) => setlast(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="text"
              name="email"
              id="email"
              className="form-control"
              placeholder="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />

            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else (example
              abc@xyz.com).
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="text"
              name="password"
              id="password"
              className="form-control"
              placeholder="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />

            <div id="passwordHelp" className="form-text">
              Should contain one uppercase, one lowercase, one special
              character, and one number.
            </div>
          </div>
          {/* <div className="mb-3">
            <label htmlFor="exampleInputPassword2" className="form-label">
              Confirm Password
            </label>
            <input
              type="text"
              name="cpassword"
              id="cpassword"
              className="form-control"
              placeholder="cpassword"
              value={cpassword}
              onChange={(e) => csetpassword(e.target.value)}
            />
          </div> */}
          <input
            disabled={isLoading}
            type="submit"
            value="Create Account"
            className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
          />
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
