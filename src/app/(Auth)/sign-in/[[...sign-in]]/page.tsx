"use client";

import React from "react";
import { motion } from "framer-motion";
import { SignIn } from "@clerk/nextjs";
import { HeroHighlight } from "@/components/ui/hero-highlight";
import ThemeComponent from "@/components/ThemeComponent";

function SignInPage() {
  return (
    <HeroHighlight className="flex flex-col gap-2 items-center">
      <div>
        <ThemeComponent />
      </div>
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="flex items-center justify-center leading-relaxed lg:leading-snug mx-auto "
      >
        <SignIn />
      </motion.div>
    </HeroHighlight>
  );
}

export default SignInPage;
