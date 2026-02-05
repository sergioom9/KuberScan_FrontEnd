import { useState } from "preact/hooks";
import { deletedPods, quarantinedPods } from "../signals.ts";

interface Notification {
  id: string;
  output: string;
  containerid: string;
  containername: string;
  podname: string;
  namespace: string;
  username: string;
  useruid: string;
  priority: string;
  rule: string;
  time: string;
  source: string;
  tags: string[];
  read: boolean;
  type: "Critical" | "Warning" | "Info";
  quarantined: boolean;
  deleted: boolean;
}

type PropData = {
  data: Notification[];
};

export default function Notifications(data: PropData) {
  const [notifications, setNotifications] = useState<Notification[]>(data.data);

  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "Critical":
        return "✕";
      case "Warning":
        return "⚠";
      default:
        return "ℹ";
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "Critical":
        return "#f80f0f";
      case "Warning":
        return "#fdec00";
      default:
        return "#585858";
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
  };

  const deletePod = (podname: string, namespace: string) => {
  setNotifications((prev) =>
    prev.map((n) =>
      n.podname === podname && n.namespace === namespace
        ? { ...n, deleted: true }
        : n
    )
  );
  deletedPods.value += 1;
};

const quarantinePod = (podname: string, namespace: string) => {
  setNotifications((prev) =>
    prev.map((n) =>
      n.podname === podname && n.namespace === namespace
        ? { ...n, quarantined: true }
        : n
    )
  );
  quarantinedPods.value += 1;
};

  return (
    <div class="notifications-container">
      <div class="notifications-header">
        <h2>Alerts</h2>
        <div class="notifications-actions">
          {unreadCount > 0 && (
            <>
              <span class="unread-badge">{unreadCount} new</span>
              <button onClick={markAllAsRead} class="mark-all-btn">
                Mark all as read
              </button>
            </>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            class="toggle-btn"
          >
            {isOpen ? "▼" : "▶"}
          </button>
        </div>
      </div>

      {isOpen && (
        <div class="notifications-list">
          {notifications.length === 0
            ? (
              <div class="empty-state">
                <p>No notifications</p>
              </div>
            )
            : (
              notifications.slice(0, 3).map((notification) => (
                <div
                  key={notification.id}
                  class={`notification-item ${
                    notification.read ? "read" : "unread"
                  } notification-${notification.type.toLowerCase()}`}
                  onClick={() =>
                    !notification.read && markAsRead(notification.id)}
                >
                  {(notification.quarantined || notification.deleted) && (
                    <div
                      style={{
                        position: "absolute",
                        top: "30px",
                        right: "-35px",
                        background: "linear-gradient(45deg, #f59e0b, #f97316)",
                        color: "white",
                        padding: "8px 50px",
                        transform: "rotate(45deg)",
                        fontSize: "14px",
                        fontWeight: "bold",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                        zIndex: 10,
                        letterSpacing: "1px",
                      }}
                    >
                      SOLVED
                    </div>
                  )}

                  {(notification.quarantined || notification.deleted) && (
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: "rgba(0, 0, 0, 0.5)",
                        backdropFilter: "blur(2px)",
                        zIndex: 5,
                        pointerEvents: "none",
                      }}
                    />
                  )}
                  <div
                    class="notification-icon"
                    style={{
                      background: `linear-gradient(135deg, ${
                        getNotificationColor(notification.type)
                      }, ${getNotificationColor(notification.type)}99)`,
                    }}
                  >
                    {getNotificationIcon(notification.type)}
                  </div>

                  <div class="notification-content">
                    <div class="notification-header">
                      <span
                        class={`notification-badge ${notification.type.toLowerCase()}`}
                      >
                        {notification.type}
                      </span>
                      <span class="notification-priority">
                        Priority: {notification.priority}
                      </span>
                      <span class="notification-time">
                        {formatTimestamp(new Date(notification.time))}
                      </span>
                    </div>

                    <p class="notification-message">{notification.output}</p>

                    <div class="notification-details">
                      <div class="detail-row">
                        <span class="detail-label">Pod:</span>
                        <span class="detail-value">{notification.podname}</span>
                      </div>
                      <div class="detail-row">
                        <span class="detail-label">Container:</span>
                        <span class="detail-value">
                          {notification.containername}
                        </span>
                      </div>
                      <div class="detail-row">
                        <span class="detail-label">Namespace:</span>
                        <span class="detail-value">
                          {notification.namespace}
                        </span>
                      </div>
                      <div class="detail-row">
                        <span class="detail-label">User:</span>
                        <span class="detail-value">
                          {notification.username}
                        </span>
                      </div>
                      <div class="detail-row">
                        <span class="detail-label">Rule:</span>
                        <span class="detail-value">{notification.rule}</span>
                      </div>
                      <div class="detail-row">
                        <span class="detail-label">Source:</span>
                        <span class="detail-value">{notification.source}</span>
                      </div>
                      {notification.tags && notification.tags.length > 0 && (
                        <div class="detail-row">
                          <span class="detail-label">Tags:</span>
                          <div class="tags-container">
                            {notification.tags.map((tag) => (
                              <span key={tag} class="tag">{tag}</span>
                            ))}
                          </div>
                        </div>
                      )}
                      <div class="detail-row">
                        <span class="detail-label">Quarantined:</span>
                        <span class="detail-value">{notification.quarantined ? "Yes" : "No"}</span>
                      </div>
                      <div class="detail-row">
                        <span class="detail-label">Deleted:</span>
                        <span class="detail-value">{notification.deleted ? "Yes" : "No"}</span>
                      </div>

                    </div>

                    <div class="notification-actions">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          quarantinePod(
                            notification.podname,
                            notification.namespace,
                          );
                        }}
                        class="action-btn quarantine-btn"
                      >
                        🔒 Quarantine Pod
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deletePod(
                            notification.podname,
                            notification.namespace,
                          );
                        }}
                        class="action-btn delete-pod-btn"
                      >
                        🗑️ Delete Pod
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          <button
            class="mark-all-btn"
            onClick={(e) => globalThis.location.href = "/alerts"}
          >
            See All
          </button>
        </div>
      )}
    </div>
  );
}
