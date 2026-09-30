import { useEffect, useState } from "react";
import axios from "axios";
import "./Transactions.css";

function Transactions({ onBack }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");

  const api = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  // =========================================
  // LOAD TRANSACTIONS
  // =========================================

  const fetchTransactions = async () => {
    try {
      setLoading(true);

      const response = await api.get(
        "/api/account/transactions"
      );

      setTransactions(
        Array.isArray(response.data)
          ? response.data
          : []
      );
    } catch (error) {
      console.error(
        "Transaction loading error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // =========================================
  // FORMAT INR
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
    if (!timestamp) return "";

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
    return type?.toUpperCase() || "TRANSACTION";
  };

  // =========================================
  // INCOMING / OUTGOING
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
  // FILTER
  // =========================================

  const filteredTransactions =
    transactions.filter((transaction) => {
      const type =
        transaction.type?.toLowerCase() || "";

      return type.includes(
        search.toLowerCase()
      );
    });

  // =========================================
  // STATISTICS
  // =========================================

  const totalTransactions =
    transactions.length;

  const totalMoneyIn = transactions
    .filter((transaction) =>
      isIncoming(transaction.type)
    )
    .reduce(
      (sum, transaction) =>
        sum +
        Number(transaction.amount || 0),
      0
    );

  const totalMoneyOut = transactions
    .filter(
      (transaction) =>
        !isIncoming(transaction.type)
    )
    .reduce(
      (sum, transaction) =>
        sum +
        Number(transaction.amount || 0),
      0
    );

  // =========================================
  // UI
  // =========================================

  return (
    <div className="transactions-page">

      {/* =====================================
          TOP NAVIGATION
      ===================================== */}

      <header className="transactions-topbar">

        <div className="transactions-brand">

          <div className="transactions-brand-icon">
            🏦
          </div>

          <div>
            <h1>Nissh</h1>
            <span>Bank</span>
          </div>

        </div>

        <button
          className="back-dashboard-btn"
          onClick={onBack}
        >
          ← Back to Dashboard
        </button>

      </header>

      {/* =====================================
          PAGE CONTENT
      ===================================== */}

      <main className="transactions-content">

        {/* PAGE HEADER */}

        <section className="transactions-header">

          <div>

            <span className="page-label">
              NISSH BANK
            </span>

            <h2>
              Transaction History
            </h2>

            <p>
              View and track all your account
              activity in one place.
            </p>

          </div>

          <button
            className="refresh-btn"
            onClick={fetchTransactions}
          >
            ↻ Refresh
          </button>

        </section>

        {/* =====================================
            STAT CARDS
        ===================================== */}

        <section className="transaction-stats">

          {/* TOTAL */}

          <div className="transaction-stat-card">

            <div className="transaction-stat-icon blue">
              ⇄
            </div>

            <div>
              <span>
                Total Transactions
              </span>

              <strong>
                {totalTransactions}
              </strong>
            </div>

          </div>

          {/* MONEY IN */}

          <div className="transaction-stat-card">

            <div className="transaction-stat-icon green">
              ↓
            </div>

            <div>
              <span>
                Money In
              </span>

              <strong>
                {formatAmount(totalMoneyIn)}
              </strong>
            </div>

          </div>

          {/* MONEY OUT */}

          <div className="transaction-stat-card">

            <div className="transaction-stat-icon red">
              ↑
            </div>

            <div>
              <span>
                Money Out
              </span>

              <strong>
                {formatAmount(totalMoneyOut)}
              </strong>
            </div>

          </div>

        </section>

        {/* =====================================
            TRANSACTION TABLE
        ===================================== */}

        <section className="all-transactions-card">

          {/* TABLE HEADER */}

          <div className="transactions-card-header">

            <div>

              <h3>
                All Transactions
              </h3>

              <p>
                Your complete account activity
              </p>

            </div>

            <div className="transaction-search">

              <span>⌕</span>

              <input
                type="text"
                placeholder="Search transactions..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>

          </div>

          {/* TABLE */}

          {loading ? (

            <div className="transactions-loading">

              <div className="loading-circle">
                ⟳
              </div>

              <p>
                Loading transactions...
              </p>

            </div>

          ) : filteredTransactions.length ===
            0 ? (

            <div className="transactions-empty">

              <div>
                📭
              </div>

              <h3>
                No transactions found
              </h3>

              <p>
                Your account activity will
                appear here.
              </p>

            </div>

          ) : (

            <div className="transaction-table">

              {/* TABLE HEAD */}

              <div className="transaction-table-head">

                <div>
                  Transaction
                </div>

                <div>
                  Date
                </div>

                <div>
                  Amount
                </div>

                <div>
                  Balance
                </div>

              </div>

              {/* TABLE ROWS */}

              {filteredTransactions.map(
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
                      className="transaction-table-row"
                      key={
                        transaction.id ||
                        index
                      }
                    >

                      {/* TRANSACTION */}

                      <div className="transaction-name">

                        <div
                          className={`transaction-circle ${
                            incoming
                              ? "incoming"
                              : "outgoing"
                          }`}
                        >
                          {incoming
                            ? "↓"
                            : "↑"}
                        </div>

                        <div>

                          <strong>
                            {type
                              .replaceAll(
                                "_",
                                " "
                              )}
                          </strong>

                          <span>
                            Transaction
                          </span>

                        </div>

                      </div>

                      {/* DATE */}

                      <div className="transaction-date">

                        {formatDate(
                          transaction.timestamp
                        )}

                      </div>

                      {/* AMOUNT */}

                      <div
                        className={`transaction-money ${
                          incoming
                            ? "money-in"
                            : "money-out"
                        }`}
                      >

                        {incoming
                          ? "+"
                          : "-"}

                        {formatAmount(
                          transaction.amount
                        )}

                      </div>

                      {/* BALANCE */}

                      <div className="transaction-balance">

                        {formatAmount(
                          transaction.balanceAfterTransaction
                        )}

                      </div>

                    </div>
                  );
                }
              )}

            </div>

          )}

        </section>

        {/* =====================================
            SECURITY MESSAGE
        ===================================== */}

        <section className="transaction-security">

          <div className="security-shield">
            🛡️
          </div>

          <div>

            <h3>
              Your transactions are secure
            </h3>

            <p>
              Nissh Bank protects your account
              activity using secure banking
              technology.
            </p>

          </div>

          <span>
            Secure
          </span>

        </section>

      </main>

    </div>
  );
}

export default Transactions;