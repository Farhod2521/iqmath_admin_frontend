import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import routes, { publicPermissions } from "./routes";
import { router } from "./index.d";
import Loading from "@/components/loading";
import Auth from "@/components/auth";
import ErrorBoundaryWrapper from "@/layout/ErrorBoundary";

function RouterConfig() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>{routes.map((item) => renderRoute(item))}</Routes>
    </Suspense>
  );
}

export default RouterConfig;

const renderRoute = (item: router) => {
  const Component = item?.component;

  const element = publicPermissions.includes(item.name) ? (
    <Component />
  ) : (
    <Auth>
      <ErrorBoundaryWrapper>
        <Component />
      </ErrorBoundaryWrapper>
    </Auth>
  );

  if (item.children && item.children.length > 0) {
    return (
      <Route key={item.path} path={item.path} element={element}>
        {item.children.map((child) => renderRoute(child))}
      </Route>
    );
  } else {
    return <Route key={item.path} path={item.path} element={element} />;
  }
};
