import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
const SettingHeader = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="flex items-center gap-2 py-3 ">
      <button className="cursor-pointer" onClick={onClick}>
        <FaArrowLeftLong className="w-4 h-4" />
      </button>
      <span className="text-sm">Setting</span>
    </div>
  );
};

export default SettingHeader;
