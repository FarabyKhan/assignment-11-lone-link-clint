import React from 'react';
import useAuth from '../useHooks/useAuth';
import { Navigate, useLocation } from 'react-router';
import LoadingPage from '../Page/Utility/LoadingPage';

const PrivateRoutes = ({children}) => {
   const{user, loading} = useAuth()

    const location = useLocation()
    
    

    if(loading){
        return <div className='min-h-auto mx-auto'>
                <LoadingPage></LoadingPage>
        </div>
    }

    if(!user){
        return <Navigate to={'/auth/login'} state={{ from:location }} replace></Navigate>
    }

    return children
};

export default PrivateRoutes;