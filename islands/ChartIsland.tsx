import Chart from "../components/Chart.tsx";

interface ChartProps {
  data: {
    Connected_Users: number;
    Incidents: number;
    Alerts: number;
    Quarantined: number;
    Deleted: number;
  };
}

const ChartIsland = ({data}:ChartProps) => {
    return (
        <Chart data={data} />
    );
}  

export default ChartIsland;