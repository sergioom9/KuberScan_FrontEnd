import ChartIsland from "../islands/ChartIsland.tsx";
import NotificationIsland from "../islands/NotificationIsland.tsx";
import StatsIsland from "../islands/StatsIslands.tsx";
import { deletedPods,quarantinedPods } from "../signals.ts";

function fetchdata(){
  const x = fetchNotifications();
  const alerts = x.length 
  const incidents = x.filter((n) => n.type === "Critical").length;
  return {
    user: {
      email: "admin@example.com",
      name: "Admin",
    },
    stats: {
      Connected_Users: 1,
      Incidents: incidents,
      Alerts: alerts,
      Quarantined: quarantinedPods.value,
      Deleted: deletedPods.value,
    },
  };
}

function fetchNotifications() {
  const notifications = [{
      id: "1",
      output: "Detected reverse shell activity",
      containerid: "success",
      containername: "container-1",
      podname: "pod-1",
      namespace: "default",
      username: "admin",
      useruid: "123456789",
      priority: "high",
      rule: "rule-1",
      time: "2023-01-01T00:00:00Z",
      source: "kubernetes",
      tags: ["tag1", "tag2"],
      read: false,
      type: "Critical",
      quarantined: false,
      deleted: false,
    },
    {
      id: "2",
      output: "Created new pod in the cluster",
      containerid: "info",
      containername: "System update completed",
      podname: "pod-2",
      namespace: "default",
      username: "admin",
      useruid: "123456789",
      priority: "medium",
      rule: "rule-2",
      time: "2023-01-01T01:00:00Z",
      source: "kubernetes",
      tags: ["tag3", "tag4"],
      read: false,
        type: "Warning",
      quarantined: false,
      deleted: false,
    },
    {
      id: "3",
      output: "Low storage space",
      containerid: "kube-proxy",
      containername: "Low storage space",
      podname: "pod-3",
      namespace: "default",
      username: "admin",
      useruid: "123456789",
      priority: "low",
      rule: "rule-3",
      time: "2023-01-01T02:00:00Z",
      source: "kubernetes",
      tags: ["tag5", "tag6"],
      read: false,
        type: "Info",
      quarantined: false,
      deleted: false,
    }
  ]
  return notifications;
}

    
const Dashboard = () => {
  const data = fetchdata();
  const notifications = fetchNotifications();
  return (
    <div class="dashboard">
      <StatsIsland data={data.stats} />
      <ChartIsland data={data.stats} />
      <NotificationIsland data={notifications} />
    </div>
  );
};

export default Dashboard;