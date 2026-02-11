import { useEffect, useState } from "react";
import { Layout } from "antd";
import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";
import DrawerWrapper from "./drawer/Drawer";
import Main from "./main/Main";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { actionGetMe } from "@/store/auth/authActions";
import {
  selectUserAuth,
  selectUserLoading,
  selectUserMe,
} from "@/store/auth/authSlice";
import Loading from "@/components/loading";
import { selectTheme } from "@/store/theme/themeSlice";

function LayoutConfig() {
  const [width, setWidth] = useState(window.innerWidth);
  window.onresize = () => setWidth(window.innerWidth);

  // const { category } = useParams()
  const location = useLocation();
  const dispatch = useAppDispatch();
  // const authUser = useAppSelector(selectUserAuth);
  // const userLoading = useAppSelector(selectUserLoading);
  // const userMe = useAppSelector(selectUserMe)
  const theme = useAppSelector(selectTheme);

  // useEffect(() => {
  //   dispatch(actionGetMe());
  // }, [authUser]);

  return (
    <Layout className={`h-full select-none ${theme}`}>
      {/* {userLoading ? (
        <Loading />
      ) : ( */}
      <>
        {!location.pathname.includes("logic") &&
          (width < 650 ? <DrawerWrapper /> : <Sidebar />)}

        <Layout>
          {!location.pathname.includes("logic") && (
            <Layout.Header className="flex items-center !bg-white shadow-box px-2 mr-5 border-b-2">
              <Navbar />
            </Layout.Header>
          )}

          <Main width={width} />
        </Layout>
      </>
      {/* )} */}
    </Layout>
  );
}

export default LayoutConfig;
