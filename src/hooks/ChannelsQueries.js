import { getChannels, getChannelById } from '../services/channels.service'
import {useQuery} from 'react-query'

export const useChannelDetailsQuery = (id)=>{
    return useQuery(['channel', id], ()=>getChannelById(id), { enabled: !!id, refetchOnWindowFocus:false,})
}

export const useChannelsQuery = (onSuccess, onError)=>{
    return useQuery('channels', getChannels, {
        refetchOnWindowFocus:false,
        onSuccess,
        onError,
    })
}
