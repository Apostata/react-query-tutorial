import { getSuperHeroById, getSuperHeroes, postSuperHero } from '../services/superHeroes.service'
import {useQuery, useQueries, useQueryClient, useMutation} from 'react-query'

export const useSuperHeroDetailsQuery = (id)=>{
    const queryClient = useQueryClient()
    return useQuery(['superHeroeDetails', id], ()=>getSuperHeroById(id), {
        refetchOnWindowFocus:false,
        initialData: ()=>{
            const hero = queryClient.getQueryData('superHeroes')?.data.find((hero)=>hero.id === parseInt(id))
            return hero ? {data:hero} : undefined
        }
    })
}

export const useSuperHeroesQuery = (onSuccess, onError)=>
     useQuery('superHeroes', getSuperHeroes, {
        refetchOnWindowFocus:false,
        onSuccess,
        onError,
        
    })


export const useParralelSuperHeroQuery = (ids)=>
    useQueries(
        ids?.map((id)=>({
            queryKey: ['super-hero', id],
            queryFn: ()=> getSuperHeroById(id)
        }))
    )

export const useSuperHeroAddMutation = (onMutateCallback, onErrorCallback, onSettledCallback) =>{
    const queryClient = useQueryClient()
    return useMutation(postSuperHero, {
        onMutate:(newHero)=>onMutateCallback(queryClient, newHero),
        onerror:(error, hero, context)=>onErrorCallback(queryClient, error, hero, context),
        onSettled:()=>onSettledCallback(queryClient)
    })
}
