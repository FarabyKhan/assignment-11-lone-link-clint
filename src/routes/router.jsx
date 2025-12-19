import React from 'react';
import { createBrowserRouter } from 'react-router';
import HomeLayout from './Layouts/HomeLayout';
import Home from '../Components/Home/Home';
import AuthLayout from './Layouts/AuthLayout';
import Login from '../Page/Login';
import Register from '../Page/Register';
import ErrorElement from '../Page/Utility/ErrorElement';
import ErrorElement2 from '../Page/Utility/ErrorElement2';
import LoadingPage from '../Page/Utility/LoadingPage';
import AllLoans from '../Components/AllLoans';

export const router = createBrowserRouter([
        {
            path: "/",
            Component:HomeLayout,
            hydrateFallbackElement:<LoadingPage></LoadingPage>,
            errorElement:<ErrorElement2></ErrorElement2>,
            children: [
                {
                 index:true,
                 Component: Home   
                },
                {
                    path:"/all-loans",
                    Component: AllLoans
                }
            ]
        },
        {
            path:"/auth",
            Component: AuthLayout,
            children:[
                {
                    path:"/auth/login",
                    Component: Login
                },
                {
                    path:"/auth/register",
                    Component: Register
                },
            ]
        },
        {
            path:'/*',
            element:<ErrorElement></ErrorElement>
        }

])

export default router;