import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Tools from "./components/Tools";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="bg-[#05050A] min-h-screen text-gray-200">
      <Navbar />
      <main className="pt-20">
        <Hero />
        <Tools />
      </main>
      <Footer />
    </div>
  );
}
