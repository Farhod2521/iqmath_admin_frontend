import { lazy } from "react";
import { Route } from "react-router-dom";

const Statistics = lazy(() => import("./pages/Statistics"));

const StatisticsRoutes = (
  <>
    <Route path="/statistics" element={<Statistics />} />
  </>
);

export default StatisticsRoutes;
