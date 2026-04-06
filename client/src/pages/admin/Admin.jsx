import React from 'react'
import { Outlet } from "react-router-dom";

const Admin = () => {
    return (


        <div className="flex-1">
            <Outlet />
        </div>
    )
}

export default Admin
