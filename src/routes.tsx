import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import Loading from "@/shared/components/Loading";
import ProtectedRoute from "@/shared/components/ProtectedRoute";
import MainLayout from "@/shared/layout";

// Routes
import AuthRoutes from "@/modules/auth/routes";
import CommonRoutes from "@/modules/common/routes";
import DashboardRoutes from "@/modules/dashboard/routes";
import PricesRoutes from "./modules/prices/routes";
import GroupsRoutes from "./modules/groups/routes";
import PaymentsRoutes from "./modules/payments/routes";

import UsersRoutes from "./modules/users/routes";
import SettingsRoutes from "./modules/settings/routes";
import ChatsRoutes from "./modules/chats/routes";
import RatingRoutes from "./modules/ratings/routes";
import MentorsRoutes from "./modules/mentors/routes";
import AppStudentsRoutes from "./modules/app-students/routes";
import RewardLogRoutes from "./modules/reward-log/routes";
import LibraryRoutes from "./modules/library/routes";

// Pages

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Public routes */}
        {/* {HomeRoutes} */}
        {AuthRoutes}
        {CommonRoutes}

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            {DashboardRoutes}
            {UsersRoutes}
            {SettingsRoutes}
            {PricesRoutes}
            {LibraryRoutes}
            {GroupsRoutes}
            {PaymentsRoutes}
            {ChatsRoutes}
            {RatingRoutes}
            {MentorsRoutes}
            {AppStudentsRoutes}
            {RewardLogRoutes}
            {/*  */}
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
