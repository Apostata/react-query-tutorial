import { useCallback, useMemo, useEffect, useState } from "react"
import {getSuperHeroes} from '../services/superHeroes.service'

//Este é um exmplo da mesma funcionalidade
export const useSuperHeroes = ()=>{
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError]= useState('')

    const getAllHeroes = useCallback(async (onClick=true)=>{
        if((data === null && loading) || onClick){
            console.log('getSuper')

            try{
                const res = await getSuperHeroes()
                setData(res.data?.map((hero)=>hero.name))
                setError('')
            } catch(e){
                console.log(e)
                setError(e.message)
            } finally{
                setLoading(false)
            }
        }
    },[loading, data,  setData])

    useEffect(()=>{
        if(data === null && error ===''){
            setLoading(true)
            getAllHeroes(false)
        }
    },[getAllHeroes, data, error])

    const value = useMemo(()=>({
        superHeroes: data,
        loadingSuperHeroes: loading,
        errorSuperHeroes: error,
        getHeroes:getAllHeroes
    }),[data, loading, error, getAllHeroes])

    return value;
}