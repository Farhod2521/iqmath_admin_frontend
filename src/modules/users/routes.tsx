import { lazy } from "react";
import { Route } from "react-router-dom";
import "./logic/assets/avatar.scss";

const UsersPermises = lazy(() => import("./pages/UsersPermises"));

const UsersRoutes = (
  <Route path="/users">
    <Route path="premises" element={<UsersPermises />} />
  </Route>
);

export default UsersRoutes;
