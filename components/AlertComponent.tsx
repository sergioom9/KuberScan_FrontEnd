
type AlertProps = {
    data: {
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
}

const AlertComponent = (data: AlertProps) => {
    const b64id=btoa(data.data.podname)
    return (
        <a href={`/pod/${b64id}`} style={{ textDecoration: "none", color: "inherit" }}>
        <div class="notification-item">
            <h3>{data.data.output}</h3>
            <p><span style="color:red">Container ID:</span></p><p>{data.data.containerid}</p>
            <p><span style="color:red">Container Name:</span> {data.data.containername}</p>
            <p><span style="color:red">Pod Name: </span>{data.data.podname}</p>
            <p><span style="color:red">Namespace: </span>{data.data.namespace}</p>
            <p><span style="color:red">Username:</span> {data.data.username}</p>
            <p><span style="color:red">User UID:</span> {data.data.useruid}</p>
            <p><span style="color:red">Priority: </span>{data.data.priority}</p>
            <p><span style="color:red">Rule: </span>{data.data.rule}</p>
            <p><span style="color:red">Time: </span>{data.data.time}</p>
            <p><span style="color:red">Source: </span>{data.data.source}</p>
            <p><span style="color:red">Tags: </span>{data.data.tags.join(" | ")}</p>
        </div>
        </a>
    );
}
export default AlertComponent;