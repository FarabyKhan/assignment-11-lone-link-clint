import React from 'react';

import DashNav from '../../Page/Dashboard/DashNav';
import { Link, NavLink, Outlet } from 'react-router';
import { BsDatabaseFillAdd } from 'react-icons/bs';
import Footer from '../../Components/Home/Footer';
import { RiGalleryView2 } from 'react-icons/ri';
import { GiHamburgerMenu } from 'react-icons/gi';
import DashActive from '../../Page/Dashboard/DashActive';


const DashboardLayout = () => {
    return (
        <div className="drawer lg:drawer-open">
           <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    {/* Navbar */}
    <nav className="navbar sticky top-0 z-50 w-full bg-base-300 border-b border-base-content/10">
      
      <DashNav></DashNav>
    </nav>
    {/* Page content here */}
    
      <main className='flex-1 bg-base-100 overflow-y-auto'>
      <div className='mx-auto min-h-screen w-full max-w-7xl px-6 py-8'>
        <Outlet></Outlet>
      </div>
    </main>
    <Footer></Footer>
  </div>

  <div className="drawer-side is-drawer-close:overflow-visible">
    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
    <div className="flex h-screen flex-col items-start bg-base-200 border-r border-base-content/10 is-drawer-close:w-20 is-drawer-open:w-64 transition-all duration-300">
      {/* Sidebar content here */}
      <ul className="menu w-full grow px-2 space-y-1">
        {/* List item */}
        <li>
          <Link to={"/dashboard"} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
            {/* Home icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
            <span className="is-drawer-close:hidden">Homepage</span>
          </Link>
        </li>

        {/* List item */}
        <li>
          <DashActive data-tip="AllLoan" to={'/dashboard/all-loan'}>
        <RiGalleryView2 />
        <span className="is-drawer-close:hidden">All Loan</span>
        </DashActive>
          
          <DashActive data-tip="AddLoan" to={'/dashboard/add-loan'}>
        <BsDatabaseFillAdd />
        <span className="is-drawer-close:hidden">Add Loan</span>
        </DashActive>
        </li>
      </ul>
      
    </div>
    
  </div>
</div>
    );
};

export default DashboardLayout;