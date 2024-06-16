import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import SidePanel from '../Common/SidePanel'
import AxiosService from '../../hooks/AxiosService'
import ApiRoutes from '../../utils/ApiRoutes'
import useLogout from '../../utils/useLogout'
import StatusCards from '../ReUsed/StatusCards'
import TicketsTable from '../ReUsed/TicketsTable'
import PieChart from '../Common/Chart'


function MyQueries() {

  let logout = useLogout()

  let [countData,setCountData] = useState({})
  let [selectStatus,setSelectedStatus] = useState("Open")
  let [tickets,setTickets] = useState([])

  const getData = async() => {
    try {

      let res = await AxiosService.get(`${ApiRoutes.CLOSED_PATH.path}/studentTicketsCount`,{
        authenticate : ApiRoutes.CLOSED_PATH.authenticate
      })

      if(res.status === 200) {
        setCountData(res.data)
      }

    } catch(error) {
      toast.error(error.response?.data?.message || error.message) 

      if( error.response?.status === 402 ) {
        logout()
      }
    }
  }

  const getDataByStatus = async() => {
    try {

      let res = await AxiosService.get(`${ApiRoutes.CLOSED_PATH.path}/studentTickets?status=${selectStatus}`,{
        authenticate: ApiRoutes.CLOSED_PATH.authenticate
      })

      if(res.status === 200) {
        setTickets(res.data.tickets)
      }

    } catch(error) {
      toast.error(error.response?.data?.message || error.message) 

      if( error.response?.status === 402 ) {
        logout()
      }
    }
  }

  useEffect(() => {
    getData()
  },[])

  useEffect(() => {
    getDataByStatus()
  },[selectStatus])


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
    <div className="App">
      <SidePanel/>

      <div className='main-content'>

          <h1>All My Queries</h1>
          <hr/>

          <div className='chart-container'>
            <PieChart chartData={chartData} /> 
          </div>

          <StatusCards countData={countData} setSelectedStatus={setSelectedStatus} />
          <TicketsTable tickets={tickets} />

      </div>

    </div>
  </>
}

export default MyQueries