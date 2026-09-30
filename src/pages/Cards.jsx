import { useState } from "react";
import "./Cards.css";

function Cards({ onBack }) {
  const [isFrozen, setIsFrozen] = useState(false);
  const [showNumber, setShowNumber] = useState(false);
  const [showPin, setShowPin] = useState(false);

  const username =
    localStorage.getItem("username") || "NISSH CUSTOMER";

  const accountNumber =
    localStorage.getItem("accountNumber") || "000000";

  const lastFour = accountNumber.slice(-4);

  return (
    <div className="cards-page">

      {/* ================= HEADER ================= */}

      <header className="cards-header">

        <div className="cards-brand">
          <div className="cards-brand-icon">🏦</div>

          <div>
            <h2>Nissh</h2>
            <span>Bank</span>
          </div>
        </div>

        <button
          className="cards-back-button"
          onClick={onBack}
        >
          ← Back to Dashboard
        </button>

      </header>

      {/* ================= CONTENT ================= */}

      <main className="cards-content">

        <div className="cards-title">

          <div>
            <span className="cards-label">
              NISSH BANK
            </span>

            <h1>My Cards</h1>

            <p>
              Manage your debit card and card settings.
            </p>
          </div>

        </div>

        {/* ================= CARD SECTION ================= */}

        <section className="my-card-section">

          <div className="card-section-heading">
            <div>
              <h2>Debit Card</h2>
              <p>Your primary banking card</p>
            </div>

            <span
              className={
                isFrozen
                  ? "card-status frozen"
                  : "card-status active"
              }
            >
              ● {isFrozen ? "Frozen" : "Active"}
            </span>
          </div>

          <div className="card-layout">

            {/* BANK CARD */}

            <div
              className={`bank-card ${
                isFrozen ? "bank-card-frozen" : ""
              }`}
            >

              <div className="bank-card-top">

                <span className="bank-name">
                  NISSH BANK
                </span>

                <span className="card-type">
                  VISA
                </span>

              </div>

              <div className="chip">
                ▰
              </div>

              <div className="card-number">

                {showNumber
                  ? `4532 7812 9045 ${lastFour}`
                  : `•••• •••• •••• ${lastFour}`}

              </div>

              <div className="card-bottom">

                <div>
                  <small>CARD HOLDER</small>
                  <strong>
                    {username.toUpperCase()}
                  </strong>
                </div>

                <div>
                  <small>VALID THRU</small>
                  <strong>09/29</strong>
                </div>

              </div>

              {isFrozen && (
                <div className="frozen-overlay">
                  CARD FROZEN
                </div>
              )}

            </div>

            {/* CARD INFORMATION */}

            <div className="card-information">

              <div className="card-info-row">

                <span>Card Number</span>

                <strong>
                  {showNumber
                    ? `4532 7812 9045 ${lastFour}`
                    : `•••• •••• •••• ${lastFour}`}
                </strong>

              </div>

              <div className="card-info-row">

                <span>Card Holder</span>

                <strong>
                  {username}
                </strong>

              </div>

              <div className="card-info-row">

                <span>Expiry Date</span>

                <strong>09/29</strong>

              </div>

              <div className="card-info-row">

                <span>Card Type</span>

                <strong>Debit Card</strong>

              </div>

              <div className="card-info-row">

                <span>Network</span>

                <strong>VISA</strong>

              </div>

              <button
                className="show-card-button"
                onClick={() =>
                  setShowNumber(!showNumber)
                }
              >
                {showNumber
                  ? "Hide Card Number"
                  : "Show Card Number"}
              </button>

            </div>

          </div>

        </section>

        {/* ================= CARD ACTIONS ================= */}

        <section className="card-actions-section">

          <div className="section-heading">

            <span className="cards-label">
              CARD MANAGEMENT
            </span>

            <h2>Card Controls</h2>

            <p>
              Manage your card security and settings.
            </p>

          </div>

          <div className="card-actions-grid">

            {/* FREEZE */}

            <div className="card-action-box">

              <div className="card-action-icon freeze-icon">
                ❄
              </div>

              <div className="card-action-content">

                <h3>
                  {isFrozen
                    ? "Unfreeze Card"
                    : "Freeze Card"}
                </h3>

                <p>
                  {isFrozen
                    ? "Enable your card for transactions."
                    : "Temporarily stop all card transactions."}
                </p>

              </div>

              <button
                className={
                  isFrozen
                    ? "action-button unfreeze"
                    : "action-button freeze"
                }
                onClick={() =>
                  setIsFrozen(!isFrozen)
                }
              >
                {isFrozen
                  ? "Unfreeze"
                  : "Freeze"}
              </button>

            </div>

            {/* PIN */}

            <div className="card-action-box">

              <div className="card-action-icon pin-icon">
                🔐
              </div>

              <div className="card-action-content">

                <h3>Card PIN</h3>

                <p>
                  View your card PIN securely.
                </p>

                {showPin && (
                  <strong className="pin-value">
                    4821
                  </strong>
                )}

              </div>

              <button
                className="action-button secondary"
                onClick={() =>
                  setShowPin(!showPin)
                }
              >
                {showPin
                  ? "Hide PIN"
                  : "View PIN"}
              </button>

            </div>

            {/* LIMIT */}

            <div className="card-action-box">

              <div className="card-action-icon limit-icon">
                ₹
              </div>

              <div className="card-action-content">

                <h3>Daily Limit</h3>

                <p>
                  Your daily spending limit.
                </p>

                <strong className="limit-value">
                  ₹50,000
                </strong>

              </div>

              <button className="action-button secondary">
                Manage
              </button>

            </div>

          </div>

        </section>

        {/* ================= SECURITY ================= */}

        <section className="card-security">

          <div className="security-icon-card">
            🛡️
          </div>

          <div>

            <h3>
              Your card is protected
            </h3>

            <p>
              Never share your card number,
              PIN or OTP with anyone.
            </p>

          </div>

          <span className="security-protected">
            ✓ Protected
          </span>

        </section>

      </main>

    </div>
  );
}

export default Cards;