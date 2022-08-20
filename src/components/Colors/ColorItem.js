import React from 'react'

const ColorItem = ({color}) => {
  return (
    <div>
        <p>ID: {color.id}</p>
        <p>Name: {color.name}</p>
    </div>
  )
}

export default ColorItem