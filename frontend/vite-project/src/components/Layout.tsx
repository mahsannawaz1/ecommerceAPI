
import { Outlet } from 'react-router-dom'
import NavBar from './NavBar'



const Layout = () => {
    return (
        <>
        <NavBar />
        {/* <Banner /> */}
        {/* <Main  /> */}
        {/* <ProductListPage /> */}
        {/* {<ProductDetail />} */}
        {<Outlet />}
        </>
    )
}

export default Layout