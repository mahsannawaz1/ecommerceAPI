
const userAuth = () => {
    const token = localStorage.getItem('Authorization')
    return token ? token : ''
}

export default userAuth