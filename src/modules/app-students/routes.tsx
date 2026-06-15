import { lazy } from "react";
import { Route } from "react-router-dom";

const ScoreLog = lazy(() => import("./score-log/pages/ScoreLog"));
const ConversionHistory = lazy(
  () => import("./coversion-log/pages/ConversionHistory"),
);

const AppStudentsRoutes = (
  <Route path="/app-students">
    <Route path="score-log" element={<ScoreLog />} />
    <Route path="conversion-history" element={<ConversionHistory />} />
  </Route>
);

export default AppStudentsRoutes;
