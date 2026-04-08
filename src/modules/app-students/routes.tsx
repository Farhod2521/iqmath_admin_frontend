import { lazy } from "react";
import { Route } from "react-router-dom";

const ScoreLog = lazy(() => import("./score-log/pages/ScoreLog"));

const AppStudentsRoutes = (
  <Route path="/app-students">
    <Route path="score-log" element={<ScoreLog />} />
  </Route>
);

export default AppStudentsRoutes;
