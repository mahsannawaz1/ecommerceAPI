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
        console.log(cart_id)
        axios.put('http://localhost:3000/api/cart',{ 
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
        }).catch( err => err )
    }
}

export default useAddToCart