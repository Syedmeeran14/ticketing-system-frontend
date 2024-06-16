import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Form,Button } from 'react-bootstrap'
import SidePanel from '../Common/SidePanel'
import AxiosService from '../../hooks/AxiosService'
import ApiRoutes from '../../utils/ApiRoutes'
import toast from 'react-hot-toast'


function CreateQuery(){

  let navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {

      let formData = new FormData(e.target)
      let data = Object.fromEntries(formData)

          let res = await AxiosService.post(`${ApiRoutes.CLOSED_PATH.path}/createTicket`,data,{
            authenticate: ApiRoutes.CLOSED_PATH.authenticate
          })

          if(res.status === 201) {
            toast.success(res.data.message)
            navigate('/myQueries')
          }

    } catch(error) {
      toast.error(error.response?.data?.message || error.message) 
    }
  }


  return <>
  <div className='App'>
    <SidePanel/>

    <div className='main-content'>
        <div className='queryWrapper'>

            <div className='loginHeader'>
                <h1>Raise a Query</h1>
            </div>

            <div style={{position: 'relative'}}>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter the Title" name='title' required/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Email Description</Form.Label>
                    <Form.Control type="text" placeholder="Enter Description" name='description' required/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            </div>

        </div>
    </div>

  </div>
  </>
}

export default CreateQuery