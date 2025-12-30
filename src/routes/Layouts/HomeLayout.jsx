import React from 'react';
import Navbar from '../../Components/Home/Navbar';
import { Outlet } from 'react-router';
import Footer from '../../Components/Home/Footer';
import LoadingPage from '../../Page/Utility/LoadingPage';

const HomeLayout = () => {
    return (
        <div className='mx-auto'>
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

export default HomeLayout;