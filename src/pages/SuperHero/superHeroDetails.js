import React from 'react'
import {useParams} from 'react-router-dom'
import { useSuperHeroDetails } from './useSuperHeroDetails'

const SuperHeroDetails = () => {
  const {id} = useParams()
  const {superHero, loading, error} = useSuperHeroDetails(id)
  return (
    <div>
        <h2>{superHero?.name || 'Super Hero'}</h2>
        {loading && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {(!loading && !error) && 
            <div >
                <p>ID: {superHero.id}</p>
                <p>Alter Ego: {superHero.alterEgo}</p>
            </div>
        }
    </div>
  )
}

export default SuperHeroDetails