import React from 'react';
import pageNotFound from '../../assets/404 Page.json'
import Lottie from 'lottie-react';
import { Link } from 'react-router';
const ErrorElement = () => {
    return (
        <div className='flex flex-col justify-center items-center min-h-screen space-y-10'>
           <Lottie
           animationData={pageNotFound}
           loop={true}
           style={{ width: 800, height: 500 }}
           />
           <Link to={'/'} className='btn btn-primary my-3'>Back To Home</Link>
        </div>
        
    );
};


export default ErrorElement;