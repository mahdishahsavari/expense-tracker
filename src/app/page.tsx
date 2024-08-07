import * as React from "react";
import Header from "@/components/Home/Header";
import Hero from "@/components/Home/Hero";
import Footer from "@/components/Home/Footer";

export default function Home() {
  return (
    <div className="bg-white dark:bg-black">
      <Header />
      <Hero />
      <Footer />
    </div>
  );
}
