import Stats from "../components/Stats.tsx";

type PropData = {
    data: {
        Alerts: number;
        Connected_Users: number;
        Incidents: number;
        Quarantined: number;
        Deleted: number;
    }
}

const StatsIsland = (stats:PropData) => {
  return (
    <div>
      <Stats  data={stats.data} />
    </div>
  );
}

export default StatsIsland;