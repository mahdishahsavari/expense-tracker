"use client";

import React from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from "lucide-react";
import SparklesText from "./SparklesText";
import ThemeComponent from "../ThemeComponent";
import { usePathname } from "next/navigation";
import Link from "next/link";

function SideNavBar() {
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutGrid,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Budgets",
      icon: PiggyBank,
      path: "/dashboard/budgets",
    },
    {
      id: 3,
      name: "Expenses",
      icon: ReceiptText,
      path: "/dashboard/expenses",
    },
    { id: 4, name: "Upgrade", icon: ShieldCheck, path: "/dashboard/upgrade" },
  ];

  const pathname = usePathname();

  return (
    <div className="h-screen p-5 border shadow-xl z-10">
      <div className="flex items-center justify-between">
        <Image src="/Logo.png" alt="Logo" width={100} height={100} />
        <ThemeComponent />
      </div>
      <div className="mt-5">
        {menuList.map((item, index) => (
          <Link href={item.path}>
            <h2
              className={`flex items-center my-2 gap-2 font-medium text-neutral-600 dark:text-neutral-50 p-3 cursor-pointer rounded-2xl hover:scale-105 hover:transition-all hover:bg-primary hover:text-zinc-100 hover:shadow-xl hover:z-10 duration-200 ${
                pathname === item.path &&
                "font-medium dark:text-neutral-50  rounded-2xl scale-105 bg-primary text-zinc-100 shadow-xl z-10"
              }`}
            >
              <item.icon />
              {item.name}
            </h2>
          </Link>
        ))}
      </div>
      <div className="fixed bottom-8 p-5 flex gap-2 items-center">
        <div className="scale-110">
          <UserButton />
        </div>
        <SparklesText text="Profile" className="font-medium text-lg" />
      </div>
    </div>
  );
}

export default SideNavBar;
