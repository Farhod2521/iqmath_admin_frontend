import { Card } from "antd";
import Statistics from "./pages/closed-chat-stats/Statistics";

function Dashboard() {
  return (
    <Card title="Dashboard" className="flex flex-col gap-2">
      <Statistics />
    </Card>
  );
}

export default Dashboard;
