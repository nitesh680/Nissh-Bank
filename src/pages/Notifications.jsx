import { useEffect, useState } from "react";
import axios from "axios";
import "./Notifications.css";

const API = "http://localhost:8080/api/notifications";

export default function Notifications({ userEmail }) {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  const unreadCount = notifications.filter(
    (n) => !n.read
  ).length;

  const loadNotifications = async () => {
    if (!userEmail) return;

    try {
      const response = await axios.get(API, {
        params: { userEmail },
      });
      setNotifications(response.data);
    } catch (error) {
      console.error("Unable to load notifications:", error);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, [userEmail]);

  const markAsRead = async (id) => {
    try {
      await axios.put(`${API}/${id}/read`);
      loadNotifications();
    } catch (error) {
      console.error(error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await axios.put(`${API}/read-all`, null, {
        params: { userEmail },
      });
      loadNotifications();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteNotification = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      loadNotifications();
    } catch (error) {
      console.error(error);
    }
  };

  const clearAll = async () => {
    try {
      await axios.delete(`${API}/clear`, {
        params: { userEmail },
      });
      setNotifications([]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="notification-container">
      <button
        className="notification-bell"
        onClick={() => setOpen(!open)}
        aria-label="Notifications"
      >
        🔔
        {unreadCount > 0 && (
          <span className="notification-count">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="notification-dropdown">
          <div className="notification-header">
            <h3>Notifications</h3>
            <button onClick={markAllAsRead}>
              Mark all read
            </button>
          </div>

          <div className="notification-list">
            {notifications.length === 0 ? (
              <p className="no-notifications">
                No notifications yet
              </p>
            ) : (
              notifications.map((n) => (
                <div
                  className={`notification-item ${
                    n.read ? "read" : "unread"
                  }`}
                  key={n.id}
                >
                  <div className="notification-content">
                    <strong>{n.title}</strong>
                    <p>{n.message}</p>
                    <small>
                      {n.createdAt
                        ? new Date(n.createdAt).toLocaleString()
                        : ""}
                    </small>
                  </div>

                  <div className="notification-actions">
                    {!n.read && (
                      <button
                        onClick={() => markAsRead(n.id)}
                        title="Mark as read"
                      >
                        ✓
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(n.id)}
                      title="Delete"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {notifications.length > 0 && (
            <button
              className="clear-notifications"
              onClick={clearAll}
            >
              Clear all
            </button>
          )}
        </div>
      )}
    </div>
  );
}