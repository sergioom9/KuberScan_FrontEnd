
type PropData = {
    data: {
        Connected_Users: number;
        Incidents: number;
        Alerts: number;
        Quarantined: number;
        Deleted: number;
    }
}

const Stats = (data: PropData) => {
    return (
        <div class="stats-grid">
        <div class="stat-card">
          <h3>Connected Users</h3>
          <p class="stat-value">{data.data.Connected_Users}</p>
        </div>
        <a href="/incidents" style={{ textDecoration: "none", color: "inherit" }}>
        <div class="stat-card">
          <h3>Incidents</h3>
          <p class="stat-value">{data.data.Incidents}</p>
        </div>
        </a>
        <a href="/alerts" style={{ textDecoration: "none", color: "inherit" }}>
        <div class="stat-card">
          <h3>Alerts</h3>
          <p class="stat-value">{data.data.Alerts}</p>
        </div>
        </a>
        <div class="stat-card">
          <h3>Quarantined</h3>
          <p class="stat-value">{data.data.Quarantined}</p>
        </div>
        <div class="stat-card">
          <h3>Deleted</h3>
          <p class="stat-value">{data.data.Deleted}</p>
        </div>
      </div>
    );
}

export default Stats;