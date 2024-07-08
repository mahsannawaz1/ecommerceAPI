import  { Fragment } from 'react'
import ShoppingCart from './ShoppingCart'
import CartCheckout from './CartCheckout'
import { CartItem } from './Cart'
import { CartMessageInterface } from '../interfaces/CartMessageInterface'
interface Props{
    cartItems:CartItem[],
    total:number
    onChangeMessage:(value:CartMessageInterface)=>void,
    onHandlePhaseChange:(value:number)=>void
}
const Bag = ({cartItems,onChangeMessage,onHandlePhaseChange}:Props) => {
    const total = cartItems?.reduce((accumulator,item)=>accumulator + (item.qty * item.unit_price),0)
    return (
        <Fragment>
                        <ShoppingCart cartItems={cartItems ?? []} onChangeMessage={onChangeMessage}  />
                        <CartCheckout totalAmount={total || 0} onHandlePhaseChange={onHandlePhaseChange}  />
        </Fragment>
    )
}

export default Bag