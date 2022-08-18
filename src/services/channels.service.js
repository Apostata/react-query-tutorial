import axios from 'axios'

export const getChannels = ()=>{
    return axios.get('http://localhost:4000/channels')
}

export const getChannelById = (id)=>{
    return axios.get(`http://localhost:4000/channels/${id}`)
}