import React from 'react';
import loadingAn from '../../assets/Loading sand clock.json'
import Lottie from 'lottie-react';
const LoadingAm = () => {
   return (
        <div className='flex justify-center items-center min-h-screen space-y-10'>
           <Lottie
           animationData={loadingAn}
           loop={true}
           style={{ width: 800, height: 800 }}
           />
        </div>
    );
};

export default LoadingAm;