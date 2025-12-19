import React from 'react';
import pageNotFound from '../../assets/404 Page.json'
import Lottie from 'lottie-react';
const ErrorElement = () => {
    return (
        <div className='flex justify-center items-center min-h-screen space-y-10'>
           <Lottie
           animationData={pageNotFound}
           loop={true}
           style={{ width: 800, height: 800 }}
           />
        </div>
    );
};


export default ErrorElement;