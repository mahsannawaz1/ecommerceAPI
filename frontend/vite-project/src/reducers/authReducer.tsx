interface AuthSetAction{
    type: 'SET',
    token:string
}
interface AuthRemoveAction{
    type: 'REMOVE',
}
export type AuthAction = AuthSetAction | AuthRemoveAction
const authReducer = (state:boolean,action:AuthAction) => {

    if(action.type==='SET'){
        localStorage.setItem('Authorization',action.token)
        return true
    }
    else if(action.type==='REMOVE'){
        localStorage.removeItem('Authorization')
        return false
    }
    return state
}

export default authReducer