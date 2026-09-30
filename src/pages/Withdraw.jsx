import { useState } from "react";
import axios from "axios";
import "./Withdraw.css";

function Withdraw({ onBack, onSuccess }) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const handleWithdraw = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    const withdrawAmount = Number(amount);

    // ==============================
    // VALIDATION
    // ==============================

    if (!amount || withdrawAmount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    if (withdrawAmount > 1000000) {
      setError("Maximum withdrawal amount is ₹10,00,000.");
      return;
    }

    try {
      setLoading(true);

      // ==============================
      // API REQUEST
      // ==============================

      const response = await axios.post(
        "http://localhost:8080/api/account/withdraw",
        {
          amount: withdrawAmount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Withdraw response:", response.data);

      setMessage("Money withdrawn successfully!");

      setAmount("");

      // ==============================
      // GO BACK
      // ==============================

      setTimeout(() => {
        if (onSuccess) {
          onSuccess();
        } else if (onBack) {
          onBack();
        }
      }, 1000);

    } catch (err) {
      console.error("Withdraw error:", err);

      if (
        err.response?.status === 401 ||
        err.response?.status === 403
      ) {
        setError("Session expired. Please login again.");
        return;
      }

      setError(
        err.response?.data?.message ||
        "Unable to process withdrawal. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="withdraw-page">

      {/* =================================
          HEADER
      ================================= */}

      <header className="withdraw-header">

        <div className="withdraw-brand">

          <div className="withdraw-brand-icon">
            🏦
          </div>

          <div>
            <h2>Nissh</h2>
            <span>Bank</span>
          </div>

        </div>


        <button
          className="withdraw-back-btn"
          onClick={onBack}
        >
          ← Back to Dashboard
        </button>

      </header>


      {/* =================================
          MAIN
      ================================= */}

      <main className="withdraw-main">

        <div className="withdraw-container">

          {/* =================================
              HEADING
          ================================= */}

          <div className="withdraw-heading">

            <span>
              NISSH BANK
            </span>

            <h1>
              Withdraw Money
            </h1>

            <p>
              Withdraw money from your account
              securely and conveniently.
            </p>

          </div>


          {/* =================================
              GRID
          ================================= */}

          <div className="withdraw-grid">

            {/* =================================
                FORM
            ================================= */}

            <section className="withdraw-card">

              <div className="withdraw-card-icon">
                ↑
              </div>

              <h2>
                Withdraw Funds
              </h2>

              <p className="withdraw-description">
                Enter the amount you want to
                withdraw from your account.
              </p>


              <form onSubmit={handleWithdraw}>

                {/* AMOUNT */}

                <div className="withdraw-input-group">

                  <label>
                    Withdrawal Amount
                  </label>

                  <div className="withdraw-amount-input">

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

                <div className="withdraw-quick-amounts">

                  <button
                    type="button"
                    onClick={() =>
                      setAmount("500")
                    }
                  >
                    ₹500
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setAmount("1000")
                    }
                  >
                    ₹1,000
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setAmount("5000")
                    }
                  >
                    ₹5,000
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setAmount("10000")
                    }
                  >
                    ₹10,000
                  </button>

                </div>


                {/* ERROR */}

                {error && (
                  <div className="withdraw-error">
                    ⚠ {error}
                  </div>
                )}


                {/* SUCCESS */}

                {message && (
                  <div className="withdraw-success">
                    ✓ {message}
                  </div>
                )}


                {/* BUTTON */}

                <button
                  type="submit"
                  className="withdraw-submit-btn"
                  disabled={loading}
                >
                  {loading
                    ? "Processing..."
                    : "Withdraw Money →"}
                </button>

              </form>

            </section>


            {/* =================================
                INFORMATION
            ================================= */}

            <section className="withdraw-info-card">

              <div className="withdraw-info-icon">
                💳
              </div>

              <h2>
                Secure Withdrawal
              </h2>

              <p>
                Your withdrawal request is
                processed securely and your
                account balance is updated
                immediately.
              </p>


              <div className="withdraw-features">

                <div>
                  <span>✓</span>
                  Secure transaction
                </div>

                <div>
                  <span>✓</span>
                  Real-time balance update
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


              <div className="withdraw-warning">

                <strong>
                  ⚠ Important
                </strong>

                <p>
                  Make sure you have sufficient
                  balance before withdrawing
                  money.
                </p>

              </div>

            </section>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Withdraw;