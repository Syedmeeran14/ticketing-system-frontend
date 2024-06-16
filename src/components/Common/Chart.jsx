import React from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS } from "chart.js/auto"

function PieChart({ chartData }) {
    return <>
        <Pie
            data={chartData}
            options={{
                responsive: true,
                maintainAspectRatio: false, // Ensures chart fits its container
              }}
        />
    </>
}

export default PieChart