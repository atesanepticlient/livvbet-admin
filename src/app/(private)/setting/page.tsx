"use client";

import { useState } from "react";
import SettingDisplay from "./setting-display";
import SettingPasswordChange from "./setting-password";
import SettingGmail from "./setting-gmail";
import Setting2FAVerify from "./setting-2fa-verify";

const Setting = () => {
  const [settingOption, setSettingOptions] = useState<
    "DISPLAY" | "PASSWORD" | "GMAIL" | "VERIFY"
  >("DISPLAY");

  return (
    <div className="mt-4">
      <div className="w-[95%] md:w-[500px] mx-auto">
        {settingOption == "DISPLAY" && (
          <SettingDisplay setOption={(option) => setSettingOptions(option)} />
        )}
        {settingOption == "PASSWORD" && (
          <SettingPasswordChange
            setOption={(option) => setSettingOptions(option)}
          />
        )}
        {settingOption == "GMAIL" && (
          <SettingGmail setOption={(option) => setSettingOptions(option)} />
        )}
        {settingOption == "VERIFY" && (
          <Setting2FAVerify setOption={(option) => setSettingOptions(option)} />
        )}
      </div>
    </div>
  );
};

export default Setting;
