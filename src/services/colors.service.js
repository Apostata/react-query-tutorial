import axios from 'axios'

export const getColors = ( page=1, size=2)=>{
    return axios.get(`http://localhost:4000/colors?_limit=${size}&_page=${page}`)
}

export const getColorsPageParams = ( {pageParam=1}, size=2)=>{
    console.log(pageParam, size)
    return axios.get(`http://localhost:4000/colors?_limit=${size}&_page=${pageParam}`)
}

export const getColorById = (id)=>{
    return axios.get(`http://localhost:4000/colors/${id}`)
}