import React from "react";
import SideNavBar from "@/components/Dashboard/SideNavBar";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="fixed md:w-64 hidden md:block">
        <SideNavBar />
      </div>
      <div className="md:ml-64">
        <DashboardHeader />
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;
