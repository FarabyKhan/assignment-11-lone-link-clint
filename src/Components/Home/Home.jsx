import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router';
import Footer from './Footer';
import HeroSlider from '../HeroSlider';
import LatestLoans from './LatestLoans';

const Home = () => {
    return (
        <div className='mx-auto'>
            <HeroSlider></HeroSlider>
            <main >
                <LatestLoans></LatestLoans>
            </main>
        </div>
    );
};

export default Home;