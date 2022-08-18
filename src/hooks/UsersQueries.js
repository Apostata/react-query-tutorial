import { getUsers, getUserById } from '../services/users.service'
import {useQuery} from 'react-query'

export const useUserDetailsQuery = (id)=>{
    return useQuery(['user', id], ()=>getUserById(id), {
        refetchOnWindowFocus:false,
    })
}

export const useUsersQuery = (onSuccess, onError)=>{
    return useQuery('users', getUsers, {
        refetchOnWindowFocus:false,
        onSuccess,
        onError,
    })
}
