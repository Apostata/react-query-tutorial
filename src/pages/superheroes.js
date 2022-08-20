import React from 'react'
// import { useSuperHeroes } from './useSuperHeroes-old'
import { useSuperHeroes} from './useSuperHeroes'
import SuperHeroItem from '../components/SuperHeroes/superHeroItem'
import AddSuperHero from '../components/SuperHeroes/AddSuperHero/AddSuperHero'

const SuperHeroes = () => {
    const {superHeroes, loadingSuperHeroes, errorSuperHeroes} = useSuperHeroes()
  return (
    <div>
        <h2>Super Heroes</h2>
        <AddSuperHero />

        {loadingSuperHeroes && <div>Loading...</div>} 
        {errorSuperHeroes && <div>{errorSuperHeroes}</div>}
        {(!loadingSuperHeroes && !errorSuperHeroes) && superHeroes?.map((hero)=>
          <SuperHeroItem key={`superhero-${hero.id}-${Math.random()}`} hero={hero} />
        )}
    </div>
  )
}

export default SuperHeroes