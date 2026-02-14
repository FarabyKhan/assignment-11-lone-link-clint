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
import PrivateRoutes from './PrivateRoutes';
import DashboardLayout from './Layouts/DashboardLayout';
import AllLoan from '../Page/Dashboard/AllLoan';
import AddLoan from '../Page/Dashboard/AddLoan';
import LoanDetails from '../Page/LoanDetails';
import LoanApply from '../Page/LoanApply';
import ManageUsers from '../Page/Dashboard/Admin/ManageUsers';

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
                },
            {
                path:"/loan-details/:_id",
                element:<PrivateRoutes>
                    <LoanDetails></LoanDetails>
                </PrivateRoutes>
            },
            {
                path:"/loan-apply/:_id",
                element:<PrivateRoutes>
                    <LoanApply></LoanApply>
                </PrivateRoutes>
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
           path:"/dashboard",
           element: <PrivateRoutes>
            <DashboardLayout></DashboardLayout>
           </PrivateRoutes>,
           children:[
            {
          path: "/dashboard/all-loan",
          element: <AllLoan></AllLoan>
        },
        {
            path:"/dashboard/add-loan",
            element:<AddLoan></AddLoan>
        },
        {
            path:"/dashboard/manage-users",
            element:<ManageUsers></ManageUsers>
        },
           ]
           
        },
        
        {
            path:'/*',
            element:<ErrorElement></ErrorElement>
        }

])

export default router;