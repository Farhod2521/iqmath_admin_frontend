import { lazy } from "react";
import { Route } from "react-router-dom";

const Login = lazy(() => import("./pages/Login"));

const AuthRoutes = (
  <>
    <Route path="/login" element={<Login />} />
  </>
);

export default AuthRoutes;
