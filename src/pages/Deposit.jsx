import { useState } from "react";
import axios from "axios";
import "./Deposit.css";

function Deposit({ onBack, onSuccess }) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const handleDeposit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    const depositAmount = Number(amount);

    // ==============================
    // VALIDATION
    // ==============================

    if (!amount || depositAmount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    if (depositAmount > 1000000) {
      setError("Maximum deposit amount is ₹10,00,000.");
      return;
    }

    try {
      setLoading(true);

      // ==============================
      // API REQUEST
      // ==============================

      const response = await axios.post(
        "http://localhost:8080/api/account/deposit",
        {
          amount: depositAmount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Deposit response:", response.data);

      setMessage("Money deposited successfully!");

      setAmount("");

      // ==============================
      // GO BACK AFTER SUCCESS
      // ==============================

      setTimeout(() => {
        if (onSuccess) {
          onSuccess();
        } else if (onBack) {
          onBack();
        }
      }, 1000);

    } catch (err) {
      console.error("Deposit error:", err);

      if (
        err.response?.status === 401 ||
        err.response?.status === 403
      ) {
        setError("Session expired. Please login again.");
        return;
      }

      setError(
        err.response?.data?.message ||
        "Unable to process deposit. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="deposit-page">

      {/* =================================
          HEADER
      ================================= */}

      <header className="deposit-header">

        <div className="deposit-brand">

          <div className="deposit-brand-icon">
            🏦
          </div>

          <div>
            <h2>Nissh</h2>
            <span>Bank</span>
          </div>

        </div>

        <button
          className="deposit-back-btn"
          onClick={onBack}
        >
          ← Back to Dashboard
        </button>

      </header>


      {/* =================================
          MAIN
      ================================= */}

      <main className="deposit-main">

        <div className="deposit-container">

          {/* =================================
              PAGE TITLE
          ================================= */}

          <div className="deposit-heading">

            <span>
              NISSH BANK
            </span>

            <h1>
              Deposit Money
            </h1>

            <p>
              Add money to your bank account
              securely and instantly.
            </p>

          </div>


          {/* =================================
              CONTENT
          ================================= */}

          <div className="deposit-grid">

            {/* =================================
                DEPOSIT FORM
            ================================= */}

            <section className="deposit-card">

              <div className="deposit-card-icon">
                ↓
              </div>

              <h2>
                Add Money
              </h2>

              <p className="deposit-description">
                Enter the amount you want to
                deposit into your account.
              </p>


              <form onSubmit={handleDeposit}>

                <div className="deposit-input-group">

                  <label>
                    Deposit Amount
                  </label>

                  <div className="amount-input">

                    <span>
                      ₹
                    </span>

                    <input
                      type="number"
                      placeholder="Enter amount"
                      value={amount}
                      onChange={(e) =>
                        setAmount(e.target.value)
                      }
                      min="1"
                      step="0.01"
                    />

                  </div>

                </div>


                {/* QUICK AMOUNTS */}

                <div className="quick-amounts">

                  <button
                    type="button"
                    onClick={() => setAmount("500")}
                  >
                    ₹500
                  </button>

                  <button
                    type="button"
                    onClick={() => setAmount("1000")}
                  >
                    ₹1,000
                  </button>

                  <button
                    type="button"
                    onClick={() => setAmount("5000")}
                  >
                    ₹5,000
                  </button>

                  <button
                    type="button"
                    onClick={() => setAmount("10000")}
                  >
                    ₹10,000
                  </button>

                </div>


                {/* ERROR */}

                {error && (
                  <div className="deposit-error">
                    ⚠ {error}
                  </div>
                )}


                {/* SUCCESS */}

                {message && (
                  <div className="deposit-success">
                    ✓ {message}
                  </div>
                )}


                {/* SUBMIT */}

                <button
                  type="submit"
                  className="deposit-submit-btn"
                  disabled={loading}
                >
                  {loading
                    ? "Processing..."
                    : "Deposit Money →"}
                </button>

              </form>

            </section>


            {/* =================================
                INFORMATION CARD
            ================================= */}

            <section className="deposit-info-card">

              <div className="info-icon">
                💰
              </div>

              <h2>
                Secure Deposit
              </h2>

              <p>
                Your deposit is processed securely
                and your account balance will be
                updated immediately.
              </p>


              <div className="deposit-features">

                <div>
                  <span>✓</span>
                  Instant balance update
                </div>

                <div>
                  <span>✓</span>
                  Secure transaction
                </div>

                <div>
                  <span>✓</span>
                  Transaction history updated
                </div>

                <div>
                  <span>✓</span>
                  Protected banking
                </div>

              </div>


              <div className="deposit-tip">

                <strong>
                  💡 Tip
                </strong>

                <p>
                  Make sure the amount entered
                  is correct before confirming
                  your deposit.
                </p>

              </div>

            </section>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Deposit;