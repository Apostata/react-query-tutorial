import { useCallback, useMemo, useEffect, useState } from "react"
import {getSuperHeroes} from '../services/superHeroes.service'
export const useSuperHeroes = ()=>{
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)

    const getAllHeroes = useCallback(async ()=>{
        if(data === null && loading){
            console.log('getSuper')

            try{
                const res = await getSuperHeroes()
                setData(res.data)
            } catch(e){
                console.log(e)
            } finally{
                setLoading(false)
            }
        }
    },[loading,data,  setData])

    useEffect(()=>{
        if(data === null){
            setLoading(true)
            getAllHeroes()
        }
    },[getAllHeroes])

    const value = useMemo(()=>({
        superHeroes: data,
        loading
    }),[data, loading])

    return value;
}