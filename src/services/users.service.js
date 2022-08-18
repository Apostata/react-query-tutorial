import axios from 'axios'

export const getUsers = ()=>{
    return axios.get('http://localhost:4000/users')
}

export const getUserById = (id)=>{
    return axios.get(`http://localhost:4000/users/${id}`)
}