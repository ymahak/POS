import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/authServie";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await register(name, email, password);
      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        backgroundColor: "#2d3250",
        fontFamily: "'Raleway', sans-serif",
      }}
    >
      <div
        className="d-flex flex-row"
        style={{
          borderRadius: "15px",
          overflow: "hidden",
          width: "800px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
          backgroundColor: "#2d3250",
        }}
      >
        {/* Left Form Side */}
        <div
          className="p-5 d-flex flex-column justify-content-center"
          style={{ flex: 1, color: "#fff" }}
        >
          <h2 className="mb-4" style={{ fontWeight: 600 }}>
            Registration
          </h2>

          {error && (
            <div
              className="alert"
              style={{ backgroundColor: "#f28b17", color: "#fff" }}
            >
              {error}
            </div>
          )}
          {success && (
            <div
              className="alert"
              style={{ backgroundColor: "#42a1f5", color: "#fff" }}
            >
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                placeholder="Full Name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  borderRadius: "8px",
                  border: "none",
                  padding: "12px",
                }}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                placeholder="Email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  borderRadius: "8px",
                  border: "none",
                  padding: "12px",
                }}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                placeholder="Password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  borderRadius: "8px",
                  border: "none",
                  padding: "12px",
                }}
                required
              />
            </div>
            <button
              type="submit"
              className="w-100"
              style={{
                backgroundColor: "#fcb17a",
                border: "none",
                padding: "12px",
                borderRadius: "8px",
                fontWeight: 600,
                color: "#2d3250",
                cursor: "pointer",
                transition: "0.3s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#fba55c")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#fcb17a")
              }
            >
              Sign Up
            </button>
          </form>

          <div className="text-center mt-3">
  <p style={{ color: "#c1c1c1", marginBottom: "10px" }}>Already have an account?</p>
  <Link
    to="/login"
    className="w-100 d-inline-block text-center"
    style={{
      backgroundColor: "#2d3250",
      border: "1px solid #fcb17a",
      padding: "10px",
      borderRadius: "8px",
      color: "#fcb17a",
      fontWeight: 600,
      textDecoration: "none",
      transition: "0.3s",
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.backgroundColor = "#fcb17a";
      e.currentTarget.style.color = "#2d3250";
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.backgroundColor = "#2d3250";
      e.currentTarget.style.color = "#fcb17a";
    }}
  >
    Login
  </Link>
</div>

        </div>

        {/* Right Image Side */}
        <div
          style={{
            flex: 1,
            // height: "100%",
            marginTop: "50px",    // space above the image
            marginBottom: "50px",
            backgroundImage: `url('/Signup.png')`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Signup;
