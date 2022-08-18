import React from 'react'
import {Link} from 'react-router-dom'

const SuperHeroItem = ({hero}) => {
  return (
    <div><Link to={`/superHeroes/${hero.id}`}>{hero.name}</Link></div>
  )
}

export default SuperHeroItem