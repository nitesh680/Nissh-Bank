import { useEffect, useState } from "react";
import axios from "axios";
import "./Accounts.css";

function Account({ onBack }) {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  // =========================================
  // LOCAL STORAGE
  // =========================================

  const username =
    localStorage.getItem("username") || "Customer";

  const accountNumber =
    localStorage.getItem("accountNumber") || "000000";

  const token =
    localStorage.getItem("token");

  // =========================================
  // API
  // =========================================

  const api = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  // =========================================
  // LOAD ACCOUNT
  // =========================================

  useEffect(() => {
    loadAccount();
  }, []);

  const loadAccount = async () => {
    try {
      setLoading(true);

      /*
       * We already know your backend has:
       *
       * GET /api/account/balance
       *
       * So we use that instead of assuming
       * another account API exists.
       */

      const response = await api.get(
        "/api/account/balance"
      );

      if (
        response.data &&
        typeof response.data === "object"
      ) {
        setBalance(
          Number(response.data.balance) || 0
        );

        setAccount(response.data);
      } else {
        setBalance(
          Number(response.data) || 0
        );
      }

    } catch (error) {
      console.error(
        "Account loading error:",
        error
      );

      /*
       * Don't break the page if balance
       * API has a problem.
       */
      setBalance(0);

    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // FORMAT MONEY
  // =========================================

  const formatAmount = (amount) => {
    return new Intl.NumberFormat(
      "en-IN",
      {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 2,
      }
    ).format(Number(amount) || 0);
  };

  // =========================================
  // ACCOUNT DATA
  // =========================================

  const name =
    account?.name ||
    username;

  const user =
    account?.username ||
    username;

  const accNumber =
    account?.accountNumber ||
    accountNumber;

  // =========================================
  // UI
  // =========================================

  return (
    <div className="account-page">

      {/* =====================================
          HEADER
      ===================================== */}

      <header className="account-header">

        <div className="account-brand">

          <div className="account-brand-icon">
            🏦
          </div>

          <div>
            <h2>Nissh</h2>
            <span>Bank</span>
          </div>

        </div>

        <button
          className="back-button"
          onClick={onBack}
        >
          ← Back to Dashboard
        </button>

      </header>

      {/* =====================================
          MAIN
      ===================================== */}

      <main className="account-container">

        {/* ===================================
            PAGE TITLE
        =================================== */}

        <section className="account-title">

          <span>
            NISSH BANK
          </span>

          <h1>
            Account Details
          </h1>

          <p>
            View your account information and
            banking details.
          </p>

        </section>

        {/* ===================================
            ACCOUNT SUMMARY
        =================================== */}

        <section className="account-summary">

          {/* BALANCE */}

          <div className="account-summary-card">

            <div className="summary-icon green">
              ₹
            </div>

            <div>
              <span>
                Available Balance
              </span>

              <h2>
                {loading
                  ? "Loading..."
                  : formatAmount(balance)}
              </h2>
            </div>

          </div>

          {/* ACCOUNT NUMBER */}

          <div className="account-summary-card">

            <div className="summary-icon blue">
              ▣
            </div>

            <div>
              <span>
                Account Number
              </span>

              <h2>
                {accNumber}
              </h2>
            </div>

          </div>

        </section>

        {/* ===================================
            PERSONAL DETAILS
        =================================== */}

        <section className="details-card">

          <div className="details-card-header">

            <div>

              <span>
                PERSONAL INFORMATION
              </span>

              <h2>
                Customer Details
              </h2>

            </div>

            <div className="verified">
              ✓ Verified
            </div>

          </div>

          <div className="details-grid">

            {/* NAME */}

            <div className="detail">

              <label>
                Full Name
              </label>

              <strong>
                {name}
              </strong>

            </div>

            {/* USERNAME */}

            <div className="detail">

              <label>
                Username
              </label>

              <strong>
                {user}
              </strong>

            </div>

            {/* ACCOUNT NUMBER */}

            <div className="detail">

              <label>
                Account Number
              </label>

              <strong>
                {accNumber}
              </strong>

            </div>

            {/* ACCOUNT TYPE */}

            <div className="detail">

              <label>
                Account Type
              </label>

              <strong>
                Savings Account
              </strong>

            </div>

            {/* STATUS */}

            <div className="detail">

              <label>
                Account Status
              </label>

              <strong className="active">
                ● Active
              </strong>

            </div>

            {/* CURRENCY */}

            <div className="detail">

              <label>
                Currency
              </label>

              <strong>
                Indian Rupee (INR)
              </strong>

            </div>

          </div>

        </section>

        {/* ===================================
            BANK CARD
        =================================== */}

        <section className="account-bottom">

          <div className="virtual-card">

            <div className="card-top">

              <strong>
                NISSH BANK
              </strong>

              <strong>
                VISA
              </strong>

            </div>

            <div className="chip">
              ▰
            </div>

            <div className="card-number">

              •••• &nbsp;
              •••• &nbsp;
              •••• &nbsp;

              {accNumber.slice(-4)}

            </div>

            <div className="card-bottom">

              <div>

                <small>
                  CARD HOLDER
                </small>

                <strong>
                  {name.toUpperCase()}
                </strong>

              </div>

              <div>

                <small>
                  STATUS
                </small>

                <strong>
                  ACTIVE
                </strong>

              </div>

            </div>

          </div>

          {/* SECURITY */}

          <div className="security-card">

            <div className="security-icon">
              🛡️
            </div>

            <div>

              <h3>
                Your account is protected
              </h3>

              <p>
                Your banking information is
                protected using secure
                authentication and encrypted
                communication.
              </p>

              <div className="security-list">

                <div>
                  ✓ Secure Login
                </div>

                <div>
                  ✓ Encrypted Data
                </div>

                <div>
                  ✓ Protected Account
                </div>

              </div>

            </div>

          </div>

        </section>

        {/* ===================================
            IMPORTANT INFORMATION
        =================================== */}

        <section className="important-card">

          <div className="important-icon">
            ℹ
          </div>

          <div>

            <h3>
              Important Information
            </h3>

            <p>
              Never share your password, OTP,
              PIN or other banking credentials
              with anyone.
            </p>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Account;