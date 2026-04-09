import React from 'react';
import LoadingPage from '../../Page/Utility/LoadingPage';
import { Outlet } from 'react-router';
import Footer from '../../Components/Home/Footer';
import Navbar from '../../Components/Home/Navbar';

const AuthLayout = () => {
    return (
       <div className='mx-auto px-10'>
            <LoadingPage>
                <Navbar></Navbar>
            <main className='min-h-screen mx-auto' style={{backgroundImage:"url('/login-bg.jpg')",
                backgroundSize:"cover",
                backgroundPosition:"center",
            }}>
                <Outlet></Outlet>
            </main>
            
            </LoadingPage>
        </div>
    );
};

export default AuthLayout;