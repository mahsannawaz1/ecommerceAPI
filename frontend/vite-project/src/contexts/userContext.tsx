import React from "react";
import User from "../interfaces/User";
import { Action } from "../reducers/userReducer";

interface UserContextType{
    user:User,
    dispatch:React.Dispatch<Action>
}

const UserContext = React.createContext<UserContextType>({} as UserContextType)
export default UserContext