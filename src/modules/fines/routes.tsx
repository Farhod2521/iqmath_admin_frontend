import { lazy } from "react";
import { Route } from "react-router-dom";

const Fine = lazy(() => import("./pages/Fine"));

const FineRoutes = <Route path="fines" element={<Fine />} />;

export default FineRoutes;
