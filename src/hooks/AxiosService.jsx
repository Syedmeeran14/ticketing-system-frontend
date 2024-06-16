import axios from "axios"

const AxiosService = axios.create({
    baseURL: "https://ticketing-system-backend-k09b.onrender.com"
})

AxiosService.interceptors.request.use(config => {
    const token = sessionStorage.getItem('token')
    if(config.authenticate && token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})


export default AxiosService