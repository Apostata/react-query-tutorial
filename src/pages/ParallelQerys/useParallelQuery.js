import { useMemo } from 'react'
import {useParralelSuperHeroQuery} from '../../hooks/SuperHeroesQuerys'
import {useSearchParams} from 'react-router-dom'

export const useParallelQuerys = ()=>{
    const searchParams = useSearchParams()[0];
    const ids =  searchParams.get('heroIds').trim().split(',')
    const results = useParralelSuperHeroQuery(ids)
    const value = useMemo(()=>({
        results
    }),[results])

    return value
}