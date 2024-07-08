export interface CartLengthAction{
    type: 'SET',
    length:number
}
const cartLengthReducer = (state:number,action:CartLengthAction) => {
    if(action.type==='SET')
        return action.length
    return state
}

export default cartLengthReducer