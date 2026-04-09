import React from 'react';
import { NavLink } from 'react-router';

const ActiveLink = ({ to, children }) => {
  return (
    <NavLink to={to}>
      {({ isActive }) => (
        <span
          className={`custom-font px-2 py-1 border-b-2 transition-all text-[#FFFFFF] text-lg font-light
        ${isActive ? "border-primary text-primary font-bold" : "border-transparent text-black"}
      `}
        >
          {children}
        </span>
      )}
    </NavLink>
  );
};

export default ActiveLink;