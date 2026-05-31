import { lazy } from "react";
import { Route } from "react-router-dom";

const WithDrawal = lazy(() => import("./pages/WithDrawal"));

const WithDrawalRoutes = (
  <>
    <Route path="/with-drawal" element={<WithDrawal />} />
  </>
);

export default WithDrawalRoutes;
