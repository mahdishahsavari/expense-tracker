import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MacbookScroll } from "./macbook-scroll";
import TextRevealByWord from "./TextReveal";
import IconCloud from "./IconCloud";

const slugs = [
  "typescript",
  "javascript",
  "dart",
  "java",
  "react",
  "flutter",
  "android",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "nextdotjs",
  "prisma",
  "amazonaws",
  "postgresql",
  "firebase",
  "nginx",
  "vercel",
  "testinglibrary",
  "jest",
  "cypress",
  "docker",
  "git",
  "jira",
  "github",
  "gitlab",
  "visualstudiocode",
  "androidstudio",
  "sonarqube",
  "figma",
];

function Hero() {
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <div className="overflow-hidden dark:bg-black bg-white w-full">
        <MacbookScroll
          title={
            <span>
              Manage Your Expense{" "}
              <span className="text-primary">Control Your Money</span>
              <br />{" "}
              <span className="text-muted-foreground text-xl">
                Start Creating your budget and save ton of money
              </span>
            </span>
          }
          badge={
            <Link href="/">
              <Image src="/Logo.png" alt="Logo" width={50} height={50} />
            </Link>
          }
          showGradient={false}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 bg-white dark:bg-black">
        {/* Reveal Text */}
        <div className="z-10 flex min-h-[16rem] items-center justify-center bg-white dark:bg-black">
          <TextRevealByWord text="Trusted By Thousands of Companies & Users" />
        </div>
        {/* Icon Cloud */}
        <div className="relative flex h-full w-full max-w-[32rem] items-center justify-center overflow-hidden bg-white dark:bg-black px-20 pb-20 pt-8">
          <IconCloud iconSlugs={slugs} />
        </div>
      </div>
    </div>
  );
}

export default Hero;
