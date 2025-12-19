import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router';
import Footer from './Footer';
import HeroSlider from '../HeroSlider';

const Home = () => {
    return (
        <div className='mx-auto'>
            <HeroSlider></HeroSlider>
        </div>
    );
};

export default Home;