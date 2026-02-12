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


const fetchIncidents = async () => {
    const response = await fetch('https://dynamicalerts.sergioom9.deno.net/data/incidents');
    const data = undefined; //await response.json();
    return data;
}


function Incidents() {
    const [incidents, setIncidents] = useState<Incident[]>([]);

    useEffect(() => {
        const fetchAndSetIncidents = async () => {
            const incidents = await fetchIncidents();
            setIncidents(incidents || []);
        };
        fetchAndSetIncidents();
    }, []);
    const groupedIncidents = Object.values(
        incidents.reduce((acc, incident) => {
    if (!acc[incident.pod]) {
      acc[incident.pod] = incident;
    }
    return acc;
  }, {} as Record<string, typeof incidents[0]>)
);

  return (
    <div style="margin-top:90px; margin-inline:30px">
      <p class="alerts-info">Incidents are shown grouped by POD by latest one</p>
        <div class="notifications-container" >
        <div class="notifications-header">
        {groupedIncidents.map((elem:Incident) => (
            <IncidentComponent data={elem} />
        ))}
        </div>
        </div>
    </div>
  );
}
export default Incidents;