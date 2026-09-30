import { useState } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import Accounts from "./pages/Accounts";
import Cards from "./pages/Cards";
import Loans from "./pages/Loans";
import Settings from "./pages/Settings";

import Deposit from "./pages/Deposit";
import Withdraw from "./pages/Withdraw";
import Transfer from "./pages/Transfer";
import Transactions from "./pages/Transactions";

import "./App.css";

function App() {
  // =========================================
  // LOGIN STATE
  // =========================================

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  // =========================================
  // LOGIN / REGISTER PAGE
  // =========================================

  const [authPage, setAuthPage] = useState("login");

  // =========================================
  // CURRENT PAGE
  // =========================================

  const [currentPage, setCurrentPage] = useState("dashboard");

  // =========================================
  // LOGIN
  // =========================================

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage("dashboard");
  };

  // =========================================
  // LOGOUT
  // =========================================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("accountNumber");

    setIsLoggedIn(false);
    setCurrentPage("dashboard");
    setAuthPage("login");
  };

  // =========================================
  // REGISTER SUCCESS
  // =========================================

  const handleRegisterSuccess = () => {
    setAuthPage("login");
  };

  // =========================================
  // NAVIGATION
  // =========================================

  const handleDashboard = () => {
    setCurrentPage("dashboard");
  };

  const handleAccounts = () => {
    setCurrentPage("accounts");
  };

  const handleCards = () => {
    setCurrentPage("cards");
  };

  const handleLoans = () => {
    setCurrentPage("loans");
  };

  const handleSettings = () => {
    setCurrentPage("settings");
  };

  const handleDeposit = () => {
    setCurrentPage("deposit");
  };

  const handleWithdraw = () => {
    setCurrentPage("withdraw");
  };

  const handleTransfer = () => {
    setCurrentPage("transfer");
  };

  const handleTransactions = () => {
    setCurrentPage("transactions");
  };

  // =========================================
  // NOT LOGGED IN
  // =========================================

  if (!isLoggedIn) {
    return (
      <div className="app">

        {authPage === "login" ? (
          <Login
            onLogin={handleLogin}
            onRegister={() => setAuthPage("register")}
          />
        ) : (
          <Register
            onRegisterSuccess={handleRegisterSuccess}
            onBackToLogin={() => setAuthPage("login")}
          />
        )}

      </div>
    );
  }

  // =========================================
  // LOGGED-IN APPLICATION
  // =========================================

  return (
    <div className="app">

      {/* =====================================
          DASHBOARD
      ===================================== */}

      {currentPage === "dashboard" && (
        <Dashboard
          onLogout={handleLogout}

          onDashboard={handleDashboard}
          onAccounts={handleAccounts}
          onCards={handleCards}
          onLoans={handleLoans}
          onSettings={handleSettings}

          onDeposit={handleDeposit}
          onWithdraw={handleWithdraw}
          onTransfer={handleTransfer}
          onTransactions={handleTransactions}
        />
      )}

      {/* =====================================
          ACCOUNTS
      ===================================== */}

      {currentPage === "accounts" && (
        <Accounts
          onBack={handleDashboard}
        />
      )}

      {/* =====================================
          CARDS
      ===================================== */}

      {currentPage === "cards" && (
        <Cards
          onBack={handleDashboard}
        />
      )}

      {/* =====================================
          LOANS
      ===================================== */}

      {currentPage === "loans" && (
        <Loans
          onBack={handleDashboard}
        />
      )}

      {/* =====================================
          SETTINGS
      ===================================== */}

      {currentPage === "settings" && (
        <Settings
          onBack={handleDashboard}
          onLogout={handleLogout}
        />
      )}

      {/* =====================================
          DEPOSIT
      ===================================== */}

      {currentPage === "deposit" && (
        <Deposit
          onBack={handleDashboard}
          onSuccess={handleDashboard}
        />
      )}

      {/* =====================================
          WITHDRAW
      ===================================== */}

      {currentPage === "withdraw" && (
        <Withdraw
          onBack={handleDashboard}
          onSuccess={handleDashboard}
        />
      )}

      {/* =====================================
          TRANSFER
      ===================================== */}

      {currentPage === "transfer" && (
        <Transfer
          onBack={handleDashboard}
          onSuccess={handleDashboard}
        />
      )}

      {/* =====================================
          TRANSACTIONS
      ===================================== */}

      {currentPage === "transactions" && (
        <Transactions
          onBack={handleDashboard}
        />
      )}

    </div>
  );
}

export default App;