import axios from 'axios'

export const getSuperHeroes = ()=>{
    return axios.get('http://localhost:4000/superHeroes')
}

export const getSuperHeroById = (id)=>{
    return axios.get(`http://localhost:4000/superHeroes/${id}`)
}