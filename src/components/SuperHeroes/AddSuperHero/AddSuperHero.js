import React from 'react'
import { useAddSuperHero } from './useAddSuperHero';

const AddSuperHero = () => {
  const {nameRef, alterEgoRef, loading, error, addHero} = useAddSuperHero()
  return (
    <div>
        <h3>Add Hero</h3>
        <form onSubmit={(e)=>{
            e.preventDefault();
            addHero();
        }}>
        <div>
            <label>Name </label>
            <input ref={nameRef} />
        </div>
        <div>
            <label>Alter Ego </label>
            <input ref={alterEgoRef} />
        </div>
        <button type='submit'>Add</button>
        {loading && <div>Loading...</div>} 
        {error && <div>{error}</div>}
        </form>
    </div>
  )
}

export default AddSuperHero