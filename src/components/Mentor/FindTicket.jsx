import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Form,Button } from 'react-bootstrap'
import SidePanel from '../Common/SidePanel'
import AxiosService from '../../hooks/AxiosService'
import ApiRoutes from '../../utils/ApiRoutes'
import toast from 'react-hot-toast'


function FindTicket() {
 
  let navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {

      let formData = new FormData(e.target)
      let data = Object.fromEntries(formData)

      let res = await AxiosService.get(`${ApiRoutes.CLOSED_PATH.path}/getTicketByTN/${data.tn}`,{
        authenticate: ApiRoutes.CLOSED_PATH.authenticate
      })

      if(res.status === 200) {
          toast.success(res.data.message)
          navigate(`/tickets/${res.data.ticket._id}`)
      }

    } catch(error) {
      toast.error(error.response?.data?.message || error.message) 
    }
  }

  return <>
  <div className='App'>
    <SidePanel/>

    <div className='main-content'>
        <div className='loginWrapper'>

            <div className='loginHeader'>
                <h1>Find a Ticket</h1>
            </div>

            <div style={{position: 'relative'}}>
              <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                      <Form.Label>TIcket Number</Form.Label>
                      <Form.Control type="text" placeholder="Enter the Ticket Number" name='tn' required/>
                  </Form.Group>

                  <Button variant="primary" type="submit">
                      Search
                  </Button>
              </Form>
            </div>

        </div>
    </div>

  </div>
  </>
}

export default FindTicket