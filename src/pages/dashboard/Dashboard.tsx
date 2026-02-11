import { useAppSelector } from "@/hooks/useRedux";
import DashboardApplications from "./components/DashboarApplications";
import DashboardCategory from "./components/DashboardCategory";
// import DashboardStatusAndClause from './components/DashboardStatusAndClause'
import DashboardChartCountsMonthly from "@/pages/dashboard/components/DashboardChartCountsMonthly";
import { selectUserMe } from "@/store/auth/authSlice";

import DashboardStatusClause from "./components/DashboardStatusClause";

import DashboardDeadline from "./components/DashboardDeadline";
import { Card } from "antd";
// import DashboardStatusCount from './components/DashboardStatusCount'

function Dashboard() {
  // const userData = useAppSelector(selectUserMe);
  // const userOrg = userData?.position.organisation.code || "";
  // const userRole = userData?.position.role.code || "";

  return (
    <div className="flex flex-col gap-4">
      <Card title="Dashboard">{/*  */}</Card>
    </div>
  );
}

export default Dashboard;

const showList = ["geoinfocom", "palata", "agentlik"];
const showRole = ["superadmin", "admin", "republic_staff"];

const showRoleDeadline = ["superadmin", "admin"];
