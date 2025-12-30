import React from 'react';
import { NavLink } from 'react-router';

const DashActive = ({to, children}) => {
    return (
        <NavLink to={to}>
            {({ isActive })=>(
                <span className={`flex items-center gap-2 rounded-lg px-3 py-2 m text-sm font-medium ${isActive ? 'bg-primary text-primary-content' : 'hover:bg-base-300'} is-drawer-close:tooltip is-drawer-close: tooltip-right`}>
                    {children}
                </span>
            )}
        </NavLink>
    );
};

export default DashActive;