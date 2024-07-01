import React from "react";
import { AuthAction } from "../reducers/authReducer";


interface AuthContextType{
    isUser:boolean,
    dispatch:React.Dispatch<AuthAction>
    
}

const AuthContext = React.createContext<AuthContextType>({} as AuthContextType)
export default AuthContext