"use client";
import React, { useState } from "react";
import { IoIosCheckbox, IoIosCheckboxOutline } from "react-icons/io";
const UserItemsCheck = ({
  playerId,
  id,
  balance,
  email,
  onDeselect,
  onSelect,
}: {
  playerId: string;
  email: string;
  balance: number;
  id: string;
  onSelect: (id: string) => void;
  onDeselect: (id: string) => void;
}) => {
  const [selected, setSeelcted] = useState(false);

  const hanldeClick = () => {
    setSeelcted((state) => {
      return !state;
    });
    if (selected) {
      onDeselect(id);
    } else {
      onSelect(id);
    }
  };

  return (
    <li
      onClick={hanldeClick}
      className="flex items-center px-3 py-2  cursor-default border-b"
    >
      <div className="flex items-center justify-between flex-1 ">
        <div className="flex-1">
          {selected ? (
            <IoIosCheckbox className="w-5 h-5" />
          ) : (
            <IoIosCheckboxOutline className="w-5 h-5" />
          )}
        </div>
        <span className="text-xs text-white flex-1">{email}</span>
        <span className="text-xs text-white flex-1">{playerId}</span>
        <span className="text-xs text-white flex-1 font-bold">৳{balance}</span>
      </div>
    </li>
  );
};

export default UserItemsCheck;
