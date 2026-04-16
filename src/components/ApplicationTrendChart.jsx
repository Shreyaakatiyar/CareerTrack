import React from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const ApplicationTrendChart = ({ applications = [] }) => {
  // Calculate monthly data from applications
  const months = ['January', 'February', 'March', 'April', 'May', 'June']
  const monthlyData = [0, 0, 0, 0, 0, 0]
  
  applications.forEach(app => {
    if (app.dateApplied) {
      const date = new Date(app.dateApplied)
      const monthIndex = date.getMonth()
      if (monthIndex >= 0 && monthIndex < 6) {
        monthlyData[monthIndex]++
      }
    }
  })

  const data = {
    labels: months,
    datasets: [
      {
        label: 'Applications Submitted',
        data: monthlyData,
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 6,
        pointBackgroundColor: '#2563eb',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointHoverRadius: 8,
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 13,
            weight: 500
          },
          color: '#6b7280'
        }
      },
      tooltip: {
        backgroundColor: '#1f2937',
        padding: 12,
        titleFont: {
          size: 13,
          weight: 600
        },
        bodyFont: {
          size: 12
        },
        cornerRadius: 8,
        displayColors: true,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(107, 114, 128, 0.1)',
          drawBorder: false
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 12
          }
        },
        max: 40
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 12
          }
        }
      }
    }
  }

  return (
    <div className="w-full h-full">
      <Line data={data} options={options} />
    </div>
  )
}

export default ApplicationTrendChart
