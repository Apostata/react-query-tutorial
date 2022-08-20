import React from 'react'
import { useInfinitePagination } from './useInfinitePagination'
import ColorItem from '../../components/Colors/ColorItem'

const InfinitePagination = () => {
    const {colors, loadingColors, errorColors, fetchingColors, hasNextPage, fetchNextPage,} = useInfinitePagination()
    return (
      
      <div>
          <h2>Colors Infinite Pagination</h2>
          {loadingColors && <div>loading...</div>}
          {errorColors && <div>{errorColors}</div>}
          {(!loadingColors && !errorColors && colors) && 
              colors?.map((group)=>
                group?.data?.map((color)=>
                  <ColorItem key={`color-${color.id}-${Math.random()}`} color={color}/>
                )
              )
          }
          <div>
            <button onClick={fetchNextPage} disabled={!hasNextPage}>Load More</button>
          </div>
          {fetchingColors && 'buscando da api'}
          
      </div>
    )
}

export default InfinitePagination