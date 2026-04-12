import { lazy } from "react";
import { Route } from "react-router-dom";

const SubscriptionPlans = lazy(() => import("./pages/SubscriptionPlans"));
const Category = lazy(() => import("./pages/Category"));
const Benifits = lazy(() => import("./pages/Benifits"));
const SubscriptionSetting = lazy(() => import("./pages/SubscriptionSetting"));


const PricesRoutes = (
  <Route path="/prices">
    <Route path="subscriptionPlans" element={<SubscriptionPlans />} />
    <Route path="category" element={<Category />} />
    <Route path="benifits" element={<Benifits />} />
    <Route path="subscription-setting" element={<SubscriptionSetting />} />
  </Route>
);



export default PricesRoutes;
