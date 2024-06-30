
import { Outlet, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { useEffect } from 'react'

const PrivateRoute = () => {
    const navigate = useNavigate()
    useEffect(()=>{
        const user = useAuth()
        if(!user){
            navigate('/signin')
        }
    },[])
    
    
    return (
        <Outlet />
    )
}

export default PrivateRoute