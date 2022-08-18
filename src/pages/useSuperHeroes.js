import {  useMemo } from "react"
import { useSuperHeroesQuery } from "../hooks/SuperHeroesQuerys"
//Este é um exmplo da página usando react-query
export const useSuperHeroes = ()=>{

    const onSuccess = (data)=>{
        console.log('success callback', data)
    }

    const onError = (data) =>{
        console.log('error callback', data)
    }


    const {data:res, isLoading, error} = useSuperHeroesQuery(onSuccess, onError)
    const value = useMemo(()=> ({
        superHeroes: res?.data,
        loadingSuperHeroes: isLoading, 
        errorSuperHeroes:error?.message,
    }),[res, isLoading, error])

    return value;
}