import React from 'react';
import Navbar from '../../Components/Home/Navbar';
import { Outlet } from 'react-router';
import Footer from '../../Components/Home/Footer';

const HomeLayout = () => {
    return (
        <div className='mx-auto'>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default HomeLayout;