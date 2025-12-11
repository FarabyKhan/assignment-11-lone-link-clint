import React from 'react';
import { NavLink } from 'react-router';

const ActiveLink = ({to,children}) => {
    return (
       <NavLink to={to}>
  {({ isActive }) => (
    <span
      className={`px-2 py-1 border-b-2 transition-all text-[#00a89d] text-xl
        ${isActive ? "border-primary text-primary" : "border-transparent text-xl"}
      `}
    >
      {children}
    </span>
  )}
</NavLink>
    );
};

export default ActiveLink;