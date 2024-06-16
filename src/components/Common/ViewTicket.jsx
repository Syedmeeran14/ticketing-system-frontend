import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Table, Button } from 'react-bootstrap'
import SidePanel from './SidePanel'
import AxiosService from '../../hooks/AxiosService'
import ApiRoutes from '../../utils/ApiRoutes'
import useLogout from '../../utils/useLogout'
import formatDate from '../../hooks/FormatDate'
import Messages from '../../utils/Messages'
import ChatBox from './ChatBox'

function ViewTicket() {

  let { ticketId } = useParams()
  let navigate = useNavigate()
  let logout = useLogout()

  let role = sessionStorage.getItem('role')
  let id = sessionStorage.getItem('id')

  let [ticket, setTicket] = useState({})
  let [show, setShow] = useState(false)

  const date = ['createdAt', 'assignedAt', 'closedAt']
  const omitKeys = ['_id', 'assignedToId', 'studentId']

  const getData = async () => {
    try {

      let res = await AxiosService.get(`${ApiRoutes.CLOSED_PATH.path}/${ticketId}`, {
        authenticate: ApiRoutes.CLOSED_PATH.authenticate,
      })

      if (res.status === 200) {
        if((role === 'student' && res.data.ticket.studentId === id) || role === 'mentor') {
          setTicket(res.data.ticket)

          if (res.data.ticket.assignedToId === id) {
            setShow(true)
          }
        }
      }

    } catch (error) {
      toast.error(error.response?.data?.message || error.message)

      if(error.response?.status === 402) {
        logout()
      } else if (error.response?.status === 500) {
        navigate(-1)
      }
    }
  }

  const handleAssign = async () => {
    try {

      let res = await AxiosService.put(`${ApiRoutes.CLOSED_PATH.path}/assign/${ticketId}`, undefined, {
        authenticate: ApiRoutes.CLOSED_PATH.authenticate,
      })

      if(res.status === 200) {
        toast.success(res.data.message)
        getData()
      }

    } catch (error) {
      toast.error(error.response?.data?.message || error.message)

      if (error.response?.status === 402) {
        logout()
      }
    }
  }

  useEffect(() => {
    if (ticketId) {
      getData()
    } else {
      logout()
    }
  },[ticketId, id])

  const keysToDisplay = Object.keys(ticket).filter(key => !omitKeys.includes(key))

  if(!ticket) {
    return <div>No ticket found</div>
  }

  return <>
    <div className="App">
      <SidePanel />

      {(role === 'student' && ticket.studentId === id) || role === 'mentor' ? (
        <div className="main-content">

          <div className="view-ticket-container">
            <div className="ticket-details">
              <h3 className="loginHeader">Ticket Details</h3>
              <hr />

              <div style={{ marginTop: '50px' }}>

                <Table striped bordered hover className="view-ticket-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(role === 'mentor' ? Object.keys(ticket) : keysToDisplay).map((key, index) => (
                      <tr key={index}>
                        <td>{Messages[key]}</td>
                        <td>{date.includes(key) && ticket[key] ? formatDate(ticket[key]) : ticket[key] || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>

              {role === 'mentor' && ticket.status === 'Open' && (
                <div className="loginWrapper">
                  <Button onClick={handleAssign}>Assign to me</Button>
                  </div>
              )}

            </div>

            {((role === 'student' && ticket.studentId === id) || (role === 'mentor' && ticket.assignedToId === id)) && (
              (ticket.status === 'Assigned' || ticket.status === 'Closed') && (
                <div className="chat-box-container">
                  <ChatBox
                    ticketId={ticket._id}
                    userType={role}
                    ticketStatus={ticket.status}
                    show={show}
                    getData={getData}
                  />
                </div>
              )
            )}

          </div>

        </div>
      ) : null}
    </div>
  </>
}


export default ViewTicket