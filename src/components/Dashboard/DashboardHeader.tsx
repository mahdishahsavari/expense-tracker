"use client";

import React from "react";
import { UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

function DashboardHeader() {
  const router = useRouter();

  return (
    <div className="p-5 flex justify-between">
      <div>
        <Button
          className="dark:bg-lime-500 dark:text-black"
          onClick={() => router.back()}
        >
          <ArrowLeft />
        </Button>
      </div>
      <div>
        <UserButton />
      </div>
    </div>
  );
}

export default DashboardHeader;
