import {  useMemo, useState } from "react"
import { useColorsQuery } from "../../hooks/ColorsQueries"

export const usePagination = ()=>{
    const [page, setPage] = useState(1)
    const size = useState(2)[0]
    const {data:res, isLoading, error, isFetching} = useColorsQuery(page)
    const value = useMemo(()=> ({
        colors: res?.data,
        loadingColors: isLoading, 
        errorColors:error?.message,
        fetchingColors: isFetching,
        page,
        setPage,
        size,
        total: Number(res?.headers?.['x-total-count']||0)
    }),[res, isLoading, error, isFetching, page, setPage, size])

    return value;
}