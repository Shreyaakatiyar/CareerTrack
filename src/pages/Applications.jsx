import { useState } from 'react'
import { useApplications } from '../context/ApplicationsContext'
import AddApplicationModal from '../components/AddApplicationModal'
import { MdDelete, MdEdit } from 'react-icons/md'

const Applications = () => {
  const { applications, addApplication, deleteApplication, updateApplication, loading } = useApplications()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingApp, setEditingApp] = useState(null)

  const handleAddApplication = async (formData) => {
    await addApplication(formData)
    setIsModalOpen(false)
  }

  const handleEditApplication = (app) => {
    console.log('Editing app:', app) // Debug
    setEditingApp(app)
    setIsModalOpen(true)
  }

  const handleUpdateApplication = async (id, formData) => {
    await updateApplication(id, formData)
    setEditingApp(null)
    setIsModalOpen(false)
  }

  const handleDeleteApplication = async (id) => {
    await deleteApplication(id)
  }

  const statusColors = {
    'Applied': 'bg-blue-100 text-blue-800',
    'Interviewing': 'bg-purple-100 text-purple-800',
    'Offer': 'bg-green-100 text-green-800',
    'Rejected': 'bg-red-100 text-red-800'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading applications...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="ml-64 px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Applications</h1>
          <p className="text-gray-600 mt-2">Track and manage all your job applications</p>
        </div>
      </div>

      {/* Content */}
      <div className="ml-64 p-8">
        {applications.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No Applications Yet</h2>
            <p className="text-gray-600 mb-6">Start adding job applications to track your progress</p>
            <button onClick={() => setIsModalOpen(true)} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold">
              Add Application
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">All Applications</h2>
              <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold">
                Add Application
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Company</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Job Role</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date Applied</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <tr key={app.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">{app.companyName}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{app.jobRole}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[app.status] || 'bg-gray-100 text-gray-800'}`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{app.dateApplied}</td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => handleEditApplication(app)}
                            className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                            title="Edit application"
                          >
                            <MdEdit className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => handleDeleteApplication(app.id)}
                            className="text-red-600 hover:text-red-700 font-semibold transition-colors"
                            title="Delete application"
                          >
                            <MdDelete className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <AddApplicationModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false)
          setEditingApp(null)
        }}
        onSave={handleAddApplication}
        editingApp={editingApp}
        onUpdate={handleUpdateApplication}
        onDelete={handleDeleteApplication}
      />
    </div>
  )
}

export default Applications
