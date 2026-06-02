import { lazy } from "react";
import { Route } from "react-router-dom";

const Diagnostc = lazy(() => import("./pages/Diagnostc"));

const DiagnostcRoutes = (
  <>
    <Route path="/diagnostc" element={<Diagnostc />} />
  </>
);

export default DiagnostcRoutes;
