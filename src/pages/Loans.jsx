import { useState } from "react";
import "./Loans.css";

function Loans({ onBack }) {

  const [amount, setAmount] = useState(500000);
  const [interest, setInterest] = useState(10.5);
  const [tenure, setTenure] = useState(5);

  const [selectedLoan, setSelectedLoan] =
    useState("Personal Loan");

  const [message, setMessage] = useState("");

  // EMI CALCULATION

  const monthlyRate = interest / 12 / 100;
  const months = tenure * 12;

  const emi =
    monthlyRate === 0
      ? amount / months
      : (amount *
          monthlyRate *
          Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);

  const formatAmount = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value || 0);
  };

  const applyLoan = (loanName) => {
    setSelectedLoan(loanName);

    setMessage(
      `Your ${loanName} application has been started.`
    );
  };

  return (
    <div className="loans-page">

      {/* HEADER */}

      <header className="loans-header">

        <div className="loans-brand">

          <div className="loans-brand-icon">
            🏦
          </div>

          <div>
            <h2>Nissh</h2>
            <span>Bank</span>
          </div>

        </div>

        <button
          className="loans-back-button"
          onClick={onBack}
        >
          ← Back to Dashboard
        </button>

      </header>

      {/* CONTENT */}

      <main className="loans-content">

        <span className="loans-label">
          NISSH BANK
        </span>

        <h1>Loans</h1>

        <p className="loans-subtitle">
          Choose the right loan for your financial needs.
        </p>

        {/* LOAN TYPES */}

        <section className="loan-types">

          {/* PERSONAL */}

          <div className="loan-card">

            <div className="loan-icon personal">
              👤
            </div>

            <h2>Personal Loan</h2>

            <p>
              Get quick funds for your personal
              expenses and financial needs.
            </p>

            <div className="loan-details">

              <span>
                Up to
                <strong>₹5 Lakh</strong>
              </span>

              <span>
                Interest from
                <strong>10.5%</strong>
              </span>

            </div>

            <button
              onClick={() =>
                applyLoan("Personal Loan")
              }
            >
              Apply Now →
            </button>

          </div>

          {/* EDUCATION */}

          <div className="loan-card">

            <div className="loan-icon education">
              🎓
            </div>

            <h2>Education Loan</h2>

            <p>
              Finance your education and build
              a better future.
            </p>

            <div className="loan-details">

              <span>
                Up to
                <strong>₹10 Lakh</strong>
              </span>

              <span>
                Interest from
                <strong>8.5%</strong>
              </span>

            </div>

            <button
              onClick={() =>
                applyLoan("Education Loan")
              }
            >
              Apply Now →
            </button>

          </div>

          {/* HOME */}

          <div className="loan-card">

            <div className="loan-icon home">
              🏠
            </div>

            <h2>Home Loan</h2>

            <p>
              Make your dream of owning a home
              a reality.
            </p>

            <div className="loan-details">

              <span>
                Up to
                <strong>₹50 Lakh</strong>
              </span>

              <span>
                Interest from
                <strong>8.0%</strong>
              </span>

            </div>

            <button
              onClick={() =>
                applyLoan("Home Loan")
              }
            >
              Apply Now →
            </button>

          </div>

        </section>

        {/* MESSAGE */}

        {message && (
          <div className="loan-message">
            ✓ {message}
          </div>
        )}

        {/* EMI CALCULATOR */}

        <section className="emi-section">

          <div className="emi-header">

            <span className="loans-label">
              PLAN YOUR LOAN
            </span>

            <h2>EMI Calculator</h2>

            <p>
              Calculate your estimated monthly
              loan payment.
            </p>

          </div>

          <div className="emi-layout">

            {/* INPUTS */}

            <div className="emi-inputs">

              <label>
                Loan Amount

                <div className="input-value">
                  {formatAmount(amount)}
                </div>

                <input
                  type="range"
                  min="50000"
                  max="5000000"
                  step="10000"
                  value={amount}
                  onChange={(e) =>
                    setAmount(
                      Number(e.target.value)
                    )
                  }
                />

                <div className="range-labels">
                  <span>₹50K</span>
                  <span>₹50L</span>
                </div>

              </label>

              <label>
                Interest Rate

                <div className="input-value">
                  {interest}%
                </div>

                <input
                  type="range"
                  min="5"
                  max="20"
                  step="0.1"
                  value={interest}
                  onChange={(e) =>
                    setInterest(
                      Number(e.target.value)
                    )
                  }
                />

                <div className="range-labels">
                  <span>5%</span>
                  <span>20%</span>
                </div>

              </label>

              <label>
                Loan Tenure

                <div className="input-value">
                  {tenure} Years
                </div>

                <input
                  type="range"
                  min="1"
                  max="20"
                  value={tenure}
                  onChange={(e) =>
                    setTenure(
                      Number(e.target.value)
                    )
                  }
                />

                <div className="range-labels">
                  <span>1 Year</span>
                  <span>20 Years</span>
                </div>

              </label>

            </div>

            {/* RESULT */}

            <div className="emi-result">

              <span>
                Estimated Monthly EMI
              </span>

              <h2>
                {formatAmount(emi)}
              </h2>

              <div className="emi-result-row">
                <span>Loan Amount</span>
                <strong>
                  {formatAmount(amount)}
                </strong>
              </div>

              <div className="emi-result-row">
                <span>Interest Rate</span>
                <strong>
                  {interest}%
                </strong>
              </div>

              <div className="emi-result-row">
                <span>Tenure</span>
                <strong>
                  {tenure} Years
                </strong>
              </div>

              <div className="emi-result-row">
                <span>Total Payments</span>
                <strong>
                  {formatAmount(
                    emi * months
                  )}
                </strong>
              </div>

              <button
                className="emi-apply-button"
                onClick={() =>
                  applyLoan(selectedLoan)
                }
              >
                Apply for {selectedLoan}
              </button>

            </div>

          </div>

        </section>

        {/* SECURITY */}

        <section className="loan-security">

          <div>🛡️</div>

          <div>
            <h3>Safe and Secure</h3>

            <p>
              Your loan application and personal
              information are protected.
            </p>
          </div>

        </section>

      </main>

    </div>
  );
}

export default Loans;