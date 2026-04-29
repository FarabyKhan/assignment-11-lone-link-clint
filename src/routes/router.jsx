import React from 'react';
import { createBrowserRouter } from 'react-router';
import HomeLayout from './Layouts/HomeLayout';
import Home from '../Components/Home/Home';
import AuthLayout from './Layouts/AuthLayout';
import Login from '../Page/Login';
import Register from '../Page/Register';
import LoadingPage from '../Page/Utility/LoadingPage';
import AllLoans from '../Components/AllLoans';
import PrivateRoutes from './PrivateRoutes';
import DashboardLayout from './Layouts/DashboardLayout';
import AllLoan from '../Page/Dashboard/AllLoan';
import AddLoan from '../Page/Dashboard/AddLoan';
import LoanDetails from '../Page/LoanDetails';
import LoanApply from '../Page/LoanApply';
import ManageUsers from '../Page/Dashboard/Admin/ManageUsers';
import UpdatesLoan from '../Page/Dashboard/UpdatesLoan';
import PendingLoan from '../Page/Dashboard/Manager/PendingLoan';
import LoanApplications from '../Page/Dashboard/Admin/LoanApplications';
import ErrorElement from '../Page/Utility/ErrorElement';
import ApprovedLoan from '../Page/Dashboard/Manager/ApprovedLoan';
import ManageLoans from '../Page/Dashboard/Manager/ManageLoans';
import ManagerProfile from '../Page/Dashboard/Manager/ManagerProfile';
import ErrorElement2 from '../Page/Utility/ErrorElement2';
import MyLoans from '../Page/Dashboard/User/MyLoans';
import PaymentSuccess from '../Page/Dashboard/PaymentSuccess';
import PaymentCancel from '../Page/Dashboard/PaymentCancel';
import RoleProtectiveRoutes from './RoleProtectiveRoutes';





export const router = createBrowserRouter([
    {
        path: "/",
        Component: HomeLayout,
        hydrateFallbackElement: <LoadingPage></LoadingPage>,
        errorElement: <ErrorElement2></ErrorElement2>,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: "/all-loans",
                Component: AllLoans
            },
            {
                path: "/loan-details/:_id",
                element: <PrivateRoutes>
                    <LoanDetails></LoanDetails>
                </PrivateRoutes>
            },
            {
                path: "/loan-apply/:_id",
                element: <PrivateRoutes>
                    <LoanApply></LoanApply>
                </PrivateRoutes>
            }

        ]
    },
    {
        path: "/auth",
        Component: AuthLayout,
        children: [
            {
                path: "/auth/login",
                Component: Login
            },
            {
                path: "/auth/register",
                Component: Register
            },
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoutes>
            <DashboardLayout></DashboardLayout>
        </PrivateRoutes>,
        children: [
            {
                path: "/dashboard/all-loan",
                element: <RoleProtectiveRoutes allowedRoles={['admin']}>
                    <AllLoan></AllLoan>
                </RoleProtectiveRoutes>
            },
            {
                path: "/dashboard/add-loan",
                element: <RoleProtectiveRoutes allowedRoles={['manager']}>
                            <AddLoan></AddLoan>
                         </RoleProtectiveRoutes>
                
                
            },
            {
                path: "/dashboard/loan-applications",
                element: <RoleProtectiveRoutes allowedRoles={['admin']}>
                    <LoanApplications></LoanApplications>
                </RoleProtectiveRoutes>
            },
            {
                path: "/dashboard/manage-users",
                element: <RoleProtectiveRoutes allowedRoles={['admin']}>
                    <ManageUsers></ManageUsers>
                </RoleProtectiveRoutes>
            },
            {
                path: "/dashboard/all-loans",
                element: <AllLoans></AllLoans>
            },
            {
                path: "/dashboard/updates-loan/:id",
                element: <UpdatesLoan></UpdatesLoan>
            },
            {
                path: "/dashboard/pending-loan",
                element: <RoleProtectiveRoutes allowedRoles={['manager']}>
                    <PendingLoan></PendingLoan>
                </RoleProtectiveRoutes>
            },
            {
                path: "/dashboard/approved-loan",
                element: <RoleProtectiveRoutes allowedRoles={['manager']}>
                    <ApprovedLoan></ApprovedLoan>
                </RoleProtectiveRoutes>
            },
            {
                path: "/dashboard/manage-loans",
                element: <RoleProtectiveRoutes allowedRoles={['manager']}>
                    <ManageLoans></ManageLoans>
                </RoleProtectiveRoutes>
            },
            {
                path: "/dashboard/manage-profile",
                element: <RoleProtectiveRoutes allowedRoles={['manager']}>
                    <ManagerProfile></ManagerProfile>
                </RoleProtectiveRoutes>
            },
            {
                path: "/dashboard/my-loans",
                element: <RoleProtectiveRoutes allowedRoles={['borrower']}>
                    <MyLoans></MyLoans>
                </RoleProtectiveRoutes>
            },
            
            {
                path: "/dashboard/payment-success",
                element: <PaymentSuccess></PaymentSuccess>
            },
            {
                path: "/dashboard/payment-cancelled",
                element: <PaymentCancel></PaymentCancel>
            },
        ]

    },

    {
        path: '/*',
        element: <ErrorElement></ErrorElement>
    }

])

export default router;