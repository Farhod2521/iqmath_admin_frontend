import { lazy } from "react";
import { Navigate, Route } from "react-router-dom";

const Ratings = lazy(() => import("./pages/Ratings"));

const RatingRoutes = (
  <>
    <Route path="/ratings" element={<Ratings />} />
  </>
);

export default RatingRoutes;
