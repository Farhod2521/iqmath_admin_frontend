import { lazy } from "react";
import { Route } from "react-router-dom";

const Dashboard = lazy(() => import("./Dashboard"));

const DashboardRoutes = (
  <>
    <Route path="/statistics" element={<Dashboard />} />
  </>
);

export default DashboardRoutes;
