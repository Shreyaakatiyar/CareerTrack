import React, { useState, useEffect } from 'react'
import { MdCancel } from 'react-icons/md'

const AddApplicationModal = ({ isOpen, onClose, onSave, editingApp = null, onDelete = null, onUpdate = null }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    jobRole: '',
    status: 'Applied',
    dateApplied: '',
    jobLink: '',
    internalNotes: ''
  })

  const statusOptions = ['Applied', 'Interviewing', 'Offer', 'Rejected']

  // Initialize form with editing data when editing app changes
  useEffect(() => {
    if (editingApp) {
      console.log('Populating form with editingApp:', editingApp) // Debug
      setFormData({
        companyName: editingApp.companyName || '',
        jobRole: editingApp.jobRole || '',
        status: editingApp.status || 'Applied',
        dateApplied: editingApp.dateApplied || '',
        jobLink: editingApp.jobLink || '',
        internalNotes: editingApp.internalNotes || ''
      })
    } else {
      console.log('Clearing form (no editingApp)') // Debug
      setFormData({
        companyName: '',
        jobRole: '',
        status: 'Applied',
        dateApplied: '',
        jobLink: '',
        internalNotes: ''
      })
    }
  }, [editingApp])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async () => {
    if (formData.companyName && formData.jobRole && formData.dateApplied) {
      if (editingApp && onUpdate) {
        await onUpdate(editingApp.id, formData)
      } else {
        await onSave(formData)
      }
      setFormData({
        companyName: '',
        jobRole: '',
        status: 'Applied',
        dateApplied: '',
        jobLink: '',
        internalNotes: ''
      })
      onClose()
    } else {
      alert('Please fill in all required fields')
    }
  }

  const handleDelete = async () => {
    if (editingApp && onDelete) {
      if (window.confirm('Are you sure you want to delete this application?')) {
        await onDelete(editingApp.id)
        onClose()
      }
    }
  }

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 backdrop-blur-md flex items-center justify-center z-50'>
      <div className='bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4'>
        {/* Header */}
        <div className='flex items-center justify-between p-6 border-b border-gray-200'>
          <div>
            <h2 className='text-2xl font-bold text-gray-900'>{editingApp ? 'Edit Application' : 'Add Application'}</h2>
            <p className='text-gray-600 text-sm mt-1'>{editingApp ? 'Update your job opportunity details' : 'Track a new job opportunity'}</p>
          </div>
          <button onClick={onClose} className='text-gray-400 hover:text-gray-600 transition-colors'>
            <MdCancel className='w-6 h-6' />
          </button>
        </div>

        {/* Body */}
        <div className='p-6'>
          <div className='grid grid-cols-2 gap-6 mb-6'>
            {/* Company Name */}
            <div>
              <label className='block text-sm font-semibold text-gray-900 mb-2 uppercase tracking-wide'>Company Name</label>
              <input
                type='text'
                name='companyName'
                value={formData.companyName}
                onChange={handleInputChange}
                placeholder='e.g., Linear'
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              />
            </div>

            {/* Job Role */}
            <div>
              <label className='block text-sm font-semibold text-gray-900 mb-2 uppercase tracking-wide'>Job Role</label>
              <input
                type='text'
                name='jobRole'
                value={formData.jobRole}
                onChange={handleInputChange}
                placeholder='e.g., Senior UI Engineer'
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              />
            </div>

            {/* Status */}
            <div>
              <label className='block text-sm font-semibold text-gray-900 mb-2 uppercase tracking-wide'>Status</label>
              <select
                name='status'
                value={formData.status}
                onChange={handleInputChange}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white'
              >
                {statusOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Date Applied */}
            <div>
              <label className='block text-sm font-semibold text-gray-900 mb-2 uppercase tracking-wide'>Date Applied</label>
              <input
                type='date'
                name='dateApplied'
                value={formData.dateApplied}
                onChange={handleInputChange}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              />
            </div>
          </div>

          {/* Job Link */}
          <div className='mb-6'>
            <label className='block text-sm font-semibold text-gray-900 mb-2 uppercase tracking-wide'>Job Link</label>
            <input
              type='url'
              name='jobLink'
              value={formData.jobLink}
              onChange={handleInputChange}
              placeholder='https://example.com/careers/job'
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            />
          </div>

          {/* Internal Notes */}
          <div className='mb-6'>
            <label className='block text-sm font-semibold text-gray-900 mb-2 uppercase tracking-wide'>Internal Notes</label>
            <textarea
              name='internalNotes'
              value={formData.internalNotes}
              onChange={handleInputChange}
              placeholder='Add any notes about this application...'
              rows='4'
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none'
            />
          </div>
        </div>

        {/* Footer */}
        <div className='flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50'>
          {editingApp && (
            <button onClick={handleDelete} className='text-red-600 hover:text-red-700 font-semibold transition-colors'>
              Delete Application
            </button>
          )}
          {!editingApp && <div />}
          <div className='flex gap-3'>
            <button
              onClick={onClose}
              className='px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors'
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className='px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors'
            >
              {editingApp ? 'Update Application' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddApplicationModal
