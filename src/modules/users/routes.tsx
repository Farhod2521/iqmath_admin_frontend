import { lazy } from "react";
import { Route } from "react-router-dom";
import "./logic/assets/avatar.scss";

const Users = lazy(() => import("./pages/Users"));

const UsersRoutes = (
  <Route path="/users">
    <Route path="pupils" element={<Users />} />
  </Route>
);

export default UsersRoutes;
