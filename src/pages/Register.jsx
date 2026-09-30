import { useState } from "react";
import axios from "axios";
import "./Register.css";

function Register({ onRegister, onLogin }) {

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =========================================
  // REGISTER
  // =========================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");
    setSuccess("");

    // =====================================
    // VALIDATION
    // =====================================

    if (
      !name.trim() ||
      !username.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      setError(
        "Please fill in all fields."
      );
      return;
    }

    if (password.length < 6) {
      setError(
        "Password must contain at least 6 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError(
        "Passwords do not match."
      );
      return;
    }

    try {

      setLoading(true);

      // =====================================
      // API CALL
      // =====================================

      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        {
          name: name.trim(),
          username: username.trim(),
          password: password
        }
      );

      console.log(
        "Registration response:",
        response.data
      );

      // =====================================
      // SUCCESS
      // =====================================

      setSuccess(
        `Registration successful! Your account number is ${response.data.accountNumber}.`
      );

      // Clear fields

      setName("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");

      // =====================================
      // GO TO LOGIN AFTER 2 SECONDS
      // =====================================

      setTimeout(() => {

        onLogin();

      }, 2000);

    } catch (err) {

      console.error(
        "Registration error:",
        err
      );

      if (err.response?.data?.message) {

        setError(
          err.response.data.message
        );

      } else if (err.response?.data) {

        setError(
          typeof err.response.data === "string"
            ? err.response.data
            : "Registration failed."
        );

      } else {

        setError(
          "Unable to connect to the server."
        );

      }

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="register-page">

      {/* =====================================
          LEFT
      ===================================== */}

      <div className="register-left">

        {/* BRAND */}

        <div className="register-brand">

          <div className="register-brand-icon">
            🏦
          </div>

          <div>
            <h1>Nissh</h1>
            <span>Bank</span>
          </div>

        </div>

        <div className="register-container">

          {/* HEADING */}

          <div className="register-heading">

            <span className="register-label">
              GET STARTED
            </span>

            <h2>
              Create your account
            </h2>

            <p>
              Register with Nissh Bank and
              start banking securely.
            </p>

          </div>

          {/* ERROR */}

          {error && (
            <div className="register-error">
              ⚠️
              <span>{error}</span>
            </div>
          )}

          {/* SUCCESS */}

          {success && (
            <div className="register-success">
              ✓
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* NAME */}

            <div className="register-form-group">

              <label>
                Full Name
              </label>

              <div className="register-input-wrapper">

                <span>
                  👤
                </span>

                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                />

              </div>

            </div>

            {/* USERNAME */}

            <div className="register-form-group">

              <label>
                Username
              </label>

              <div className="register-input-wrapper">

                <span>
                  @
                </span>

                <input
                  type="text"
                  placeholder="Choose a username"
                  value={username}
                  onChange={(e) =>
                    setUsername(e.target.value)
                  }
                />

              </div>

            </div>

            {/* PASSWORD */}

            <div className="register-form-group">

              <label>
                Password
              </label>

              <div className="register-input-wrapper">

                <span>
                  🔐
                </span>

                <input
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                />

              </div>

            </div>

            {/* CONFIRM PASSWORD */}

            <div className="register-form-group">

              <label>
                Confirm Password
              </label>

              <div className="register-input-wrapper">

                <span>
                  🔒
                </span>

                <input
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                />

              </div>

            </div>

            {/* BUTTON */}

            <button
              type="submit"
              className="register-button"
              disabled={loading}
            >

              {loading
                ? "Creating Account..."
                : "Create Account →"}

            </button>

          </form>

          {/* LOGIN */}

          <div className="login-link">

            <span>
              Already have an account?
            </span>

            <button
              type="button"
              onClick={onRegister}
            >
              Sign In
            </button>

          </div>

          {/* SECURITY */}

          <div className="register-security">

            <div>
              ✓
            </div>

            <section>

              <strong>
                Secure registration
              </strong>

              <p>
                Your information is protected
                with secure authentication.
              </p>

            </section>

          </div>

          <div className="register-footer">
            Nissh Bank
            <span>•</span>
            Secure Banking
            <span>•</span>
            © 2026
          </div>

        </div>

      </div>

      {/* =====================================
          RIGHT
      ===================================== */}

      <div className="register-right">

        <div className="register-right-content">

          <span>
            NISSH BANK
          </span>

          <h2>
            Your banking journey
            <br />
            starts here.
          </h2>

          <p>
            Open your account today and
            enjoy simple, secure banking.
          </p>

          {/* BENEFITS */}

          <div className="register-benefits">

            <div className="register-benefit">

              <div>
                ✓
              </div>

              <section>
                <strong>
                  Secure Account
                </strong>

                <small>
                  Your account is protected.
                </small>
              </section>

            </div>

            <div className="register-benefit">

              <div>
                ⚡
              </div>

              <section>
                <strong>
                  Easy Transfers
                </strong>

                <small>
                  Send money quickly and securely.
                </small>
              </section>

            </div>

            <div className="register-benefit">

              <div>
                ₹
              </div>

              <section>
                <strong>
                  Smart Banking
                </strong>

                <small>
                  Manage your money easily.
                </small>
              </section>

            </div>

          </div>

          <div className="register-card">

            <div className="register-card-top">
              <span>NISSH</span>
              <span>BANK</span>
            </div>

            <div className="register-card-chip">
              ▰
            </div>

            <div className="register-card-number">
              •••• •••• •••• ••••
            </div>

            <div className="register-card-bottom">
              <span>
                NISSH CUSTOMER
              </span>

              <strong>
                VISA
              </strong>
            </div>

          </div>

          <div className="register-right-footer">
            Trusted banking for your everyday life.
          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;