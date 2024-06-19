import React, { useState } from "react";
import carBanner from "../../images/option2.jpg";
import "./SignupPage.css";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
    cpassword: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData, [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!formData.fname.trim()) {
      validationErrors.fname = "First name is required";
    }
    if (!formData.lname.trim()) {
      validationErrors.lname = "Last name is required";
    }
    if (!formData.email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = "Email is not valid";
    }
    if (!formData.password.trim()) {
      validationErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      validationErrors.password = "Password should be at least 8 characters";
    } else if (!/(?=.*[a-z])/.test(formData.password)) {
      validationErrors.password = "Password must contain one lowercase letter";
    } else if (!/(?=.*[A-Z])/.test(formData.password)) {
      validationErrors.password = "Password must contain one uppercase letter";
    } else if (!/(?=.*[0-9])/.test(formData.password)) {
      validationErrors.password = "Password must contain one number";
    } else if (!/(?=.*[!@#$%^&*])/.test(formData.password)) {
      validationErrors.password = "Password must contain one special character";
    }
    if (formData.cpassword !== formData.password) {
      validationErrors.cpassword = "Passwords do not match";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      alert("Form Submitted successfully");
      // Handle form submission, e.g., send data to the server
    }
  };

  return (
    <div className="banner-image" style={{
      backgroundImage: `url(${carBanner})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "100vh"
    }}>
      <div className="signup template d-flex justify-content-center align-items-center vh-100">
        <form className="form1 p-4 bg-light border rounded" onSubmit={handleSubmit}>
          <h1>Sign Up to CaRnR</h1>
          <div className="mb-3">
            <label htmlFor="exampleInputFirstName" className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              id="exampleFirstName"
              name="fname"
              value={formData.fname}
              onChange={handleChange}
            />
            {errors.fname && <span className="text-danger">{errors.fname}</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputLastName" className="form-label">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="exampleLastName"
              name="lname"
              value={formData.lname}
              onChange={handleChange}
            />
            {errors.lname && <span className="text-danger">{errors.lname}</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="text-danger">{errors.email}</span>}
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else (example abc@xyz.com).</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <span className="text-danger">{errors.password}</span>}
            <div id="passwordHelp" className="form-text">Should contain one uppercase, one lowercase, one special character, and one number.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword2" className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword2"
              name="cpassword"
              value={formData.cpassword}
              onChange={handleChange}
            />
            {errors.cpassword && <span className="text-danger">{errors.cpassword}</span>}
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
