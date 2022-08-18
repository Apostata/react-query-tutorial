import React from 'react'

const UserDetails = ({user})=> {
  return (
    <>
        <p>ID: {user.id}</p>
        <p>ChanelID: {user.channelId}</p>
    </>
  )
}


export default UserDetails
