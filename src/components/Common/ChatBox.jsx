import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ApiRoutes from '../../utils/ApiRoutes'
import AxiosService from '../../hooks/AxiosService'
import { Form,Button } from 'react-bootstrap'
import toast from 'react-hot-toast'
import useLogout from '../../utils/useLogout'



function ChatBox({ ticketId, userType, ticketStatus, show, getData }) {
  
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')

  let navigate = useNavigate()
  let logout = useLogout()

  useEffect(() => {
    
    fetchMessages()

    if(ticketStatus === 'Assigned') {
      const interval = setInterval(fetchMessages, 5000) // Poll every 5 seconds
      return () => clearInterval(interval) // Cleanup on unmount
    }

  }, [ticketId,ticketStatus])


  const fetchMessages = async () => {
    try {

      const res = await AxiosService.get(`${ApiRoutes.CHAT.path}/${ticketId}`,{
        authenticate: ApiRoutes.CLOSED_PATH.authenticate
      })

      if(res.status === 200) {
        setMessages(res.data)
      }

    } catch(error) {
      toast.error(error.response?.data?.message || error.message) 

      if( error.response?.status === 402 ) {
        logout()
      }
    }
  }


  const handleSendMessage = async (e) => {
    e.preventDefault()
    try {

      const message = { ticketId, sender: userType, message: newMessage };

      let res = await AxiosService.post(`${ApiRoutes.CHAT.path}/${ticketId}`,message,{
        authenticate: ApiRoutes.CLOSED_PATH.authenticate
      })

      if(res.status === 201) {
        setNewMessage('')
        setMessages((prevMessages) => [...prevMessages, message])
      }

    } catch(error) {
      toast.error(error.response?.data?.message || error.message) 

      if( error.response?.status === 402 ) {
        logout()
      }
    }
  }


  const handleClose = async(e) => {
    e.preventDefault()
    try {

      let formData = new FormData(e.target)
      let data = Object.fromEntries(formData)
      
      if(data.resolution) {

        let res = await AxiosService.put(`${ApiRoutes.CLOSED_PATH.path}/close/${ticketId}`,data,{
          authenticate: ApiRoutes.CLOSED_PATH.authenticate
        })
  
        if(res.status === 200) {
          toast.success(res.data.message)
          navigate(-1)
        }

      } else {
        toast.error('Resolution is Required')
      }

    } catch(error) {
      toast.error(error.response?.data?.message || error.message) 

      if( error.response?.status === 402 ) {
        logout()
      }
    }
  }

  return <>
      <div className="chat-box">

        <b style={{margin: '0 auto'}}>Messages</b>

        <div className="chat-messages">

          {!messages.length && (
            <div style={{marginTop: '30%', textAlign: 'center'}}>No messages</div>
          )}

          {messages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.sender}`}>
              <strong>{msg.sender}:</strong> {msg.message}
            </div>
          ))}

        </div>

        { ticketStatus === 'Assigned' && (
            <form onSubmit={handleSendMessage} className="chat-form">
                <div>
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      required
                    />
                    <button type="submit">Send</button>
                </div>
            </form>
          )}
        
      </div>
      <hr/>
      
      {userType === 'mentor' && ticketStatus === 'Assigned' && show && (
                        <div style={{marginTop: '20px', padding: '10px'}}>
                            
                                <Form onSubmit={handleClose}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Resolution</Form.Label>
                                        <Form.Control type="text" placeholder="Enter the Resolution" name="resolution" required/>
                                    </Form.Group>

                                    <Button type="submit" style={{display: 'block', margin: 'auto'}}>Close</Button>
                                </Form>
                            
                        </div>
                    )}
    </>
    }
    
    export default ChatBox