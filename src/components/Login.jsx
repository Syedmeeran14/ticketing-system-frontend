import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import AxiosService from '../hooks/AxiosService'
import ApiRoutes from '../utils/ApiRoutes'
import { useNavigate } from 'react-router-dom'
import { Form,Button } from 'react-bootstrap'

function Login() {

  useEffect(() => {
    sessionStorage.clear()
  },[])

  const navigate = useNavigate()

  const handleLogin = async(e) => {
    e.preventDefault()
    try {

      let formData = new FormData(e.target)
      let data = Object.fromEntries(formData)
      
      let res = await AxiosService.post(ApiRoutes.LOGIN.path,data,{
        authenticate: ApiRoutes.LOGIN.authenticate
      })

      if(res.status === 200) {
        
        sessionStorage.setItem('name',res.data.name)
        sessionStorage.setItem('id',res.data.id)
        sessionStorage.setItem('role',res.data.role)
        sessionStorage.setItem('token',res.data.token)

        toast.success(res.data.message)

        if(res.data.role === 'mentor'){
          navigate('/classes')
        }

        if(res.data.role === 'student'){
          navigate('/class')
        }

      }

    } catch(error) {
      toast.error(error.response?.data?.message || error.message)
    }
  }

  return <div className='loginWrapper'>

    <div className='loginHeader'>
      <h1>Login here</h1>
    </div>

    <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name='email'/>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name='password'/>
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>

  </div>
}

export default Login