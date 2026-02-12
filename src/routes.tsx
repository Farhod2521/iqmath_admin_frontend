import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import Loading from "@/shared/components/Loading";
import ProtectedRoute from "@/shared/components/ProtectedRoute";
import MainLayout from "@/shared/layout";

// Routes
import AuthRoutes from "@/modules/auth/routes";
import CommonRoutes from "@/modules/common/routes";
import DashboardRoutes from "@/modules/dashboard/routes";
import StatisticsRoutes from "@/modules/statistics/routes";

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
            {StatisticsRoutes}
            {/*  */}
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
