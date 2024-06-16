import React from 'react'
import useVerifyRole from '../hooks/UseVerifyRole'

function MentorGuard({ children }) {

  const verified = useVerifyRole(['mentor'])

  if(verified === null) {
    return <div>Loading...</div>  
  }

  if(!verified) {
    return null
  }

  return children
  
}

export default MentorGuard