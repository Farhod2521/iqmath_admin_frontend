import { lazy } from "react";
import { Route } from "react-router-dom";

const Announcements = lazy(() => import("./announcement/pages/Announcements"));
const Motivations = lazy(() => import("./motivation/pages/Motivation"));
const ConversionRates = lazy(
  () => import("./conversion/pages/ConversionRates"),
);
const DailyCoins = lazy(() => import("./daily-coin/pages/DailyCoins"));



const SettingsRoutes = (
  <Route path="/settings">
    <Route path="annoucements" element={<Announcements />} />
    <Route path="motivation" element={<Motivations />} />
    <Route path="conversion" element={<ConversionRates />} />
    <Route path="daily-coin" element={<DailyCoins />} />
  </Route>
);

export default SettingsRoutes;
