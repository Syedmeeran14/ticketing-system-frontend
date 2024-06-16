import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

function StatusCards({ countData, setSelectedStatus, Open }) {

  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <div style={{ marginTop: '50px', marginBottom: '10px' }}>

      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor:'background.paper', display:'flex', justifyContent: 'center' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            {Open === false? null : <Tab label={`Open ${countData.Open? countData.Open : 0}`} onClick={() => setSelectedStatus("Open")} />}
            <Tab label={`Assigned ${countData.Assigned? countData.Assigned : 0}`} onClick={() => setSelectedStatus("Assigned")} />
            <Tab label={`Closed ${countData.Closed? countData.Closed : 0}`} onClick={() => setSelectedStatus("Closed")} />
          </Tabs>
        </Box>
      </Box>

    </div>
  )
}

export default StatusCards