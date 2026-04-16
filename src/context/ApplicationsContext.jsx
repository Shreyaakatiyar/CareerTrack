import React, { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import { db } from '../firebase/config'
import { collection, addDoc, updateDoc, deleteDoc, doc, query, where, onSnapshot } from 'firebase/firestore'

const ApplicationsContext = createContext()

export const useApplications = () => {
  const context = useContext(ApplicationsContext)
  if (!context) {
    throw new Error('useApplications must be used within ApplicationsProvider')
  }
  return context
}

export const ApplicationsProvider = ({ children }) => {
  const { user } = useAuth()
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(false)

  // Real-time listener for user's applications
  useEffect(() => {
    if (!user) {
      setApplications([])
      return
    }

    setLoading(true)
    const q = query(collection(db, 'applications'), where('userId', '==', user.uid))
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const apps = []
      snapshot.forEach((doc) => {
        apps.push({ id: doc.id, ...doc.data() })
      })
      setApplications(apps)
      setLoading(false)
    }, (error) => {
      console.error('Error fetching applications:', error)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [user])

  const addApplication = async (newApp) => {
    if (!user) return
    try {
      const docRef = await addDoc(collection(db, 'applications'), {
        ...newApp,
        userId: user.uid,
        createdAt: new Date()
      })
      return { id: docRef.id, ...newApp }
    } catch (error) {
      console.error('Error adding application:', error)
    }
  }

  const updateApplication = async (id, updatedApp) => {
    try {
      const appRef = doc(db, 'applications', id)
      await updateDoc(appRef, {
        ...updatedApp,
        updatedAt: new Date()
      })
    } catch (error) {
      console.error('Error updating application:', error)
    }
  }

  const deleteApplication = async (id) => {
    try {
      await deleteDoc(doc(db, 'applications', id))
    } catch (error) {
      console.error('Error deleting application:', error)
    }
  }

  return (
    <ApplicationsContext.Provider value={{ applications, addApplication, updateApplication, deleteApplication, loading }}>
      {children}
    </ApplicationsContext.Provider>
  )
}

