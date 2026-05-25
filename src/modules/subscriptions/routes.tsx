import { lazy } from "react";
import { Navigate, Route } from "react-router-dom";

const Subscriptions = lazy(() => import("./pages/Subscriptions"));

const SubscriptionsRoute = (
  <>
    <Route path="/subscriptions" element={<Subscriptions />} />
  </>
);

export default SubscriptionsRoute;
