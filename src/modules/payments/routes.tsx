import { lazy } from "react";
import { Route } from "react-router-dom";

const Payments = lazy(() => import("./pages/Payment"));
// const Payments = lazy(() => import("./pages/Payments"));


const PaymentsRoutes = (
  <Route path="/payments">
    <Route path="payment" element={<Payments />} />
  </Route>
);

export default PaymentsRoutes;
