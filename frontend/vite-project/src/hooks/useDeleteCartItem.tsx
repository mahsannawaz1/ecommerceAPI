import axios from 'axios'

const useDeleteCartItem = (productId:string,color:string,size:string) => {
    const cart = localStorage.getItem('cart')
    if(cart){
        
        const { _id:cartId } = JSON.parse(cart)
        return axios.delete('http://localhost:3000/api/cart',{ 
            data:{
                cartId,
                productId,
                color,
                size
            }
        })
        .then(res=>res.data)
        .catch( err => { 
            throw err.response.data.error
        } )
    }
}

export default useDeleteCartItem