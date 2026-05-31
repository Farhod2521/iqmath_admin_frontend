import { lazy } from "react";
import { Navigate, Route } from "react-router-dom";

const LogEntries = lazy(() => import("./pages/LogEntries"));
const LogEntriesRoutes = (
  <>
    <Route path="/log-entries" element={<LogEntries />} />
  </>
);

export default LogEntriesRoutes;
