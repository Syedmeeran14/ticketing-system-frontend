import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import AxiosService from './AxiosService'
import ApiRoutes from '../utils/ApiRoutes'
import useLogout from '../utils/useLogout'

function useVerifyRole(allowedRoles) {

  const [verified, setVerified] = useState(null)

  const logout = useLogout()
  const navigate = useNavigate()

  const role = sessionStorage.getItem('role')
  const token = sessionStorage.getItem('token')

  const verify = async () => {
    try {

      const res = await AxiosService.get(`${ApiRoutes.USER.path}/verify/${role}`, {
        authenticate: ApiRoutes.USER.authenticate,
      })

      if(res.status === 200) {
        setVerified(true)
      } else {
        setVerified(false)
        navigate('/login')
      }

    } catch (error) {
      toast.error(error.response?.data?.message || error.message);

      if(error.response?.status === 402) {
        logout()
      }
      setVerified(false)
      navigate('/login')
    }
  }

  useEffect(() => {
    if (token && allowedRoles.includes(role)) {
      verify()
    } else {
      setVerified(false)
      navigate('/login')
    }
  }, [token, role])

  return verified
}

export default useVerifyRole