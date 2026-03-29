import { lazy } from "react";
import { Route } from "react-router-dom";

const Announcements = lazy(() => import("./pages/Announcements"));
const Motivations = lazy(() => import("./pages/Motivation"));

const SettingsRoutes = (
  <Route path="/settings">
    <Route path="annoucements" element={<Announcements />} />
    <Route path="motivation" element={<Motivations />} />
  </Route>
);

export default SettingsRoutes;
