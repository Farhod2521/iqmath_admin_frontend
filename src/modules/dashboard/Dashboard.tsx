import { Card } from "antd";
import Statistics from "./pages/Statistics";
import ManagmentStatistics from "./pages/ManagmentStatistics";

function Dashboard() {
  return (
    <div className="p-1">
      <ManagmentStatistics />
      <div className="px-8 pt-4 pb-8 md:px-10 md:pb-10">
        <Statistics />
      </div>
    </div>
  );
}

export default Dashboard;
