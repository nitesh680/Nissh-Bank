import { useState } from "react";
import axios from "axios";

function BankActionModal({
  type,
  onClose,
  onSuccess,
}) {
  const [amount, setAmount] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const token = localStorage.getItem("token");

  const isDeposit = type === "deposit";


  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const numericAmount = Number(amount);

    /*
     * Validate amount
     */

    if (!amount || numericAmount <= 0) {
      setError(
        "Please enter a valid amount greater than ₹0."
      );

      return;
    }


    try {

      setLoading(true);


      const endpoint = isDeposit
        ? "/api/account/deposit"
        : "/api/account/withdraw";


      /*
       * Send request to Spring Boot
       */

      const response = await axios.post(

        `http://localhost:8080${endpoint}`,

        {
          amount: numericAmount,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }

      );


      console.log(
        "Transaction successful:",
        response.data
      );


      /*
       * Success message
       */

      setSuccess(
        isDeposit
          ? "Money deposited successfully!"
          : "Money withdrawn successfully!"
      );


      setAmount("");


      /*
       * Refresh dashboard
       */

      if (onSuccess) {

        setTimeout(() => {

          onSuccess();

        }, 800);

      }

    } catch (error) {

      console.error(
        "Transaction error:",
        error
      );


      if (
        error.response?.status === 401
      ) {

        setError(
          "Your session has expired. Please login again."
        );

      } else if (
        error.response?.status === 403
      ) {

        setError(
          "You are not authorized to perform this transaction."
        );

      } else if (
        error.response?.status === 400
      ) {

        setError(
          error.response?.data?.message ||
          "Invalid transaction request."
        );

      } else {

        setError(
          error.response?.data?.message ||
          "Transaction failed. Please try again."
        );

      }

    } finally {

      setLoading(false);

    }
  };


  return (

    <div
      className="modal-overlay"
      onClick={onClose}
    >

      <div
        className="bank-modal"
        onClick={(e) =>
          e.stopPropagation()
        }
      >


        {/* HEADER */}

        <div className="modal-header">

          <div
            className={`modal-icon ${
              isDeposit
                ? "deposit"
                : "withdraw"
            }`}
          >

            {isDeposit
              ? "↓"
              : "↑"}

          </div>


          <button
            className="modal-close"
            onClick={onClose}
            type="button"
          >
            ×
          </button>

        </div>


        {/* TITLE */}

        <h2>

          {isDeposit
            ? "Deposit Money"
            : "Withdraw Money"}

        </h2>


        <p className="modal-description">

          {isDeposit

            ? "Add money securely to your Nissh Bank account."

            : "Withdraw money securely from your account."}

        </p>


        {/* ERROR */}

        {error && (

          <div className="modal-error">
            ⚠️ {error}
          </div>

        )}


        {/* SUCCESS */}

        {success && (

          <div className="modal-success">
            ✓ {success}
          </div>

        )}


        {/* FORM */}

        <form onSubmit={handleSubmit}>

          <label>
            Amount
          </label>


          <div className="amount-input">

            <span>
              ₹
            </span>

            <input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) =>
                setAmount(e.target.value)
              }
              min="1"
              step="0.01"
              autoFocus
            />

          </div>


          {/* QUICK AMOUNTS */}

          <div className="quick-amounts">

            {[500, 1000, 2000, 5000].map(
              (value) => (

                <button
                  type="button"
                  key={value}
                  onClick={() =>
                    setAmount(value)
                  }
                >
                  ₹{value}
                </button>

              )
            )}

          </div>


          {/* SUBMIT */}

          <button
            type="submit"
            className={`modal-submit ${
              isDeposit
                ? "deposit-submit"
                : "withdraw-submit"
            }`}
            disabled={loading}
          >

            {loading

              ? "Processing..."

              : isDeposit
              ? "Deposit Money"
              : "Withdraw Money"}

          </button>


          {/* CANCEL */}

          <button
            type="button"
            className="modal-cancel"
            onClick={onClose}
          >
            Cancel
          </button>

        </form>

      </div>

    </div>

  );
}

export default BankActionModal;

