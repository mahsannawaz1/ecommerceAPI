import {Dispatch,createContext} from "react";
import { CartLengthAction } from "../reducers/cartLengthReducer";

interface CartLengthContextType{
    length:number,
    cartLengthDispatch:Dispatch<CartLengthAction>
}

const CartLengthContext = createContext<CartLengthContextType>({} as CartLengthContextType)
export default CartLengthContext