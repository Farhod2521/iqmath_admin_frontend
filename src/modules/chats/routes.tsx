import { lazy } from "react";
import { Navigate, Route } from "react-router-dom";

const Chats = lazy(() => import("./pages/Chats"));

const ChatsRoutes = (
  <>
    <Route path="/chats" element={<Chats />} />
  </>
);

export default ChatsRoutes;
