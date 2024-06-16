import React, { useEffect, useState } from 'react'
import ApiRoutes from '../../utils/ApiRoutes'
import AxiosService from '../../hooks/AxiosService'
import { Table } from 'react-bootstrap'
import toast from 'react-hot-toast'
import useLogout from '../../utils/useLogout'
import Messages from '../../utils/Messages'
import SidePanel from './SidePanel'



function Profile() {

    let [data,setData] = useState({})
    let logout = useLogout()

    const getData = async() => {
        try {
            
            let res = await AxiosService.get(`${ApiRoutes.USER.path}/profile`,{
                authenticate: ApiRoutes.USER.authenticate
            })

            if(res.status === 200) {
                setData(res.data)
            }

        } catch(error) {
            toast.error(error.response?.data?.message || error.message)

            if(error.response?.status === 402) {
                logout()
            }
        }
    }

    useEffect(() => {
        getData()
    },[])

  return <>
    <div className='App'>
        <SidePanel/>

        <div className='main-content'>
            <div className="ticket-details">
                <h3 className="loginHeader">User Details</h3>
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
                            {Object.keys(data).map((e, i) => (
                                <tr key={i}>
                                    <td>{Messages[e]}</td>
                                    <td>{data[e] ? data[e] : '-'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    </div>
  
  </>
}

export default Profile