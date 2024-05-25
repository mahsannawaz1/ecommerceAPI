import {createBrowserRouter} from 'react-router-dom'
import Layout from '../components/Layout'
import ProductDetail from '../components/ProductDetail'
import Main from '../components/Main'
import ProductListPage from '../components/ProductListPage'


export const routes = createBrowserRouter([
    {
        path:'/',
        element:<Layout />,
        children:[
            { index:true,element: <Main /> },
            { path:'shop-men',element: <ProductListPage category='men'/> },
            { path:'shop-women',element: <ProductListPage category='women'/> },
            { path:'shop-junior-boys',element: <ProductListPage category='junior boys'/> },
            { path:'shop-junior-girls',element: <ProductListPage category='junior girls'/> },
            { path:'shop-toddler-boys',element: <ProductListPage category='toddler boys'/> },
            { path:'shop-toddler-girls',element: <ProductListPage category='toddler girls'/> }
        ]
    }
])