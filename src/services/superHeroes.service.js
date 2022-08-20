// import axios from 'axios'
import { axiosClient } from '../utils/axiosInstance'

export const getSuperHeroes = ()=>{
    // return axios.get('http://localhost:4000/superHeroes')
    return axiosClient({url:'/superHeroes'})
}

export const getSuperHeroById = (id)=>{
    // return axios.get(`http://localhost:4000/superHeroes/${id}`)
    return axiosClient({url:`/superHeroes/${id}`})
}

export const postSuperHero = (data)=>{
    // return axios.post(`http://localhost:4000/superHeroes`, data)
    return axiosClient({url:'/superHeroes', method:'POST', data})
}