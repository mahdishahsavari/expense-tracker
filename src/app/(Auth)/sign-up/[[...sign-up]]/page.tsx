"use client";

import React from "react";
import { motion } from "framer-motion";
import { SignUp } from "@clerk/nextjs";
import { AuroraBackground } from "@/components/ui/aurora-background";
import ThemeComponent from "@/components/ThemeComponent";
import { Highlight } from "@/components/ui/hero-highlight";

function SignUpPage() {
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
          <Highlight>Welcome To Expense Tracker</Highlight>
        </div>
        <div>
          <ThemeComponent />
        </div>
        <SignUp />
      </motion.div>
    </AuroraBackground>
  );
}

export default SignUpPage;
