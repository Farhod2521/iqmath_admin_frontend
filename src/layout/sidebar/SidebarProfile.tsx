import { useAppSelector } from "@/hooks/useRedux";
import { selectUserMe } from "@/store/auth/authSlice";
import { selectCollapsed } from "@/store/theme/themeSlice";
import { FILE_VIEW_URL } from "@/utils/file";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { useNavigate } from "react-router-dom";

function SidebarProfile() {
  const navigate = useNavigate();
  // const userData = useAppSelector(selectUserMe)
  const collapsed = useAppSelector(selectCollapsed);

  const backHome = () => navigate(`/user-profile`);

  // if (!userData) return null;
  return (
    <div className="layout__profile" onClick={backHome}>
      {collapsed ? (
        <Avatar
          size={40}
          // src={`${FILE_VIEW_URL}${userData.photo}`}
          icon={<UserOutlined />}
        />
      ) : (
        <div className="profile__avatar">
          <div className="flex items-center justify-start w-full gap-2 mb-2">
            <Avatar
              size={60}
              // src={`${FILE_VIEW_URL}${userData.photo}`}
              gap={1}
              icon={<UserOutlined />}
            />
            <div className="profile__user">
              {/* {userData.fullName} <br /> (
              {userData.position.role && userData.position.role.name}) */}
            </div>
          </div>
          <div className="profile__organization">
            {/* {userData.position.organisation.fullName} */}
          </div>
          <div className="profile__area">
            {/* {userData.position.region && userData.position.region.name}
            {userData.position.region && userData.position.district && <br />}
            {userData.position.district && userData.position.district.name}{" "} */}
            <br />
          </div>
        </div>
      )}
    </div>
  );
}

export default SidebarProfile;
