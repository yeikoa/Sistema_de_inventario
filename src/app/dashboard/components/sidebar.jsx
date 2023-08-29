'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { FaHome, FaUserFriends, IoMdExit } from 'react-icons/fa';

const Navsidebar = ({ isOpen }) => {
  const [activeDropdown, setActiveDropdown] = useState("");

  const toggleDropdown = (dropdownName) => {
    if (activeDropdown === dropdownName) {
      setActiveDropdown("");
    } else {
      setActiveDropdown(dropdownName);
    }
  };

  const routes = [
    { href: '/dashboard/devoluciones',icon: <FaHome className="h-5 w-5" /> },
    { href: '/dashboard/usuarios',icon: <FaUserFriends className="h-5 w-5" /> },
    { href: '/',icon: <IoMdExit className="h-5 w-5" /> },
  ];

  return (
    <div className={`px-2 py-60 bg-cyan-950 text-white flex flex-col items-center transition-all duration-500 ease-in-out ${isOpen ? "w-8" : "w-8"}`}>
      <div className={`flex-1 flex flex-col items-center justify-center ${isOpen ? "w-full" : "w-16"}`}>
        {routes.map((route) => (
          <div key={route.href} className="relative group">
            <Link href={route.href}>
              <button className={`flex flex-col items-center justify-center focus:outline-none p-2 hover:bg-gray-700 ${isOpen ? "w-8" : "w-8"}`} style={{ marginBottom: isOpen ? "12px" : "6px" }}>
                {route.icon}
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navsidebar;
