import {  useMemo, useState } from "react"
import { useColorsQueryInfinite } from "../../hooks/ColorsQueries"

export const useInfinitePagination = ()=>{
    const size = useState(2)[0]
    const {data:res, isLoading, error, isFetching, hasNextPage, fetchNextPage} =  useColorsQueryInfinite(size)
    const value = useMemo(()=> ({
        colors: res?.pages,
        loadingColors: isLoading, 
        errorColors:error?.message,
        fetchingColors: isFetching,
        hasNextPage,
        fetchNextPage, 
    }),[res, isLoading, error, isFetching, hasNextPage, fetchNextPage])

    return value;
}