import React from 'react'
import SidePanel from '../Common/SidePanel'

function Class(){
    return <>
        <div className="App">
            <SidePanel />
            <div className="main-content">
                <h1>Tasks</h1>
                <p>Your Submitted tasks are visible here</p>
            </div>
        </div>
    </>
    
}

export default Class;