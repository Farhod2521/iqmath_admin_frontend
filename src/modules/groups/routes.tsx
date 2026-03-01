import { lazy } from "react";
import { Route } from "react-router-dom";

const Groups = lazy(() => import("./pages/Groups"));

const GroupsRoutes = (
  <Route path="/groups">
    <Route path="group" element={<Groups />} />
  </Route>
);

export default GroupsRoutes;
