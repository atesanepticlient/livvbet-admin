"use client";
import { seedEwallets } from "@/action/create";
import { Button } from "@/components/ui/button";
import React from "react";

const Test = () => {
  return (
    <div>
      <Button onClick={() => seedEwallets()}>Test</Button>
    </div>
  );
};

export default Test;
