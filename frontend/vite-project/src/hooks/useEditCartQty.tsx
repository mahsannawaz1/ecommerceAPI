import axios from 'axios'

const useAddToCart = (
    product:{
    id:string,
    sku:string,
    name:string
    image:string,
    color:string,
    size:string
    },
    qty:number,
    unit_price:number
) => {
    const cart = localStorage.getItem('cart')
    if(cart){
        
        const { _id:cart_id } = JSON.parse(cart)
        return axios.put('http://localhost:3000/api/cart/edit',{ 
            cart_id,
            product:{
                id:product?.id,
                name:product?.name,
                sku:product?.sku,
                size:product.size,
                color:product.color,
                image:product?.image
            },
            qty,
            unit_price
        })
        .then(res=>res.data)
        .catch( (err) => { 
            throw err.response.data.error 
        } )
    }
}

export default useAddToCart