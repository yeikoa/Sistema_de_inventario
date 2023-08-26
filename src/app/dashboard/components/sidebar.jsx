'use client'
import React, { useState } from 'react';
import { FaHome, FaCog, FaUser, FaBars } from 'react-icons/fa';

export default function Sidebar () {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`w-64 bg-gray-800 h-screen py-6 px-2 fixed top-0 left-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`} onClick={() => setIsOpen(false)}>
      <div className="text-white text-2xl font-bold mb-8 pl-4">Sidebar</div>
      <button className="text-white absolute top-2 right-2 md:hidden" onClick={toggleSidebar}>
        <FaBars className="w-6 h-6" />
      </button>
      <ul className="space-y-2">
        <li className="flex items-center space-x-4 px-4 py-2 rounded-md hover:bg-gray-700">
          <FaHome className="w-6 h-6" />
          <span>Home</span>
        </li>
        <li className="flex items-center space-x-4 px-4 py-2 rounded-md hover:bg-gray-700">
          <FaUser className="w-6 h-6" />
          <span>Profile</span>
        </li>
        <li className="flex items-center space-x-4 px-4 py-2 rounded-md hover:bg-gray-700">
          <FaCog className="w-6 h-6" />
          <span>Settings</span>
        </li>
      </ul>
    </div>
  );
};


