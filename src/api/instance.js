import axios from 'axios'
export default axios.create({
    baseURL: 'https://finance-47cbb-default-rtdb.firebaseio.com/'
})