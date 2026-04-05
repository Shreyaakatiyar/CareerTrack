import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const ApplicationStatusChart = () => {
  const data = {
    labels: ['Applied', 'Interviews', 'Offers', 'Rejected'],
    datasets: [
      {
        data: [128, 14, 2, 42],
        backgroundColor: [
          '#3b82f6',
          '#8b5cf6',
          '#ec4899',
          '#ef4444'
        ],
        borderColor: '#ffffff',
        borderWidth: 2,
        hoverOffset: 10
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
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
        callbacks: {
          label: function(context) {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            return `${context.label}: ${context.parsed} (${percentage}%)`;
          }
        }
      }
    }
  }

  return (
    <div className="w-full h-full">
      <Doughnut data={data} options={options} />
    </div>
  )
}

export default ApplicationStatusChart
