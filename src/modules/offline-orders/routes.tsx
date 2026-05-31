import { lazy } from "react";
import { Route } from "react-router-dom";

const OfflineOrders = lazy(() => import("./pages/OfflineOrders"));

const OfflineOrdersRoutes = (
  <>
    <Route path="/offline-orders" element={<OfflineOrders />} />
  </>
);

export default OfflineOrdersRoutes;
