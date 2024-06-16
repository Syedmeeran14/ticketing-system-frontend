import React, { useEffect, useState } from 'react'
import useVerifyRole from '../hooks/UseVerifyRole'

function StudentGuard({ children }) {

  const verified = useVerifyRole(['student'])

  if(verified === null) {
    return <div>Loading...</div>  
  }

  if(!verified) {
    return null
  }

  return children
  
}

export default StudentGuard