import axios from 'axios'

export const defaultAxiosRequest = axios.create({
	baseURL: 'https://coffee-shop-backend-main.onrender.com/api',
})

axios.defaults.headers.options = {
	"Content-Type":"application/json"
}