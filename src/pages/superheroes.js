import React from 'react'
import { useSuperHeroes } from './useSuperHeroes'
const SuperHeroes = () => {
    const {superHeroes, loading} = useSuperHeroes()
  return (
    <div>
        <h2>Super Heroes</h2>
        {loading ?<div>Loading...</div>: superHeroes?.map((hero)=><div key={`superhero-${hero.id}-${Math.random()}`}>{hero.name}</div>)}
    </div>
  )
}

export default SuperHeroes