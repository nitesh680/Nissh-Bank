import { useState } from "react";
import "./Settings.css";

function Settings({ onBack, onLogout }) {

  const username =
    localStorage.getItem("username") || "Customer";

  const accountNumber =
    localStorage.getItem("accountNumber") || "000000";

  const [notifications, setNotifications] =
    useState(true);

  const [emailNotifications, setEmailNotifications] =
    useState(true);

  const [smsNotifications, setSmsNotifications] =
    useState(true);

  const [message, setMessage] =
    useState("");

  const showMessage = (text) => {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  const handleChangePassword = () => {
    showMessage(
      "Password change option selected."
    );
  };

  return (
    <div className="settings-page">

      {/* HEADER */}

      <header className="settings-header">

        <div className="settings-brand">

          <div className="settings-brand-icon">
            🏦
          </div>

          <div>
            <h2>Nissh</h2>
            <span>Bank</span>
          </div>

        </div>

        <button
          className="settings-back-button"
          onClick={onBack}
        >
          ← Back to Dashboard
        </button>

      </header>

      {/* CONTENT */}

      <main className="settings-content">

        <span className="settings-label">
          NISSH BANK
        </span>

        <h1>Settings</h1>

        <p className="settings-subtitle">
          Manage your profile, security and preferences.
        </p>

        {message && (
          <div className="settings-message">
            ✓ {message}
          </div>
        )}

        {/* PROFILE */}

        <section className="settings-section">

          <div className="settings-section-title">

            <div className="settings-section-icon">
              👤
            </div>

            <div>
              <h2>Personal Information</h2>

              <p>
                Your account information
              </p>
            </div>

          </div>

          <div className="profile-box">

            <div className="large-avatar">
              {username
                .charAt(0)
                .toUpperCase()}
            </div>

            <div className="profile-details">

              <div>
                <span>Full Name</span>
                <strong>
                  {username}
                </strong>
              </div>

              <div>
                <span>Username</span>
                <strong>
                  {username}
                </strong>
              </div>

              <div>
                <span>Account Number</span>
                <strong>
                  •••• {accountNumber.slice(-4)}
                </strong>
              </div>

              <div>
                <span>Account Type</span>
                <strong>
                  Savings Account
                </strong>
              </div>

            </div>

          </div>

        </section>

        {/* SECURITY */}

        <section className="settings-section">

          <div className="settings-section-title">

            <div className="settings-section-icon security">
              🛡️
            </div>

            <div>
              <h2>Security</h2>

              <p>
                Keep your account protected
              </p>
            </div>

          </div>

          <div className="settings-list">

            <div className="settings-row">

              <div>
                <strong>
                  Change Password
                </strong>

                <span>
                  Update your account password
                </span>
              </div>

              <button
                onClick={handleChangePassword}
              >
                Change →
              </button>

            </div>

            <div className="settings-row">

              <div>
                <strong>
                  Login Security
                </strong>

                <span>
                  Secure authentication is enabled
                </span>
              </div>

              <span className="enabled-badge">
                ✓ Enabled
              </span>

            </div>

            <div className="settings-row">

              <div>
                <strong>
                  Two-Factor Authentication
                </strong>

                <span>
                  Add an extra layer of security
                </span>
              </div>

              <button
                onClick={() =>
                  showMessage(
                    "Two-factor authentication selected."
                  )
                }
              >
                Setup →
              </button>

            </div>

          </div>

        </section>

        {/* NOTIFICATIONS */}

        <section className="settings-section">

          <div className="settings-section-title">

            <div className="settings-section-icon notification">
              🔔
            </div>

            <div>
              <h2>Notifications</h2>

              <p>
                Control how you receive updates
              </p>
            </div>

          </div>

          <div className="settings-list">

            {/* MAIN */}

            <div className="settings-row">

              <div>
                <strong>
                  Push Notifications
                </strong>

                <span>
                  Receive important account alerts
                </span>
              </div>

              <button
                className={
                  notifications
                    ? "toggle active"
                    : "toggle"
                }
                onClick={() =>
                  setNotifications(!notifications)
                }
              >
                <span></span>
              </button>

            </div>

            {/* EMAIL */}

            <div className="settings-row">

              <div>
                <strong>
                  Email Notifications
                </strong>

                <span>
                  Receive updates through email
                </span>
              </div>

              <button
                className={
                  emailNotifications
                    ? "toggle active"
                    : "toggle"
                }
                onClick={() =>
                  setEmailNotifications(
                    !emailNotifications
                  )
                }
              >
                <span></span>
              </button>

            </div>

            {/* SMS */}

            <div className="settings-row">

              <div>
                <strong>
                  SMS Notifications
                </strong>

                <span>
                  Receive transaction alerts by SMS
                </span>
              </div>

              <button
                className={
                  smsNotifications
                    ? "toggle active"
                    : "toggle"
                }
                onClick={() =>
                  setSmsNotifications(
                    !smsNotifications
                  )
                }
              >
                <span></span>
              </button>

            </div>

          </div>

        </section>

        {/* ACCOUNT */}

        <section className="settings-section">

          <div className="settings-section-title">

            <div className="settings-section-icon">
              ⚙️
            </div>

            <div>
              <h2>Account</h2>

              <p>
                Manage your banking account
              </p>
            </div>

          </div>

          <div className="settings-list">

            <div className="settings-row">

              <div>
                <strong>
                  Download Statement
                </strong>

                <span>
                  Download your account statement
                </span>
              </div>

              <button
                onClick={() =>
                  showMessage(
                    "Statement download selected."
                  )
                }
              >
                Download →
              </button>

            </div>

            <div className="settings-row danger-row">

              <div>
                <strong>
                  Logout
                </strong>

                <span>
                  Sign out from your banking account
                </span>
              </div>

              <button
                className="logout-setting-button"
                onClick={onLogout}
              >
                Logout
              </button>

            </div>

          </div>

        </section>

        {/* FOOTER SECURITY */}

        <div className="settings-footer-security">

          <span>✓</span>

          <div>
            <strong>
              Your security matters
            </strong>

            <p>
              Your information is protected
              using secure banking technology.
            </p>
          </div>

        </div>

      </main>

    </div>
  );
}

export default Settings;