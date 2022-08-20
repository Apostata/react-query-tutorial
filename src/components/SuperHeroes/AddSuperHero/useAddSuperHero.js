import { useMemo, useCallback, useRef } from "react"
import { useSuperHeroAddMutation } from "../../../hooks/SuperHeroesQuerys"

export const useAddSuperHero = ()=>{
    const nameRef = useRef(null)
    const alterEgoRef = useRef(null)
    
    const onMutateAdd = useCallback(async(queryClient, newHero)=>{
        await queryClient.cancelQueries('superHeroes')
        const previousData = queryClient.getQueryData('superHeroes')

        queryClient.setQueryData('superHeroes', (oldResponse)=>{
            console.log(oldResponse)
           return  {
                ...oldResponse,
                data:[...oldResponse?.data, {id:oldResponse?.data?.length + 1, ...newHero}]
            }
        })  
        return {
            previousData
        }
    },[])

    const onErrorAdd = useCallback((queryClient, error, hero, context)=>{
        console.log(error, hero)
        queryClient.setQueryData('superHeroes', context.previousData)
    },[])

    const onSettledAdd = useCallback((queryClient)=>{
        queryClient.invalidateQueries('superHeroes')
    },[])

    const {mutate:postHero, isLoading, error} = useSuperHeroAddMutation( onMutateAdd, onErrorAdd, onSettledAdd)

    const addHero = useCallback(()=>{
        const payload = {name:nameRef?.current.value, alterEgo:alterEgoRef?.current.value}
        postHero(payload)
    },[postHero])

    const value = useMemo(()=>({
        loading:isLoading,
        error: error?.message,
        addHero,
        nameRef,
        alterEgoRef,
    }),[ isLoading, error, addHero])

    return value
}