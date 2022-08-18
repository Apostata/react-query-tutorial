import {  useMemo } from "react"
// import { getSuperHeroById } from '../../services/superHeroes.service'
// import {useQuery} from 'react-query'
import {useSuperHeroDetailsQuery} from '../../hooks/SuperHeroesQuerys'

export const useSuperHeroDetails = (id)=>{
    const {data:res, isLoading, error} = useSuperHeroDetailsQuery(id)
    // const {data:res, isLoading, error} = useQuery('superHeroeDetails', ()=>getSuperHeroById(id), {})
    const value = useMemo(()=> ({
        superHero: res?.data,
        loading: isLoading,
        error:error?.message,
    }),[res, isLoading, error])

    return value;
}