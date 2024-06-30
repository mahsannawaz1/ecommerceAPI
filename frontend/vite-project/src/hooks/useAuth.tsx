
const useAuth = () => {
    const token = localStorage.getItem('Authorization')
    return token ? true : false
}

export default useAuth