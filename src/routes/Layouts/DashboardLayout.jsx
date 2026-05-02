import React, { useEffect } from 'react';

import DashNav from '../../Page/Dashboard/DashNav';
import { Link, Outlet, useLocation, useNavigate } from 'react-router';
import { BsDatabaseFillAdd } from 'react-icons/bs';
import Footer from '../../Components/Home/Footer';
import { RiGalleryView2 } from 'react-icons/ri';
import { GiHamburgerMenu, GiMoneyStack } from 'react-icons/gi';
import DashActive from '../../Page/Dashboard/DashActive';
import { MdManageAccounts } from 'react-icons/md';
import { MdPendingActions } from "react-icons/md";
import { MdOutlineSettingsApplications } from "react-icons/md";
import { SiTicktick } from "react-icons/si";
import useRole from '../../useHooks/useRole';
import LoadingAm from '../../Page/Utility/LoadingAm';
import { MdOutlineManageAccounts } from "react-icons/md";
import { CgProfile } from 'react-icons/cg';

const DashboardLayout = () => {

  const {role} = useRole()
  

  return (

    
    <div className="drawer lg:drawer-open ">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar sticky top-0 z-50 w-full bg-base-300 border-b border-base-content/10">

          <DashNav></DashNav>
        </nav>
        {/* Page content here */}
        {/* bg-linear-to-b from-[#bad4d2] to-[#e2eef3] */}

        <main className='flex-1 overflow-y-auto bg-linear-to-b from-[#f1f7ff] to-[#c6f2ff]'>              
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
              <Link to={"/"} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
                {/* Home icon */}
                 <img src='/loanlink_logo.png' className='h-8 w-8' alt="" />
                <span className="is-drawer-close:hidden custom-font text-primary text-lg">LoanLink</span>
              </Link>
            </li>

            {/* List item */}
            <li className='my-5'>
              {
                role === 'admin' && <>

                <DashActive data-tip="ManageUsers" to={'/dashboard/manage-users'}>
                <MdManageAccounts className='w-5 h-5' />
                <span className="is-drawer-close:hidden">Manage Users</span>
              </DashActive>

              <DashActive data-tip="AllLoan" to={'/dashboard/all-loan'}>
                <RiGalleryView2 className='w-5 h-5' />
                <span className="is-drawer-close:hidden">All Loan</span>
              </DashActive>
              <DashActive data-tip="LoanApplications" to={'/dashboard/loan-applications'}>
                <MdOutlineSettingsApplications className='w-6 h-6' />
                <span className="is-drawer-close:hidden">Loan Applications</span>
              </DashActive>

                </>
              }

              {
                role === 'manager' && <>
                <DashActive data-tip="AddLoan" to={'/dashboard/manage-profile'}>
                <CgProfile className='w-5 h-5' />
                <span className="is-drawer-close:hidden">My Profile</span>
              </DashActive>

                <DashActive data-tip="AddLoan" to={'/dashboard/add-loan'}>
                <BsDatabaseFillAdd className='w-5 h-5' />
                <span className="is-drawer-close:hidden">Add Loan</span>
              </DashActive>
              
                <DashActive data-tip="AddLoan" to={'/dashboard/manage-loans'}>
                <MdOutlineManageAccounts className='w-6 h-6' />
                <span className="is-drawer-close:hidden">Manage Loans</span>
              </DashActive>

              <DashActive data-tip="PendingLoan" to={'/dashboard/pending-loan'}>
                <MdPendingActions className='w-6 h-6' />
                <span className="is-drawer-close:hidden">Pending Loan</span>
              </DashActive>

              <DashActive data-tip="PendingLoan" to={'/dashboard/approved-loan'}>
                <SiTicktick className='w-5 h-5' />
                <span className="is-drawer-close:hidden">Approved Loan</span>
              </DashActive>
                </>
              }

              {
                role === 'borrower' && <>

                <DashActive data-tip="AddLoan" to={'/dashboard/user-profile'}>
                <CgProfile className='w-5 h-5' />
                <span className="is-drawer-close:hidden">My Profile</span>
              </DashActive>

                <DashActive data-tip="AddLoan" to={'/dashboard/my-loans'}>
                <GiMoneyStack className='w-5 h-5' />
                <span className="is-drawer-close:hidden">My Loans</span>
              </DashActive>

                
                </>
              }
             

            </li>
          </ul>

        </div>

      </div>
    </div>
  );
};

export default DashboardLayout;