'use client'
import React from 'react';
import { FaHome, FaUserFriends } from 'react-icons/fa';

const Navsidebar = ({ isOpen }) => {
    return (
      <div className={`bg-cyan-950 text-white flex flex-col items-center transition-all duration-500 ease-in-out ${isOpen ? "w-8" : "w-8"}`}>
        <div className={`flex-1 flex flex-col items-center justify-center ${isOpen ? "w-full" : "w-16"}`}>
          <button className={`flex flex-col items-center justify-center focus:outline-none p-2 hover:bg-gray-700 ${isOpen ? "w-8" : "w-8"}`}>
            <FaHome className={`h-5 w-5 ${isOpen ? "mb-2" : ""}`} />
            {isOpen && <span className="text-sm">Home</span>}
          </button>
          <button className={`flex flex-col items-center justify-center focus:outline-none p-2 hover:bg-gray-700 ${isOpen ? "w-8" : "w-8"}`}>
            <FaUserFriends className={`h-5 w-5 ${isOpen ? "mb-2" : ""}`} />
            {isOpen && <span className="text-sm">Friends</span>}
          </button>
          {/* ... Agregar más botones/íconos según sea necesario */}
        </div>
      </div>
    );
  };

export default Navsidebar;
