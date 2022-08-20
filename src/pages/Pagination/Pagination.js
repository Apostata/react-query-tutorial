import React from 'react'
import { usePagination } from './usePagination'
import ColorItem from '../../components/Colors/ColorItem'

const Pagination = () => {
    const {colors, loadingColors, errorColors, fetchingColors, page, setPage, size, total} = usePagination()
    return (
      <div>
          <h2>Colors Pagination</h2>
          {loadingColors && <div>loading...</div>}
          {errorColors && <div>{errorColors}</div>}
          {(!loadingColors && !errorColors && colors) && 
              colors.map((color)=><ColorItem key={`color-${color.id}-${Math.random()}`} color={color}/>)
          }
          <div>
            <button onClick={()=>setPage(page=>page-1)} disabled={page===1}>Prev Page</button>
            <button onClick={()=>setPage(page=>page+1)} disabled={page * size >= total}>Next Page</button>
          </div>
          {fetchingColors && 'buscando'}
      </div>
    )
}

export default Pagination