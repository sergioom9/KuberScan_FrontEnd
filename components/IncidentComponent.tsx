
type IncidentProps = {
    data:{
    id: string,
    pod: string,
    namespace: string,
    firstSeen: string,
    lastSeen: string,
    severity: string,
    alertCount: number,
    status: "open" | "quarantined" | "deleted"
    }
}

const IncidentComponent = (data: IncidentProps) => {
    const b64id=btoa(data.data.pod)
    return (
            <a href={`/incident/${b64id}`} style={{ textDecoration: "none", color: "inherit" }}>
            <div class="notification-item">
            <h3>{data.data.id}</h3>
            <p><span style="color:red">Pod: </span></p><p>{data.data.pod}</p>
            <p><span style="color:red">Namespace: </span></p><p>{data.data.namespace}</p>
            <p><span style="color:red">First Seen: </span></p><p>{data.data.firstSeen}</p>
            <p><span style="color:red">Last Seen: </span></p><p>{data.data.lastSeen}</p>
            <p><span style="color:red">Severity: </span></p><p>{data.data.severity}</p>
            <p><span style="color:red">Alert Count: </span></p><p>{data.data.alertCount}</p>
            <p><span style="color:red">Status: </span></p><p>{data.data.status}</p>
            </div>
            </a>
    );
}
export default IncidentComponent;