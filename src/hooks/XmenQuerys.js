import { getXmen, getXmenById } from '../services/xmen.service'
import {useQuery} from 'react-query'

export const useXmenDetailsQuery = (id)=>{
    return useQuery('xmenDetails', ()=>getXmenById(id), {
        refetchOnWindowFocus:false,
    })
}

export const useXmenQuery = (onSuccess, onError)=>{
    return useQuery('xmen', getXmen, {
        refetchOnWindowFocus:false,
        onSuccess,
        onError,
    })
}