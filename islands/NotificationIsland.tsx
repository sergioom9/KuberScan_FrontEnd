import Notifications from "../components/Notifications.tsx";

type PropData = {
  data: {
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
  };
};

const NotificationIsland = (notification: PropData) => {
  return (
    <div>
      <Notifications data={notification.data} />
    </div>
  );
};

export default NotificationIsland;
