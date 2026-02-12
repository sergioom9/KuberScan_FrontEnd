import { useEffect, useState } from "preact/hooks";
import IncidentComponent from "./IncidentComponent.tsx";

type Incident = {
  id: string,
  pod: string,
  namespace: string,
  firstSeen: string,
  lastSeen: string,
  severity: string,
  alertCount: number,
  status: "open" | "quarantined" | "deleted"
}


const fetchIncident = async () => {
    const pathParts = globalThis.location.pathname.split("/");
    const id = atob(pathParts[2])
    const response = await fetch('https://dynamicalerts.sergioom9.deno.net/data/incidents');
    const data = await response.json();
    const filteredData = data.filter((elem: Incident) => elem.pod === id);
    return filteredData;
}


function GroupIncidents() {
    const [incidents, setIncidents] = useState<Incident[]>([]);
    const [pod,setPod] = useState<string>("")
    useEffect(() => {
        const fetchandsetIncidents = async () => {
            const incidents = await fetchIncident();
            setIncidents(incidents);
            setPod(incidents[0].pod)
        };
        fetchandsetIncidents();
    }, []);
  return (
    <div style="margin-top:100px;margin-inline:30px">
    <p class="alerts-info">POD : {pod}</p>
        <div class="notifications-container" >
        <div class="notifications-header">
        {incidents.map((elem) => (
            <IncidentComponent data={elem} />
        ))}
        </div>
        </div>
    </div>
  );
}
export default GroupIncidents;