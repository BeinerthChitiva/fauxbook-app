import {Outlet, Navigate} from 'react-router-dom'
import { AuthContext } from '../context/auth'
import { useContext } from "react";

const ProtectedRoutes = () => {
    const {user} = useContext(AuthContext)

    return(
        //I think my case is backwards, if mf is logged in, redirect to Home
        user ? <Navigate to ="/" />: <Outlet/>
        //user ? <Outlet/> : <Navigate to ="/" />
    )
}

export default ProtectedRoutes