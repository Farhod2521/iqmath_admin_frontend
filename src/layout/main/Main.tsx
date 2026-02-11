import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { Layout } from "antd";

type Props = { width: number };

function Main({ width }: Props) {
  return (
    <Layout.Content
      className="layout__main"
      style={{
        padding: width < 650 ? "0 4px 4px" : "10px",
        // marginTop: width < 650 ? 4 : 6,
      }}
    >
      <Suspense fallback={"Loading..."}>
        <Outlet />
      </Suspense>
    </Layout.Content>
  );
}

export default Main;
