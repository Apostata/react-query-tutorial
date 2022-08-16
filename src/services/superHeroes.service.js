import axios from 'axios'

export const getSuperHeroes = ()=>{
    return axios.get('http://localhost:4000/superheroes')
}