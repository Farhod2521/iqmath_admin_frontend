import { lazy } from "react";
import { Route } from "react-router-dom";

const AISolutions = lazy(() => import("./pages/AISolutions"));
const AISolutionTopic = lazy(() => import("./pages/AISolutionTopic"));

const AISolutionsRoutes = (
  <Route path="ai-solutions">
    <Route index element={<AISolutions />} />
    <Route path="topics/:id" element={<AISolutionTopic />} />
  </Route>
);

export default AISolutionsRoutes;
