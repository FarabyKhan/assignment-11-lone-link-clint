import React, { useEffect, useState } from 'react';
import LoadingAm from './LoadingAm';

const LoadingPage = ({children}) => {
   const[loading, setLoading]= useState(true)
    
        useEffect(()=>{
            const timer = setTimeout(()=> setLoading(false),1500)
            return()=> clearTimeout(timer)
        },[])

        if(loading){
           return <LoadingAm/>
            }
            
            return<>
            {children}
            </>
};

export default LoadingPage;