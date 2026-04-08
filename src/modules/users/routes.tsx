import { lazy } from "react";
import { Route } from "react-router-dom";
import "./logic/assets/avatar.scss";

const Users = lazy(() => import("./pages/Users"));
const UsersDetails = lazy(() => import("./pages/UsersDetails"));
const StudentSubjectDetails = lazy(
  () => import("./pages/StudentSubjectDetails"),
);



const UsersRoutes = (
  <Route path="/users">
    <Route path="pupils" element={<Users />} />
    <Route path="pupils/:id" element={<UsersDetails />} />
    <Route path="pupils/:id/:subjectId" element={<StudentSubjectDetails />} />
  </Route>
);

export default UsersRoutes;
