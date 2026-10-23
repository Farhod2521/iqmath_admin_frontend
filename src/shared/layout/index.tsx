// src/home/layout/MainLayout.tsx
import React, { useState, useEffect, Suspense } from "react";
import { Layout, Result } from "antd";
import { Outlet, useLocation } from "react-router-dom";

import SiderMenu from "./components/sidebar/Sidebar";
import DrawerWrapper from "./components/drawer/Drawer";
import Loading from "../components/Loading";
import Header from "./components/header/Header";
import { useStoreUsers, useThemeStore } from "@/store";
import BaseBreadcrumbs from "../components/BaseBreadcrumbs";
import { useBreadcrumbs } from "../hooks";

const { Content } = Layout;

const MainLayout: React.FC = () => {
  const location = useLocation();
  const breadcrumbs = useBreadcrumbs();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { fetchUserData, userData, isLoading, errorMessage } = useStoreUsers();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 650;
  const setCollapsed = useThemeStore((state) => state.setCollapsed);

  useEffect(() => {
    if (isMobile) setCollapsed(false);
  }, [isMobile, setCollapsed]);
  const hideSidebar = location.pathname.includes("response");

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  if (isLoading) {
    return <Loading />;
  }

  if (!userData) {
    return <Result status="error" title={errorMessage} />;
  }

  return (
    <Layout>
      {!hideSidebar && (isMobile ? <DrawerWrapper /> : <SiderMenu />)}

      <Layout>
        <Header />
        <div className="px-4 pt-3">
          <BaseBreadcrumbs data={breadcrumbs} />
        </div>
        <Content
          style={{
            height: "calc(100vh - 105px)",
            overflowY: "auto",
            background: "#f6f8fa",
            padding: location.pathname.includes("dashboard") ? "0" : "12px",
          }}
        >
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
