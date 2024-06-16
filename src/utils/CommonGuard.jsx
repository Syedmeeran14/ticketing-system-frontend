import React, { useEffect, useState } from 'react'
import useVerifyRole from '../hooks/UseVerifyRole'

function CommonGuard({ children }) {

  const verified = useVerifyRole(['mentor','student'])

  if(verified === null) {
    return <div>Loading...</div>  
  }

  if(!verified) {
    return null
  }

  return children

}

export default CommonGuard