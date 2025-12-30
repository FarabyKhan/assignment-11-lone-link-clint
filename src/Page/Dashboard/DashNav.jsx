import React from 'react';
import useAuth from '../../useHooks/useAuth';
import { Link } from 'react-router';
import { ScaleLoader } from 'react-spinners';
import { CgProfile } from 'react-icons/cg';
import Logo from '../../Components/Home/Logo';
import { GiHamburgerMenu } from 'react-icons/gi';

const DashNav = () => {
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


    return (
        <div className="navbar bg-gradient-to-b from-[#3372E2] to-[#8FD0F4] shadow-sm px-10">
  <div className="navbar-start">
    <label
        htmlFor="my-drawer-4"
        aria-label="open sidebar"
        className="btn btn-square btn-ghost text-xl"
      >
        <GiHamburgerMenu size={22} />
      </label>
  <Link to={"/"}><a className="btn btn-ghost text-xl"><Logo></Logo>
  <span></span></a></Link>
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

export default DashNav;