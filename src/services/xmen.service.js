import axios from 'axios'

export const getXmen = ()=>{
    return axios.get('http://localhost:4000/xmen')
}

export const getXmenById = (id)=>{
    return axios.get(`http://localhost:4000/xmen/${id}`)
}