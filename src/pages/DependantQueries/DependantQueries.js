import React from 'react'
import { useDependantQueries } from './useDependantQueries'
import UserDetails from '../../components/Users/userDetails'
import ChannelDetails from '../../components/Channels/ChannelsDetails'

const DependantQueries = () => {
    const {user, loadingUser, errorUser, channel, loadingChannel, errorChannel} = useDependantQueries()
  return (
    <div>
        <h2>DependantQueries</h2>
        {loadingUser && <div>Loading...</div>} 
        {errorUser && <div>{errorUser}</div>}
        {(!loadingUser && !errorUser && user) && 
          <UserDetails key={`user-${user.id}-${Math.random()}`} user={user} />
        }
        
        {loadingChannel && <div>Loading...</div>} 
        {errorChannel && <div>{errorChannel}</div>}
        {(!loadingChannel && !errorChannel && channel) && 
          <ChannelDetails key={`channel-${channel.id}-${Math.random()}`} channel={channel}/>
        }
    </div>
  )
}

export default DependantQueries