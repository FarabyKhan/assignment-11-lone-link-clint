import React from 'react'
import useRole from '../useHooks/useRole'
import { Navigate } from 'react-router'
import LoadingAm from '../Page/Utility/LoadingAm'

const RoleProtectiveRoutes = ({ allowedRoles, children }) => {

    const { role, roleLoading } = useRole()

    if (roleLoading) {
        return <LoadingAm />
    }

    if (!role) {
        return <Navigate to={'/'} replace />
    }


    if (!allowedRoles.includes(role)) {

        if (role === 'admin') return <Navigate to={'/dashboard/manage-users'} replace />
        if (role === 'manager') return <Navigate to={'/dashboard/manage-profile'} replace />
        if (role === 'borrower') return <Navigate to={'/dashboard/user-profile'} replace />


        return (
            <Navigate to={'/'} replace />
        );
    }



    return children

}

export default RoleProtectiveRoutes
