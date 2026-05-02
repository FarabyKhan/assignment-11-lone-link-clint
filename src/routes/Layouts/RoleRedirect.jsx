import React from 'react'
import useRole from '../../useHooks/useRole'
import LoadingAm from '../../Page/Utility/LoadingAm'
import { Navigate } from 'react-router'

const RoleRedirect = () => {

    const{role, roleLoading} = useRole()

    if(roleLoading)
        return <LoadingAm/>

    if (role === 'admin') {
        return <Navigate to={"/dashboard/manage-users"} replace/>
    }

    if (role === 'manager') {
        return <Navigate to={"/dashboard/manage-profile"} replace/>
    }

    if (role === 'borrower') {
        return <Navigate to={"/dashboard/user-profile"} replace/>
    }

  return <Navigate to={'/'} replace />
}

export default RoleRedirect
