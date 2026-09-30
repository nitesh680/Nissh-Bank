import { useState } from "react";
import axios from "axios";
import "./Login.css";

function Login({ onLogin, onRegister }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // =========================================
  // LOGIN
  // =========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Please enter username and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          username: username.trim(),
          password: password
        }
      );

      console.log("Login response:", response.data);

      // =====================================
      // SAVE LOGIN INFORMATION
      // =====================================

      const data = response.data;

      if (data.token) {
        localStorage.setItem(
          "token",
          data.token
        );
      }

      if (data.username) {
        localStorage.setItem(
          "username",
          data.username
        );
      } else {
        localStorage.setItem(
          "username",
          username.trim()
        );
      }

      if (data.accountNumber) {
        localStorage.setItem(
          "accountNumber",
          data.accountNumber
        );
      }

      // =====================================
      // LOGIN SUCCESS
      // =====================================

      onLogin();

    } catch (err) {

      console.error(
        "Login error:",
        err
      );

      if (err.response?.data?.message) {
        setError(
          err.response.data.message
        );
      } else {
        setError(
          "Invalid username or password."
        );
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      {/* =====================================
          LEFT SIDE
      ===================================== */}

      <div className="login-left">

        {/* BRAND */}

        <div className="login-brand">

          <div className="login-brand-icon">
            🏦
          </div>

          <div>
            <h1>Nissh</h1>
            <span>Bank</span>
          </div>

        </div>

        {/* FORM */}

        <div className="login-container">

          <div className="login-heading">

            <span className="login-label">
              WELCOME BACK
            </span>

            <h2>
              Sign in to your account
            </h2>

            <p>
              Enter your credentials to access
              your banking dashboard.
            </p>

          </div>

          {/* ERROR */}

          {error && (
            <div className="login-error">
              ⚠️
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* USERNAME */}

            <div className="form-group">

              <label>
                Username
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  👤
                </span>

                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) =>
                    setUsername(e.target.value)
                  }
                />

              </div>

            </div>

            {/* PASSWORD */}

            <div className="form-group">

              <div className="password-label">

                <label>
                  Password
                </label>

                <button
                  type="button"
                  className="forgot-button"
                  onClick={() =>
                    alert(
                      "Please contact support to reset your password."
                    )
                  }
                >
                  Forgot password?
                </button>

              </div>

              <div className="input-wrapper">

                <span className="input-icon">
                  🔐
                </span>

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                />

              </div>

            </div>

            {/* REMEMBER */}

            <div className="login-options">

              <label className="remember">

                <input
                  type="checkbox"
                />

                <span>
                  Remember me
                </span>

              </label>

              <span className="secure-login">
                🔒 Secure Login
              </span>

            </div>

            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading
                ? "Signing in..."
                : "Sign In →"}
            </button>

          </form>

          {/* REGISTER */}

          <div className="register-link">

            <span>
              Don't have an account?
            </span>

            <button
              type="button"
              onClick={onRegister}
            >
              Sign Up
            </button>

          </div>

          {/* SECURITY */}

          <div className="security-message">

            <div className="security-check">
              ✓
            </div>

            <div>

              <strong>
                Your security matters
              </strong>

              <p>
                Your connection is protected
                using secure authentication.
              </p>

            </div>

          </div>

          {/* FOOTER */}

          <div className="login-footer">
            Nissh Bank
            <span>•</span>
            Secure Banking
            <span>•</span>
            © 2026
          </div>

        </div>

      </div>

      {/* =====================================
          RIGHT SIDE
      ===================================== */}

      <div className="login-right">

        <div className="right-content">

          <span className="right-label">
            NISSH BANK
          </span>

          <h2>
            Banking and more.
            <br />
            It's really that simple.
          </h2>

          <p>
            Simple, secure and smarter banking
            for your everyday life.
          </p>

          {/* BANK CARD */}

          <div className="login-bank-card">

            <div className="card-top">
              <span>
                NISSH BANK
              </span>

              <span>
                ▰
              </span>
            </div>

            <div className="card-number">
              •••• &nbsp; •••• &nbsp; •••• &nbsp; 3631
            </div>

            <div className="card-bottom">

              <div>
                <small>
                  CARD HOLDER
                </small>

                <strong>
                  NISSH CUSTOMER
                </strong>
              </div>

              <div>
                <small>
                  VALID
                </small>

                <strong>
                  09/29
                </strong>
              </div>

            </div>

          </div>

          {/* FEATURES */}

          <div className="bank-features">

            <div className="feature">
              <span>✓</span>

              <div>
                <strong>
                  Secure Banking
                </strong>

                <small>
                  Your money is protected
                </small>
              </div>
            </div>

            <div className="feature">
              <span>⚡</span>

              <div>
                <strong>
                  Fast Transactions
                </strong>

                <small>
                  Transfer money instantly
                </small>
              </div>
            </div>

            <div className="feature">
              <span>◉</span>

              <div>
                <strong>
                  24/7 Access
                </strong>

                <small>
                  Banking whenever you need
                </small>
              </div>
            </div>

          </div>

          <div className="right-footer">
            Trusted banking for your everyday life.
          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;