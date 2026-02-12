import { lazy } from "react";
import { Route } from "react-router-dom";

const Dashboard = lazy(() => import("./Dashboard"));

const DashboardRoutes = (
  <>
    <Route path="/dashboard" element={<Dashboard />} />
  </>
);

export default DashboardRoutes;
