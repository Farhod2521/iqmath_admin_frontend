import { useEffect, useRef, useState } from "react";
import { MdOutlineCalculate } from "react-icons/md";
import { GiAbacus } from "react-icons/gi";
import { FaCalculator } from "react-icons/fa";

import MultiplicationMathModal from "./math-modal/MultiplicationMathModal";
import CalculatorModal from "./math-modal/CalculatorModal";
import MultiplicationQuizModal from "./math-modal/MultiplicationQuizModal";
import { Dropdown, MenuProps } from "antd";

const HeaderMathMenu: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [openKarra, setOpenKarra] = useState<boolean>(false);
  const [openCalculator, setOpenCalculator] = useState<boolean>(false);
  const [openQuiz, setOpenQuiz] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "karra") setOpenKarra(true);
    if (key === "calculator") setOpenCalculator(true);
    if (key === "quiz") setOpenQuiz(true);
  };

  const items: MenuProps["items"] = [
    {
      key: "karra",
      label: (
        <div className="flex items-center gap-2">
          <GiAbacus size={16} />
          Karra jadvali
        </div>
      ),
    },
    {
      key: "calculator",
      label: (
        <div className="flex items-center gap-2">
          <FaCalculator size={16} />
          Calculator
        </div>
      ),
    },
    {
      key: "quiz",
      label: <div className="flex items-center gap-2">🧩 Karra quiz</div>,
    },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <Dropdown
        menu={{ items, onClick: handleMenuClick }}
        placement="bottomRight"
        trigger={["click"]}
      >
        <button
          type="button"
          className="flex cursor-pointer items-center justify-center text-blue-600 transition rounded-full w-9 h-9 bg-blue-50 hover:bg-blue-100"
        >
          <MdOutlineCalculate size={18} />
        </button>
      </Dropdown>

      {/* MODALS */}
      <MultiplicationMathModal
        open={openKarra}
        onClose={() => setOpenKarra(false)}
      />
      <CalculatorModal
        open={openCalculator}
        onClose={() => setOpenCalculator(false)}
      />
      <MultiplicationQuizModal
        open={openQuiz}
        onClose={() => setOpenQuiz(false)}
      />
    </div>
  );
};

export default HeaderMathMenu;
