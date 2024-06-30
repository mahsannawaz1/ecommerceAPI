
import User from "../interfaces/User"


export interface Action{
    type: 'SET'
    user:User
}

const userReducer = (state:User,action:Action) : User => {    
    if(action.type ==='SET')
        return action.user
    return state
}

export default userReducer