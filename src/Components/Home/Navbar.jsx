import React from 'react';
import { Link, NavLink } from 'react-router';
import Logo from './Logo';
import ActiveLink from './ActiveLink';
import useAuth from '../../useHooks/useAuth';
import { ScaleLoader } from 'react-spinners';
import { CgProfile } from "react-icons/cg";

const Navbar = () => {

const {user, loading, signOutUser } = useAuth()

  const handleSignOut = () => {
    signOutUser()
      .then(result => {
        console.log(result.user);

      })
      .catch(error => {
        console.log(error);

      })
  }

    const links = <>
                <li><ActiveLink to={'/'}>Home</ActiveLink></li>
                <li><ActiveLink to={'/all-loans'}>All Loans</ActiveLink></li>
                <li><ActiveLink to={'/about'}>About Us</ActiveLink></li>
                <li><ActiveLink to={'/contact'}>Contact</ActiveLink></li>
                 {
                 
                 user && <>
                <li><ActiveLink to={'/dashboard'}>Dashboard</ActiveLink></li>
                </>


               }
               
    
    </>

    return (
        <div className="navbar bg-gradient-to-b from-[#3372E2] to-[#8FD0F4] shadow-sm px-10">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {links}
      </ul>
    </div>
  <Link to={"/"} className="btn btn-ghost text-xl"><Logo></Logo></Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {links}
    </ul>
  </div>
  <div className="navbar-end">
    {loading ? <ScaleLoader color="#191186" /> :
            (user ? (
              <div className='flex justify-between items-center gap-3'>
                <div className="dropdown dropdown-end z-50 ">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-9 border-2 border-gray-300 rounded-full">
                      <img
                        alt="Tailwind CSS Navbar component"
                        referrerPolicy="no-referrer"
                        src={user.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                      />
                    </div>
                  </div>
                  <ul
                    tabIndex="-1"
                    className="menu  menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow space-y-2"
                  >
                    <div className=" pb-3 border-b border-b-gray-200">
                      <li className="text-sm font-bold">{user?.displayName}</li>
                      <li className="text-xs">{user?.email}</li>
                    </div>
                    <li className="mt-1">
                      <Link to={"/myProfile"}>
                        <CgProfile /> My Profile
                      </Link>
                    </li>
                  </ul>
                </div>
                <button onClick={handleSignOut} className='btn btn-primary'>Logout</button>
              </div>
            ) :

              (<div className='flex justify-between items-center gap-3'>
                <Link to={'/auth/login'} className='btn btn-primary'>Login</Link>
                <Link to={'/auth/register'} className='btn border-secondary text-secondary '>Register</Link>
              </div>)

            )}
  </div>
</div>
    );
};

export default Navbar;