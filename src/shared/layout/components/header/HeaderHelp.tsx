import React from "react";
import { Tooltip, Dropdown, Menu, Button, MenuProps } from "antd";
import { FaBookReader, FaRegQuestionCircle, FaTelegram } from "react-icons/fa";
import { PiInfoLight, PiVideoLight } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import HeaderTelegram from "./HeaderTelegram";
import { BiNews } from "react-icons/bi";
import { IoMdDocument } from "react-icons/io";
import LanguageDropdown from "./lang/LanguageDropdown";

const HeaderHelp: React.FC = () => {
  const navigate = useNavigate();

  const helpMenu: MenuProps["items"] = [
    {
      key: "handbooks",
      label: (
        <div className="flex items-center">
          <PiVideoLight size={20} className="text-gray-600" />
          <span className="ml-2">Qo‘llanmalar</span>
        </div>
      ),
      onClick: () => navigate("/help/handbooks"),
    },
    {
      key: "faqs",
      label: (
        <div className="flex items-center">
          <PiInfoLight size={20} className="text-gray-600" />
          <span className="ml-2">Savollar/Javoblar</span>
        </div>
      ),
      onClick: () => navigate("/help/faqs"),
    },
  ];

  const bookReader: MenuProps["items"] = [
    {
      key: "news",
      label: (
        <div className="flex items-center">
          <BiNews size={20} className="text-gray-600" />
          <span className="ml-2">Yangiliklar</span>
        </div>
      ),
      onClick: () => navigate("/help/news"),
    },
    {
      key: "normative",
      label: (
        <div className="flex items-center">
          <IoMdDocument size={18} className="text-gray-600" />
          <span className="ml-2">Normativ huquqiy hujjatlar</span>
        </div>
      ),
      onClick: () => navigate("/help/normative"),
    },
  ];

  return (
    <div className="flex items-center gap-2">
      <LanguageDropdown />
      {/* <HeaderTelegram />
      <div className="flex items-center justify-end pt-1 pb-0 pl-1 border-l-2 border-gray-200">
        <Dropdown
          menu={{ items: helpMenu }}
          trigger={["click"]}
          placement="bottomRight"
        >
          <Tooltip title="Yordam" placement="top">
            <Button
              type="text"
              shape="circle"
              className="flex items-center justify-center transition-transform duration-200 hover:scale-110"
              icon={
                <FaRegQuestionCircle
                  // color="#2563eb"
                  style={{ color: "rgb(91, 104, 113)" }}
                  size={18}
                />
              }
            />
          </Tooltip>
        </Dropdown>
      </div>

      <div className="flex items-center justify-end pt-1 pb-0 pl-1 pr-2 border-l-2 border-gray-200">
        <Dropdown
          menu={{ items: bookReader }}
          trigger={["click"]}
          placement="bottomRight"
        >
          <Tooltip title="Hujjatlari" placement="top">
            <Button
              type="text"
              shape="circle"
              className="flex items-center justify-center transition-transform duration-200 hover:scale-110"
              icon={
                <FaBookReader
                  // color="#2563eb"
                  style={{ color: "rgb(91, 104, 113)" }}
                  size={18}
                />
              }
            />
          </Tooltip>
        </Dropdown>
      </div> */}
    </div>
  );
};

export default HeaderHelp;
