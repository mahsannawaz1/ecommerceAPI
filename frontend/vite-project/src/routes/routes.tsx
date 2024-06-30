import {createBrowserRouter} from 'react-router-dom'
import Layout from '../components/Layout'
import ProductDetail from '../components/ProductDetail'
import Main from '../components/Main'
import ProductListPage from '../components/ProductListPage'
import { Cart } from '../components/Cart'
import Signup from '../components/Signup'
import SignIn from '../components/SignIn'
import VerificationRequired from '../components/VerificationRequired'
import VerifiedEmail from '../components/VerifiedEmail'
import ForgotPasswordEmail from '../components/ForgotPasswordEmail'
import ResetPassword from '../components/ResetPassword'

import MyAccount from '../components/MyAccount'
import MyOrders from '../components/MyOrders'
import ContactDetails from '../components/ContactDetails'
import AddressBook from '../components/AddressBook'
import PrivateRoute from '../components/PrivateRoute'
import Profile from '../components/Profile'


export const routes = createBrowserRouter([
    {
        path:'/',
        element:<Layout />,
        children:[

            { index:true,element: <Main /> },
            { path:'cart',element: <Cart /> },
            {
        element:<PrivateRoute />,
        children:[
            { path:'profile',element: <Profile />,children:[
                { path:'', element:<MyAccount /> },
                { path:'orders', element:<MyOrders /> },
                { path:'contact', element:<ContactDetails /> },
                { path:'address', element:<AddressBook /> }
            ] },
        ]
        },
            { path:'signup',element: <Signup /> },
            { path:'user/verify',element: <VerificationRequired /> },
            { path:'user/complete',element: <VerifiedEmail /> },
            { path:'signin',element: <SignIn /> },
            { path:'signin/forgotPassword',element: <ForgotPasswordEmail /> },
            { path:'signin/reset',element: <ResetPassword /> },
            { path:'shop-men',element: <ProductListPage category='men'/> },
            { path:'shop-women',element: <ProductListPage category='women'/> },
            { path:'shop-junior-boys',element: <ProductListPage category='junior boys'/> },
            { path:'shop-junior-girls',element: <ProductListPage category='junior girls'/> },
            { path:'shop-toddler-boys',element: <ProductListPage category='toddler boys'/> },
            { path:'shop-toddler-girls',element: <ProductListPage category='toddler girls'/> },
            { path:'dapperlane/:id',element: <ProductDetail /> }
        ]
    },
    
])
