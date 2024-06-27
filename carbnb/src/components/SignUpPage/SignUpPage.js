import React, { useState, useEffect } from "react";
import carBanner from "../../images/option2.jpg";
import "./SignupPage.css";
import { useParams, useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [form, setForm] = useState({
    first: "",
    last: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const [isNew, setIsNew] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString() || undefined;
      if (!id) return;
      setIsNew(false);
      const response = await fetch(
        `http://localhost:5050/record/${params.id.toString()}`
      );
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const record = await response.json();
      if (!record) {
        console.warn(`Record with id ${id} not found`);
        navigate("/");
        return;
      }
      setForm(record);
    }
    fetchData();
    return;
  }, [params.id, navigate]);

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const validationErrors = {};

    if (!form.first.trim()) {
      validationErrors.first = "First name is required";
    }
    if (!form.last.trim()) {
      validationErrors.last = "Last name is required";
    }
    if (!form.email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      validationErrors.email = "Email is not valid";
    }
    if (!form.password.trim()) {
      validationErrors.password = "Password is required";
    } else if (form.password.length < 8) {
      validationErrors.password = "Password should be at least 8 characters";
    } else if (!/(?=.*[a-z])/.test(form.password)) {
      validationErrors.password = "Password must contain one lowercase letter";
    } else if (!/(?=.*[A-Z])/.test(form.password)) {
      validationErrors.password = "Password must contain one uppercase letter";
    } else if (!/(?=.*[0-9])/.test(form.password)) {
      validationErrors.password = "Password must contain one number";
    } else if (!/(?=.*[!@#$%^&*])/.test(form.password)) {
      validationErrors.password = "Password must contain one special character";
    }
    if (form.cpassword !== form.password) {
      validationErrors.cpassword = "Passwords do not match";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      if (isNew) {
        const person = { ...form };
        try {
          let response;

          response = await fetch("http://localhost:5050/record", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(person),
          });
          if (response.status === 200) {
            alert("Form Submitted successfully");
            setForm({
              first: "",
              last: "",
              email: "",
              password: "",
              cpassword: "",
            });
            navigate("/");
          } else {
            alert("Email in Use");
          }
        } catch (error) {
          console.error(
            "A problem occurred with your fetch operation: ",
            error
          );
        }
      }
    }
  }

  const [errors, setErrors] = useState({});

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
        <form className="form1 p-4 bg-light border rounded" onSubmit={onSubmit}>
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
              value={form.first}
              onChange={(e) => updateForm({ first: e.target.value })}
            />
            {errors.first && (
              <span className="text-danger">{errors.first}</span>
            )}
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
              value={form.last}
              onChange={(e) => updateForm({ last: e.target.value })}
            />
            {errors.last && <span className="text-danger">{errors.last}</span>}
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
              value={form.email}
              onChange={(e) => updateForm({ email: e.target.value })}
            />
            {errors.email && (
              <span className="text-danger">{errors.email}</span>
            )}
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
              value={form.password}
              onChange={(e) => updateForm({ password: e.target.value })}
            />
            {errors.password && (
              <span className="text-danger">{errors.password}</span>
            )}
            <div id="passwordHelp" className="form-text">
              Should contain one uppercase, one lowercase, one special
              character, and one number.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword2" className="form-label">
              Confirm Password
            </label>
            <input
              type="text"
              name="cpassword"
              id="cpassword"
              className="form-control"
              placeholder="cpassword"
              value={form.cpassword}
              onChange={(e) => updateForm({ cpassword: e.target.value })}
            />
            {errors.cpassword && (
              <span className="text-danger">{errors.cpassword}</span>
            )}
          </div>
          <input
            type="submit"
            value="Create Account"
            className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
          />
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
