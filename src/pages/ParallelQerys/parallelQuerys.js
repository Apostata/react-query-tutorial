import React, { Fragment } from 'react'
import SuperHeroItem from '../../components/SuperHeroes/superHeroItem'
import {useParallelQuerys} from './useParallelQuery'

const ParallelQuerys = () => {
    
    const { results } = useParallelQuerys()
  return (
    <div>
        <h2>ParallelQuerys</h2>
        {results?.map((res)=>{
            return (
            <Fragment key={`parallel-${Math.random()}`}>
                {res?.isLoading && <div>Loading...</div>}
                {res?.error?.message && <div>{res?.error?.message}</div>}
                {(!res?.isLoading && !res?.error?.message) && 
                    <SuperHeroItem key={`superhero-${res.data.data.id}-${Math.random()}`} hero={res.data.data} />
                }
            </Fragment>)
        })}
    </div>
  )
}

export default ParallelQuerys