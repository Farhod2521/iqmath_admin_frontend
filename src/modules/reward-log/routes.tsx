import { lazy } from "react";
import { Navigate, Route } from "react-router-dom";

const RewardLog = lazy(() => import("./pages/RewardLog"));

const RewardLogRoutes = (
  <>
    <Route path="/reward-log" element={<RewardLog />} />
  </>
);

export default RewardLogRoutes;
