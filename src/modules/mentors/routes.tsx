import { lazy } from "react";
import { Navigate, Route } from "react-router-dom";

const Mentors = lazy(() => import("./pages/Mentors"));
const MentorsRoutes = (
  <>
    <Route path="/mentors" element={<Mentors />} />
  </>
);

export default MentorsRoutes;
