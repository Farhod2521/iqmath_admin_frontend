import logoMini from "@/assets/svg/logo-mini.svg";
import Brand from "@/shared/components/brand";
import { useThemeStore } from "@/store";
import { AiOutlineMenuFold } from "react-icons/ai";
import { MdMenuOpen } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function DrawerProfile() {
  const { collapsed, toggleCollapsed } = useThemeStore();
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center border-b border-gray-200 bg-white px-4 pt-4 pb-2">
      <div
        className="flex items-center gap-1 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <div className="flex items-center justify-center">
          <Brand full />
        </div>
      </div>
      <div
        className="flex items-center justify-center cursor-pointer"
        onClick={toggleCollapsed}
        aria-label="Close menu"
      >
        <AiOutlineMenuFold size={20} color="#6e8bb8" />
      </div>
    </div>
  );
}

export default DrawerProfile;
