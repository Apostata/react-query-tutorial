import {  useMemo } from "react"
import { useXmenQuery } from "../hooks/XmenQuerys"
//Este é um exmplo da página usando react-query
export const useXmen = ()=>{

    const onSuccess = (data)=>{
        console.log('success callback', data)
    }

    const onError = (data) =>{
        console.log('error callback', data)
    }


    const {data:res, isLoading, error} = useXmenQuery(onSuccess, onError)
    const value = useMemo(()=> ({
        xmen: res?.data,
        loadingXmen: isLoading, 
        errorXmen:error?.message,
    }),[res, isLoading, error])

    return value;
}