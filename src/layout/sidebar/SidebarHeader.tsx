import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { selectCollapsed, setSidebarMenu } from "@/store/theme/themeSlice";
import { useNavigate } from "react-router-dom";

function SidebarHeader() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const collapsed = useAppSelector(selectCollapsed);

  const backHome = () => {
    navigate("/");
    dispatch(
      setSidebarMenu({
        open: ["menu:property", "aplications_all"],
        select: "aplications_all",
      }),
    );
  };

  return (
    <div className="layout__header overflow-hidden" onClick={backHome}>
      {collapsed ? (
        <span className="text-2xl font-bold text-nowrap uppercase px-2 sub__title">
          AT
        </span>
      ) : (
        <div className="flex items-center">
          <span className="text-2xl px-4 font-bold text-nowrap uppercase	">
            E'tirof <span className="sub__title">AT</span>
          </span>
        </div>
      )}
    </div>
  );
}

export default SidebarHeader;
