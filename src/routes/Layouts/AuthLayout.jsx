import React from 'react';
import LoadingPage from '../../Page/Utility/LoadingPage';
import Navbar from '../../Components/Home/Navbar';
import { Outlet } from 'react-router';
import Footer from '../../Components/Home/Footer';

const AuthLayout = () => {
    return (
       <div className='mx-auto px-10'>
            <LoadingPage>
               <Navbar></Navbar>
            <main className='min-h-screen mx-auto'>
                <Outlet></Outlet>
            </main>
            <Footer></Footer>
            </LoadingPage>
        </div>
    );
};

export default AuthLayout;