import React from 'react'
import useRole from '../useHooks/useRole'
import { Navigate, useLocation } from 'react-router'
import LoadingAm from '../Page/Utility/LoadingAm'

const RoleProtectiveRoutes = ({allowedRoles, children}) => {

    const{role, roleLoading} = useRole()
    const location = useLocation()

    if(!role || !allowedRoles.includes(role)){

        if(role === 'admin') return <Navigate to={'/dashboard/manage-users'}/>
        if(role === 'manager') return <Navigate to={'/dashboard/manage-profile'}/>
        if(role === 'borrower') return <Navigate to={'/dashboard/my-loans'}/>


        return(
            <Navigate to={'/'}/>
        );
    }

    if(roleLoading)
        return <LoadingAm/>

  return children
  
}

export default RoleProtectiveRoutes
