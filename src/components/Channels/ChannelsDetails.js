import React from 'react'

const ChannelDetails = ({channel})=> {
  return (
    <>
        <p>Clients:</p> 
        <ul>
            {channel?.clients?.map((client)=>{
                return <li key={`client-${Math.random()}`}>{client}</li>
            })}
        </ul>
    </>
  )
}


export default ChannelDetails
