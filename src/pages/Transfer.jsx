import React, { useState } from "react";
import "./Transfer.css";

const Transfer = () => {
  const [recipientAccountNumber, setRecipientAccountNumber] = useState("");
  const [amount, setAmount] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ============================
  // BACK TO DASHBOARD
  // ============================
  const goToDashboard = () => {
    window.location.href = "/dashboard";
  };

  // ============================
  // TRANSFER MONEY
  // ============================
  const handleTransfer = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!recipientAccountNumber.trim()) {
      setError("Please enter recipient account number.");
      return;
    }

    if (!amount || Number(amount) <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    setLoading(true);

    try {
      const token =
        localStorage.getItem("token") ||
        localStorage.getItem("jwt") ||
        localStorage.getItem("accessToken");

      const response = await fetch(
        "http://localhost:8080/api/account/transfer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",

            ...(token && {
              Authorization: `Bearer ${token}`,
            }),
          },

          body: JSON.stringify({
            recipientAccountNumber: recipientAccountNumber.trim(),
            amount: Number(amount),
          }),
        }
      );

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          data?.message ||
            data?.error ||
            "Transfer failed. Please try again."
        );
      }

      setMessage("Money transferred successfully.");

      setRecipientAccountNumber("");
      setAmount("");

    } catch (err) {
      console.error("Transfer error:", err);

      setError(
        err.message ||
          "Unable to transfer money. Please check your connection."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="transfer-page">

      {/* =================================
          HEADER
      ================================= */}
      <header className="transfer-topbar">

        {/* BRAND */}
        <div className="transfer-brand">

          <div className="transfer-brand-icon">
            🏦
          </div>

          <div className="transfer-brand-text">
            <h2>Nissh</h2>
            <span>Bank</span>
          </div>

        </div>

        {/* BACK BUTTON */}
        <button
          type="button"
          className="transfer-back-button"
          onClick={goToDashboard}
        >
          ← Back to Dashboard
        </button>

      </header>


      {/* =================================
          MAIN CONTENT
      ================================= */}
      <main className="transfer-content">

        {/* PAGE INTRO */}
        <div className="transfer-page-header">

          <div>
            <span className="transfer-eyebrow">
              NISSH BANK
            </span>

            <h1>Transfer Money</h1>

            <p>
              Send money securely to another account.
            </p>
          </div>

        </div>


        {/* =================================
            TRANSFER CARD
        ================================= */}
        <div className="transfer-card">

          {/* CARD HEADER */}
          <div className="transfer-card-header">

            <div className="transfer-card-icon">
              ⇄
            </div>

            <div>
              <h2>Send Money</h2>

              <p>
                Enter the recipient details below
              </p>
            </div>

          </div>


          {/* FORM */}
          <form
            className="transfer-form"
            onSubmit={handleTransfer}
          >

            {/* RECIPIENT */}
            <div className="form-group">

              <label htmlFor="recipientAccount">
                Recipient Account Number
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  ⇄
                </span>

                <input
                  id="recipientAccount"
                  type="text"
                  placeholder="Enter recipient account number"
                  value={recipientAccountNumber}
                  onChange={(e) =>
                    setRecipientAccountNumber(e.target.value)
                  }
                  disabled={loading}
                />

              </div>

            </div>


            {/* AMOUNT */}
            <div className="form-group">

              <label htmlFor="amount">
                Amount
              </label>

              <div className="input-wrapper">

                <span className="currency-symbol">
                  ₹
                </span>

                <input
                  id="amount"
                  type="number"
                  min="1"
                  step="0.01"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) =>
                    setAmount(e.target.value)
                  }
                  disabled={loading}
                />

              </div>

            </div>


            {/* TRANSFER DETAILS */}
            <div className="transfer-details">

              <div className="detail-box">

                <span>Transfer Type</span>

                <strong>
                  Bank Transfer
                </strong>

              </div>

              <div className="detail-box">

                <span>Processing</span>

                <strong>
                  Instant
                </strong>

              </div>

              <div className="detail-box">

                <span>Security</span>

                <strong>
                  JWT Protected
                </strong>

              </div>

            </div>


            {/* SUCCESS */}
            {message && (
              <div className="success-message">
                <span>✓</span>
                {message}
              </div>
            )}


            {/* ERROR */}
            {error && (
              <div className="error-message">
                <span>!</span>
                {error}
              </div>
            )}


            {/* BUTTON */}
            <button
              type="submit"
              className="send-money-button"
              disabled={loading}
            >

              {loading ? (
                <>
                  <span className="spinner"></span>
                  Processing...
                </>
              ) : (
                <>
                  Send Money
                  <span>→</span>
                </>
              )}

            </button>

          </form>


          {/* SECURITY */}
          <div className="security-message">

            <span className="security-icon">
              🔒
            </span>

            <div>
              <strong>Secure Transaction</strong>

              <span>
                Your transaction is protected with JWT authentication.
              </span>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
};

export default Transfer;