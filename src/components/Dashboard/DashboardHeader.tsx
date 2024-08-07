import React from "react";
import { UserButton } from "@clerk/nextjs";

function DashboardHeader() {
  return (
    <div className="p-5 flex justify-between">
      <div className="">search</div>
      <div className="">
        <UserButton />
      </div>
    </div>
  );
}

export default DashboardHeader;
