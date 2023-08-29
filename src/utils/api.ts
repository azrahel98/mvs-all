import axios from 'axios'

const httpService = axios.create({
	//baseURL: 'http://192.168.10.2:8080',
	baseURL: 'http://127.0.0.1:8080',
	timeout: 15000,
})

httpService.interceptors.request.use(function (config) {
	const token = localStorage.getItem('token')
	config.headers.token = token ? `${token}` : ''
	return config
})

export { httpService }
