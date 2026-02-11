import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Button,
  Container,
  IconButton,
  useScrollTrigger,
} from "@mui/material";
import {
  FaEnvelope,
  FaEye,
  FaMobile,
  FaPhone,
  FaSignInAlt,
  FaUser,
} from "react-icons/fa";
import { MdOutlineRssFeed } from "react-icons/md";
import imageLogo from "../assets/images/logo.png";
import { BiLogOut } from "react-icons/bi";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  logout,
  selectIsAuthenticated,
  selectIsStaff,
  selectUserMe,
  selectUserPermission,
} from "@/store/auth/authSlice";
import { setSidebarMenu } from "@/store/theme/themeSlice";
import { Avatar, Drawer } from "antd";
import { FILE_VIEW_URL } from "@/utils/file";
import { useEffect, useState } from "react";
import { actionGetMe } from "@/store/auth/authActions";
import { Menu } from "@mui/icons-material";
import { childRoutes } from "@/router/routes";

const navbarLink = [
  // { name: 'Bosh sahifa', path: '/' },
  // { name: "Ma'lumotlar", path: '/info' },
  { name: "Ochiq ma'lumotlar", path: "#open-data" },
  { name: "Reja jadval", path: "#plan-grafic" },
  { name: "Yangiliklar", path: "#news" },
  { name: "Qo'llanmalar", path: "#helps" },
  { name: "Ochiq xarita", path: "#open-map" },
];

function Navbar() {
  const location = useLocation();
  const trigger = useScrollTrigger({ threshold: 45, disableHysteresis: true });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(selectIsAuthenticated);
  const isStaff = useAppSelector(selectIsStaff);
  const userData = useAppSelector(selectUserMe);
  const permission = useAppSelector(selectUserPermission);
  const [isMenu, setIsMenu] = useState(false);

  const handleLogin = () => {
    // loginOneId();
    navigate("/dashboard");
  };
  const handleLogout = () => {
    navigate("/");
    dispatch(logout());
  };
  const handleProfile = () => {
    navigate("/profile");
  };

  const handleKabinet = () => {
    if (permission.includes("menu:dashboard")) {
      navigate("/dashboard");
      dispatch(
        setSidebarMenu({ open: ["menu:dashboard"], select: "menu:dashboard" }),
      );
    } else {
      const r = childRoutes.find((i) => i.name && permission.includes(i.name));
      navigate(r?.path || "/dashboard");
      dispatch(setSidebarMenu({ open: [r?.name], select: r?.name }));
    }
  };

  useEffect(() => {
    isAuth && dispatch(actionGetMe());
  }, []);

  return (
    <div className="navbar">
      <div className="navbar_top">
        <Container>
          <ul className="contact">
            <li>
              <a href="/">
                <FaEye />
              </a>
            </li>
            <li>
              <a href="/">
                <MdOutlineRssFeed />
              </a>
            </li>
            <li>
              <a href="tel:712070003">
                <FaMobile />
              </a>
            </li>
            <li>
              <a href="tel:1097">
                <FaPhone />
                1097
              </a>
            </li>
            <li>
              <a href="mailto:info@iqmath.uz">
                <FaEnvelope /> info@iqmath.uz
              </a>
            </li>
            {isAuth && (
              <li>
                <Button className="p_btn" onClick={handleLogout}>
                  <BiLogOut /> Chiqish
                </Button>
              </li>
            )}
          </ul>
        </Container>
      </div>
      <AppBar
        position={trigger ? "fixed" : "static"}
        elevation={trigger ? 2 : 0}
        color="transparent"
        sx={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px;" }}
      >
        <div className="navbar_bottom">
          <Container>
            <div className="inner">
              <div className="logo">
                <a href="/" className="">
                  {/* <img src={imageLogo} alt="logo" /> */}
                </a>
              </div>

              <ul className="menu">
                {navbarLink.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className={
                        location.pathname === item.path ? "active" : ""
                      }
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="get_quote ">
                {isAuth ? (
                  <>
                    <Button
                      className="p_btn button_logout"
                      onClick={handleProfile}
                    >
                      <Avatar
                        src={
                          userData &&
                          userData.photo &&
                          `${FILE_VIEW_URL}${userData.photo}`
                        }
                      />{" "}
                      Profil
                    </Button>
                    {isStaff && (
                      <Button
                        className="p_btn button_login"
                        onClick={handleKabinet}
                      >
                        <FaSignInAlt /> Kabinet
                      </Button>
                    )}
                  </>
                ) : (
                  <Button className="p_btn button_login" onClick={handleLogin}>
                    <FaSignInAlt /> Kirish
                  </Button>
                )}
              </div>

              <IconButton
                size="large"
                edge="start"
                color="inherit"
                onClick={() => setIsMenu(!isMenu)}
              >
                <Menu />
              </IconButton>
            </div>
            <Drawer
              className="mobile_menu"
              placement="left"
              open={isMenu}
              onClose={() => setIsMenu(false)}
            >
              <ul className="menu_list">
                {navbarLink.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className={
                        location.pathname === item.path ? "active" : ""
                      }
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="menu_click ">
                {isAuth ? (
                  <>
                    <Button onClick={handleProfile}>
                      <Avatar
                        src={
                          userData &&
                          userData.photo &&
                          `${FILE_VIEW_URL}${userData.photo}`
                        }
                      />{" "}
                      Profil
                    </Button>
                    {isStaff && (
                      <Button onClick={handleKabinet}>
                        <FaSignInAlt /> Kabinet
                      </Button>
                    )}
                  </>
                ) : (
                  <Button onClick={handleLogin}>
                    <FaSignInAlt /> Kirish
                  </Button>
                )}
              </div>
              <div className="menu_footer">
                {isAuth && (
                  <Button className="p_btn" onClick={handleLogout}>
                    <BiLogOut /> Chiqish
                  </Button>
                )}
              </div>
            </Drawer>
          </Container>
        </div>
      </AppBar>
    </div>
  );
}

export default Navbar;
