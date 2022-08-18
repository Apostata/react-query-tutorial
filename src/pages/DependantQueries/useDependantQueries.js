import { useMemo } from 'react';
import {useSearchParams} from 'react-router-dom'
import {useUserDetailsQuery} from '../../hooks/UsersQueries'
import { useChannelDetailsQuery } from '../../hooks/ChannelsQueries';

export const useDependantQueries = ()=>{
    const searchParams = useSearchParams()[0];
    const email =  searchParams.get('email')
    const {data:resUser, isLoading:isLoadingUser, error:errorUser} = useUserDetailsQuery(email)
    const {data:resChannel, isLoading:isLoadingChannel, error:errorChannel} = useChannelDetailsQuery(resUser?.data.channelId)

    const value = useMemo(()=> ({
        user: resUser?.data,
        loadingUser: isLoadingUser, 
        errorUser:errorUser?.message,
        channel: resChannel?.data,
        loadingChannel:isLoadingChannel,
        errorChannel:errorChannel?.message
    }),[resUser, isLoadingUser, errorUser, resChannel, isLoadingChannel, errorChannel])

    return value
}