import axios from 'axios'

const todosAPI = axios.create({
    baseURL: 'https://fullstack-todo-api.herokuapp.com/api/'
})

export default todosAPI
