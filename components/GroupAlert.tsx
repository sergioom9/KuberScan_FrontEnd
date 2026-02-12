import { useEffect, useState } from "preact/hooks";
import AlertComponent from "./AlertComponent.tsx";

type Alert = {
  output: string,
  containerid : string,
  containername: string,
  podname: string,
  namespace: string,
  username: string,
  useruid: string,
  priority: string,
  rule: string,
  time: string,
  source: string,
  tags: string[]
}


const fetchAlerts = async () => {
    const pathParts = globalThis.location.pathname.split("/");
    const id = atob(pathParts[2])
    const response = await fetch('https://dynamicalerts.sergioom9.deno.net/data/alerts');
    const data = await response.json();
    const filteredData = data.filter((elem: Alert) => elem.podname === id);
    return filteredData;
}


function GroupAlerts() {
    const [alerts, setAlerts] = useState<Alert[]>([]);
    const [podname,setPodname] = useState<string>("")
    useEffect(() => {
        const fetchAndSetAlerts = async () => {
            const alerts = await fetchAlerts();
            setAlerts(alerts);
            setPodname(alerts[0].podname)
        };
        fetchAndSetAlerts();
    }, []);
  return (
    <div style="margin-top:100px;margin-inline:30px">
    <p class="alerts-info">POD : {podname}</p>
        <div class="notifications-container" >
        <div class="notifications-header">
        {alerts.map((alert) => (
            <AlertComponent data={alert} />
        ))}
        </div>
        </div>
    </div>
  );
}
export default GroupAlerts;