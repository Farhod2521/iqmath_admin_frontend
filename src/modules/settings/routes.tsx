import { lazy } from "react";
import { Navigate, Route } from "react-router-dom";

const ConversionRates = lazy(
  () => import("./conversion/pages/ConversionRates"),
);

const ChatsRoutes = (
  <Route path="/setting">
    <Route path="/conversion" element={<ConversionRates />} />
    {/* <Route path="/chats" element={<Chats />} /> */}
    {/*  */}
  </Route>
);

export default ChatsRoutes;
