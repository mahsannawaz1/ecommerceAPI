
import { Outlet, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const PrivateRoute = () => {
    const navigate = useNavigate()
    const user = useAuth()
    if(!user){
        navigate('/signin')
    }
    return (
        <Outlet />
    )
}

export default PrivateRoute