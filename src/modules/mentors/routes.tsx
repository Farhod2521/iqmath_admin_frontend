import { lazy } from "react";
import { Navigate, Route } from "react-router-dom";

const Mentors = lazy(() => import("./pages/Mentors"));
const MentorsRoutes = (
  <>
    <Route path="/mentors" element={<Mentors />} />
    {/* <Route path="/mentors/:id" element={<MentorsDetail />} /> */}
  </>
);

export default MentorsRoutes;
