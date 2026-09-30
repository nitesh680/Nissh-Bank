import { useEffect, useState } from "react";
import axios from "axios";
import Notifications from "./Notifications";

import "./Dashboard.css";

function Dashboard({
  onLogout,
  onDashboard,
  onAccounts,
  onCards,
  onLoans,
  onSettings,
  onDeposit,
  onWithdraw,
  onTransfer,
  onTransactions,
}) {
  // =========================================
  // STATE
  // =========================================

  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
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
  // AXIOS
  // =========================================

  const api = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });


  const userEmail =
  localStorage.getItem("email") ||
  localStorage.getItem("userEmail") ||
  "";

  // =========================================
  // LOAD DATA
  // =========================================

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // =====================================
      // BALANCE
      // =====================================

      const balanceResponse = await api.get(
        "/api/account/balance"
      );

      if (
        typeof balanceResponse.data === "object" &&
        balanceResponse.data !== null
      ) {
        setBalance(
          Number(balanceResponse.data.balance) || 0
        );
      } else {
        setBalance(
          Number(balanceResponse.data) || 0
        );
      }

      // =====================================
      // TRANSACTIONS
      // =====================================

      const transactionResponse =
        await api.get(
          "/api/account/transactions"
        );

      setTransactions(
        Array.isArray(transactionResponse.data)
          ? transactionResponse.data
          : []
      );

    } catch (error) {
      console.error(
        "Dashboard loading error:",
        error
      );

      if (
        error.response?.status === 401 ||
        error.response?.status === 403
      ) {
        onLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // FORMAT AMOUNT
  // =========================================

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(Number(amount) || 0);
  };

  // =========================================
  // FORMAT DATE
  // =========================================

  const formatDate = (timestamp) => {
    if (!timestamp) {
      return "";
    }

    try {
      return new Date(timestamp).toLocaleString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }
      );
    } catch {
      return "";
    }
  };

  // =========================================
  // TRANSACTION TYPE
  // =========================================

  const getTransactionType = (type) => {
    return (
      type?.toUpperCase() ||
      "TRANSACTION"
    );
  };

  // =========================================
  // INCOMING TRANSACTION
  // =========================================

  const isIncoming = (type) => {
    const transactionType =
      type?.toUpperCase();

    return (
      transactionType === "DEPOSIT" ||
      transactionType === "TRANSFER_RECEIVED"
    );
  };

  // =========================================
  // TOTAL MONEY IN
  // =========================================

  const totalMoneyIn = transactions
    .filter((transaction) =>
      isIncoming(transaction.type)
    )
    .reduce(
      (sum, transaction) =>
        sum + Number(transaction.amount || 0),
      0
    );

  // =========================================
  // TOTAL MONEY OUT
  // =========================================

  const totalMoneyOut = transactions
    .filter(
      (transaction) =>
        !isIncoming(transaction.type)
    )
    .reduce(
      (sum, transaction) =>
        sum + Number(transaction.amount || 0),
      0
    );

  // =========================================
  // RECENT TRANSACTIONS
  // =========================================

  const recentTransactions = transactions
    .slice()
    .reverse()
    .slice(0, 5);

  // =========================================
  // LOGOUT
  // =========================================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("accountNumber");

    onLogout();
  };

  // =========================================
  // TODAY
  // =========================================

  const today =
    new Date().toLocaleDateString(
      "en-IN",
      {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );

  // =========================================
  // UI
  // =========================================

  return (
    <div className="dashboard-layout">

      {/* =====================================
          SIDEBAR
      ===================================== */}

      <aside className="sidebar">

        {/* BRAND */}

        <div className="brand">

          <div className="brand-icon">
            🏦
          </div>

          <div className="brand-text">
            <h1>Nissh</h1>
            <span>Bank</span>
          </div>

        </div>

        {/* NAVIGATION */}

        <nav className="sidebar-nav">

          {/* DASHBOARD */}

          <button
            className="nav-item active"
            onClick={onDashboard}
          >
            <span className="nav-icon">
              ⌂
            </span>

            <span>
              Dashboard
            </span>
          </button>

          {/* ACCOUNTS */}

          <button
            className="nav-item"
            onClick={onAccounts}
          >
            <span className="nav-icon">
              ▣
            </span>

            <span>
              Accounts
            </span>
          </button>

          {/* TRANSACTIONS */}

          <button
            className="nav-item"
            onClick={onTransactions}
          >
            <span className="nav-icon">
              ⇄
            </span>

            <span>
              Transactions
            </span>
          </button>

          {/* CARDS */}

          <button
            className="nav-item"
            onClick={onCards}
          >
            <span className="nav-icon">
              ▭
            </span>

            <span>
              Cards
            </span>
          </button>

          {/* LOANS */}

          <button
            className="nav-item"
            onClick={onLoans}
          >
            <span className="nav-icon">
              ◫
            </span>

            <span>
              Loans
            </span>
          </button>

          {/* SETTINGS */}

          <button
            className="nav-item"
            onClick={onSettings}
          >
            <span className="nav-icon">
              ⚙
            </span>

            <span>
              Settings
            </span>
          </button>

        </nav>

        {/* SIDEBAR BOTTOM */}

        <div className="sidebar-bottom">

          <div className="sidebar-promo">

            <div className="promo-icon">
              ✦
            </div>

            <h3>
              Banking
              <br />
              made simple
            </h3>

            <p>
              Secure. Fast. Reliable.
            </p>

          </div>

          {/* LOGOUT */}

          <button
            className="logout-button"
            onClick={handleLogout}
          >
            <span>
              ⇥
            </span>

            Logout
          </button>

        </div>

      </aside>

      {/* =====================================
          MAIN CONTENT
      ===================================== */}

      <main className="dashboard-main">

        {/* ===================================
            TOP BAR
        =================================== */}

        <header className="topbar">

          <div className="search-box">

            <span>
              ⌕
            </span>

            <input
              type="text"
              placeholder="Search anything..."
            />

          </div>

          <div className="topbar-right">

            <Notifications
                userEmail={userEmail}
                token={token}
                                />

            <div className="profile">

              <div className="profile-avatar">
                {username
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <div className="profile-info">

                <strong>
                  {username}
                </strong>

                <small>
                  Customer
                </small>

              </div>

              <span className="profile-arrow">
                ⌄
              </span>

            </div>

          </div>

        </header>

        {/* ===================================
            CONTENT
        =================================== */}

        <div className="dashboard-content">

          {/* =================================
              WELCOME
          ================================= */}

          <section className="welcome-section">

            <div>

              <span className="welcome-label">
                NISSH BANK
              </span>

              <h2>
                Good morning,{" "}
                {username} 👋
              </h2>

              <p>
                Here's what's happening
                with your account today.
              </p>

            </div>

            <div className="today-date">

              <span>
                Today
              </span>

              <strong>
                {today}
              </strong>

            </div>

          </section>

          {/* =================================
              STATISTICS
          ================================= */}

          <section className="stats-grid">

            {/* BALANCE */}

            <div className="stat-card balance-card">

              <div className="stat-card-top">

                <div className="stat-icon blue">
                  ₹
                </div>

                <span className="stat-badge">
                  Active
                </span>

              </div>

              <p>
                Available Balance
              </p>

              <h3>
                {loading
                  ? "Loading..."
                  : formatAmount(balance)}
              </h3>

              <span className="stat-description">
                Current account balance
              </span>

            </div>

            {/* MONEY IN */}

            <div className="stat-card">

              <div className="stat-card-top">

                <div className="stat-icon green">
                  ↓
                </div>

              </div>

              <p>
                Money In
              </p>

              <h3>
                {formatAmount(
                  totalMoneyIn
                )}
              </h3>

              <span className="stat-description positive">
                ↑ Total received
              </span>

            </div>

            {/* MONEY OUT */}

            <div className="stat-card">

              <div className="stat-card-top">

                <div className="stat-icon red">
                  ↑
                </div>

              </div>

              <p>
                Money Out
              </p>

              <h3>
                {formatAmount(
                  totalMoneyOut
                )}
              </h3>

              <span className="stat-description negative">
                ↑ Total spent
              </span>

            </div>

            {/* ACCOUNT */}

            <div className="stat-card">

              <div className="stat-card-top">

                <div className="stat-icon blue">
                  ▣
                </div>

              </div>

              <p>
                Account Number
              </p>

              <h3>
                ••••{" "}
                {accountNumber.slice(-4)}
              </h3>

              <span className="stat-description">
                Primary Account
              </span>

            </div>

          </section>

          {/* =================================
              HERO
          ================================= */}

          <section className="hero-card">

            <div className="hero-content">

              <span className="hero-label">
                NISSH BANK
              </span>

              <h1>
                Your money.
                <br />
                Your future.
              </h1>

              <p>
                Simple, secure and smarter
                banking for your everyday
                life.
              </p>

              <div className="hero-buttons">

                <button
                  className="hero-primary-btn"
                  onClick={onTransfer}
                >
                  Send Money
                  <span>
                    →
                  </span>
                </button>

                <button
                  className="hero-secondary-btn"
                  onClick={onTransactions}
                >
                  View Transactions
                </button>

              </div>

            </div>

            {/* CARD */}

            <div className="hero-visual">

              <div className="hero-circle circle-one"></div>

              <div className="hero-circle circle-two"></div>

              <div className="hero-bank-card">

                <div className="mini-card-top">

                  <span>
                    NISSH
                  </span>

                  <span>
                    BANK
                  </span>

                </div>

                <div className="mini-chip">
                  ▰
                </div>

                <div className="mini-card-number">
                  •••• •••• ••••{" "}
                  {accountNumber.slice(-4)}
                </div>

                <div className="mini-card-bottom">

                  <span>
                    {username.toUpperCase()}
                  </span>

                  <span>
                    VISA
                  </span>

                </div>

              </div>

            </div>

          </section>

          {/* =================================
              QUICK ACTIONS
          ================================= */}

          <section className="section">

            <div className="section-header">

              <div>

                <span className="section-label">
                  SERVICES
                </span>

                <h2>
                  Quick Actions
                </h2>

                <p>
                  Everything you need,
                  right at your fingertips.
                </p>

              </div>

            </div>

            <div className="quick-actions">

              {/* DEPOSIT */}

              <button
                className="action-card deposit-card"
                onClick={onDeposit}
              >

                <div className="action-icon">
                  ↓
                </div>

                <div className="action-content">

                  <h3>
                    Deposit
                  </h3>

                  <p>
                    Add money to your account
                  </p>

                </div>

                <span className="action-arrow">
                  →
                </span>

              </button>

              {/* WITHDRAW */}

              <button
                className="action-card withdraw-card"
                onClick={onWithdraw}
              >

                <div className="action-icon">
                  ↑
                </div>

                <div className="action-content">

                  <h3>
                    Withdraw
                  </h3>

                  <p>
                    Withdraw money securely
                  </p>

                </div>

                <span className="action-arrow">
                  →
                </span>

              </button>

              {/* TRANSFER */}

              <button
                className="action-card transfer-card"
                onClick={onTransfer}
              >

                <div className="action-icon">
                  ⇄
                </div>

                <div className="action-content">

                  <h3>
                    Transfer
                  </h3>

                  <p>
                    Send money securely
                  </p>

                </div>

                <span className="action-arrow">
                  →
                </span>

              </button>

              {/* STATEMENTS */}

              <button
                className="action-card statement-card"
                onClick={onTransactions}
              >

                <div className="action-icon">
                  ▤
                </div>

                <div className="action-content">

                  <h3>
                    Statements
                  </h3>

                  <p>
                    View your activity
                  </p>

                </div>

                <span className="action-arrow">
                  →
                </span>

              </button>

            </div>

          </section>

          {/* =================================
              BOTTOM GRID
          ================================= */}

          <div className="bottom-grid">

            {/* RECENT TRANSACTIONS */}

            <section className="transactions-card">

              <div className="section-header">

                <div>

                  <span className="section-label">
                    ACTIVITY
                  </span>

                  <h2>
                    Recent Transactions
                  </h2>

                  <p>
                    Your latest account activity
                  </p>

                </div>

                <button
                  className="view-all-btn"
                  onClick={onTransactions}
                >
                  View All
                  <span>
                    →
                  </span>
                </button>

              </div>

              {/* LOADING */}

              {loading ? (

                <div className="empty-state">

                  <div className="loading-icon">
                    ⟳
                  </div>

                  <p>
                    Loading transactions...
                  </p>

                </div>

              ) : recentTransactions.length === 0 ? (

                <div className="empty-state">

                  <div className="empty-icon">
                    📭
                  </div>

                  <h3>
                    No transactions yet
                  </h3>

                  <p>
                    Your recent account activity
                    will appear here.
                  </p>

                </div>

              ) : (

                <div className="transaction-list">

                  {recentTransactions.map(
                    (transaction, index) => {

                      const incoming =
                        isIncoming(
                          transaction.type
                        );

                      const type =
                        getTransactionType(
                          transaction.type
                        );

                      return (
                        <div
                          className="transaction-row"
                          key={
                            transaction.id ||
                            index
                          }
                        >

                          <div
                            className={
                              `transaction-icon ${
                                incoming
                                  ? "deposit"
                                  : "withdraw"
                              }`
                            }
                          >
                            {incoming
                              ? "↓"
                              : "↑"}
                          </div>

                          <div className="transaction-info">

                            <strong>
                              {type.replaceAll(
                                "_",
                                " "
                              )}
                            </strong>

                            <span>
                              {formatDate(
                                transaction.timestamp
                              )}
                            </span>

                          </div>

                          <div className="transaction-amount">

                            <strong
                              className={
                                incoming
                                  ? "amount-positive"
                                  : "amount-negative"
                              }
                            >
                              {incoming
                                ? "+"
                                : "-"}

                              {formatAmount(
                                transaction.amount
                              )}
                            </strong>

                            <span>
                              Balance:{" "}
                              {formatAmount(
                                transaction.balanceAfterTransaction
                              )}
                            </span>

                          </div>

                        </div>
                      );
                    }
                  )}

                </div>

              )}

            </section>

            {/* SECURITY */}

            <section className="security-card">

              <div className="security-top">

                <div className="security-icon">
                  🛡️
                </div>

                <span className="security-status">
                  Protected
                </span>

              </div>

              <h2>
                Your Security
                <br />
                Matters
              </h2>

              <p>
                Your account is protected
                with secure banking technology
                and encrypted transactions.
              </p>

              <div className="security-features">

                <div>
                  <span>✓</span>
                  Secure Login
                </div>

                <div>
                  <span>✓</span>
                  Encrypted Data
                </div>

                <div>
                  <span>✓</span>
                  Protected Payments
                </div>

              </div>

            </section>

          </div>

          {/* =================================
              PREMIUM
          ================================= */}

          <section className="premium-card">

            <div className="premium-left">

              <div className="premium-icon">
                ✦
              </div>

              <div>

                <span className="premium-label">
                  NISSH PREMIUM
                </span>

                <h3>
                  Upgrade your banking
                  experience
                </h3>

                <p>
                  Get higher transaction
                  limits and exclusive benefits.
                </p>

              </div>

            </div>

            <button className="premium-button">
              Explore Premium
              <span>
                →
              </span>
            </button>

          </section>

        </div>

      </main>

    </div>
  );
}

export default Dashboard;
