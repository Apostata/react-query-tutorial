import { getColors, getColorById, getColorsPageParams } from '../services/colors.service'
import { useQuery, useInfiniteQuery } from 'react-query'

export const useColorDetailsQuery = (id)=>{
    return useQuery(['color', id], ()=>getColorById(id), { enabled: !!id, refetchOnWindowFocus:false,})
}

export const useColorsQuery = (page)=>{
    return useQuery(['colors', page], ()=>getColors(page), {
        refetchOnWindowFocus:false,
        keepPreviousData: true
    })
}

export const useColorsQueryInfinite = (size)=>{
    console.log('useColorsQueryInfinite')
    return useInfiniteQuery(['colorsInfinite'], getColorsPageParams, {
        refetchOnWindowFocus:false,
        getNextPageParam:(_lastPage, pages)=>{
            const total = Number(_lastPage?.headers?.['x-total-count'] || 0)
            if((total > size * pages?.length)){
                return pages?.length + 1
            }else{
                return undefined
            }
        }
    })
}
