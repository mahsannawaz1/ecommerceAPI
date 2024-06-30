import React from "react";
import User from "../interfaces/User";

interface UserContextType{
    user:User
}

const UserContext = React.createContext<UserContextType>({} as UserContextType)
export default UserContext