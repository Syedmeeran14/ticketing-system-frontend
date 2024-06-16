import React, { useEffect, useState } from 'react'
import { Form,Button } from 'react-bootstrap'
import SidePanel from '../Common/SidePanel'
import AxiosService from '../../hooks/AxiosService'
import ApiRoutes from '../../utils/ApiRoutes'
import toast from 'react-hot-toast'
import useLogout from '../../utils/useLogout'
import StatusCards from '../ReUsed/StatusCards'
import TicketsTable from '../ReUsed/TicketsTable'
import PieChart from '../Common/Chart'


function StudentTickets() {

    const logout = useLogout()
    const role = sessionStorage.getItem('role')

    const [userData, setUserData] = useState({})
    const [countData, setCountData] = useState({})
    const [selectStatus, setSelectedStatus] = useState("Open")
    const [tickets, setTickets] = useState([])
    const [show,setShow] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            let formData = new FormData(e.target)
            let data = Object.fromEntries(formData)
            setUserData(data)

            await getData(data)
            await getDataByStatus(data)

        } catch (error) {
            toast.error(error.response?.data?.message || error.message)
        }
    };

    const getData = async (data) => {
        try {
            let res = await AxiosService.post(`${ApiRoutes.CLOSED_PATH.path}/findStudentTicketsCount`,data,{
                authenticate : ApiRoutes.CLOSED_PATH.authenticate
              })

            if(res.status === 200) {
                setCountData(res.data)
                
                if(Object.keys(res.data).length === 0) {
                    setShow(false)
                    return toast.error('No Tickets Found') 
                } else {
                    setShow(true)
                }
                
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message)

            if(error.response?.status === 402) {
                logout()
            }
        }
    }

    const getDataByStatus = async (data = userData) => {
        try {

            let res = await AxiosService.post(`${ApiRoutes.CLOSED_PATH.path}/findStudentTickets`,{ ...data, status: selectStatus },{
                authenticate : ApiRoutes.CLOSED_PATH.authenticate
              })

            if(res.status === 200) {
                setTickets(res.data.tickets)
            }

        } catch (error) {
            toast.error(error.response?.data?.message || error.message)

            if(error.response?.status === 402) {
                logout()
            }
        }
    }

    useEffect(() => {
        if(userData.email) {
            getDataByStatus()
        }
    }, [selectStatus])


    const chartData = {
        labels: Object.keys(countData),
        datasets: [
          {
            label: 'Ticket Counts',
            data: Object.values(countData),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1,
          },
        ],
      }

    return <>
        <div className='App'>
            <SidePanel />

            <div className='main-content'>
                <div className='loginWrapper'>
                    <div className='loginHeader'>
                        <h1>Find Tickets of a student</h1>
                    </div>

                    <div style={{ position: 'relative' }}>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Enter Student Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter the Student Email Id" name='email' required />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Search
                            </Button>
                        </Form>
                    </div>
                </div>

                {show && (
                    <div>
                        <div className='chart-container'>
                            <PieChart chartData={chartData} />
                        </div>

                        <StatusCards countData={countData} setSelectedStatus={setSelectedStatus} />
                        <TicketsTable tickets={tickets} />
                    </div>
                )}
            </div>
        </div>
    </>
}

export default StudentTickets