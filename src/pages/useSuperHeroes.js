import {  useCallback, useMemo } from "react"
import { useSuperHeroesQuery } from "../hooks/SuperHeroesQuerys"

export const useSuperHeroes = ()=>{

    const onSuccess = useCallback((data)=>{
        console.log('success callback', data)
    },[])

    const onError = useCallback((data) =>{
        console.log('error callback', data)
    },[])

    const {data:res, isLoading, error} = useSuperHeroesQuery(onSuccess, onError)

    const value = useMemo(()=> ({
        superHeroes: res?.data,
        loadingSuperHeroes: isLoading, 
        errorSuperHeroes:error?.message,
    }),[res, isLoading, error])

    return value;
}