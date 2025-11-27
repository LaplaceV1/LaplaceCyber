import React from "react";

export default function Navbar() {
  return (
    <nav className="w-full py-4 px-6 backdrop-blur-sm fixed top-0 z-50">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <div
          className="text-xl font-bold"
          style={{ textShadow: "0 0 10px #00E8FF" }}
        >
          LaplaceCyber
        </div>

        <div className="text-sm text-gray-400">
          Tools • Research • Obfuscation
        </div>
      </div>
    </nav>
  );
}
