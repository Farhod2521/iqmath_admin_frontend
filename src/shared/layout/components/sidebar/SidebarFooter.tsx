import { AUTH_DATA } from "@/configs/auth";
import { removeCookie } from "@/configs/cookies";
import { selectedClearData, useStoreAuth } from "@/store";
import { Button, Modal } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { BiExit } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const SidebarFooter = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const clearData = useStoreAuth(selectedClearData);
  const navigate = useNavigate();

  const handleLogout = () => {
    removeCookie(AUTH_DATA);
    clearData();
    navigate("/", { replace: true });
  };

  return (
    <div>
      <Button
        type="text"
        size="large"
        className="w-full"
        onClick={setIsModalOpen.bind(null, true)}
      >
        <div className="flex justify-between gap-2 items-center text-[#6e8bb7] font-medium">
          <BiExit size={21} /> {t("logout")}
        </div>
      </Button>
      <Modal
        open={isModalOpen}
        title={t("left")}
        okButtonProps={{ danger: true, type: "primary" }}
        cancelButtonProps={{ danger: false, type: "primary" }}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleLogout}
        okText={t("left")}
        cancelText={t("cancel")}
        centered
      >
        <p>{t("sureLogOut")}</p>
      </Modal>
    </div>
  );
};

export default SidebarFooter;
