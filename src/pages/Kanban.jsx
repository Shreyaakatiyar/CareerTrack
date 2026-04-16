import { useState, useRef } from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase/config'
import { useApplications } from '../context/ApplicationsContext'
import { MdSearch, MdAdd, MdMoreHoriz, MdBusiness, MdLocationOn, MdCalendarToday } from 'react-icons/md'
import { FaBolt } from 'react-icons/fa'
import AddApplicationModal from '../components/AddApplicationModal'

// ── Column config ────────────────────────────────────────────────────────────
const COLUMNS = [
  { id: 'Applied',      label: 'Applied',      color: '#3b82f6', light: '#eff6ff', dot: '#3b82f6' },
  { id: 'Interviewing', label: 'Interview',     color: '#8b5cf6', light: '#f5f3ff', dot: '#8b5cf6' },
  { id: 'Offer',        label: 'Offer',         color: '#10b981', light: '#ecfdf5', dot: '#10b981' },
  { id: 'Rejected',     label: 'Rejected',      color: '#ef4444', light: '#fef2f2', dot: '#ef4444' },
]

// ── Tag color map ────────────────────────────────────────────────────────────
const TAG_COLORS = {
  Remote:    { bg: '#dbeafe', text: '#1d4ed8' },
  Hybrid:    { bg: '#fce7f3', text: '#9d174d' },
  'On-site': { bg: '#dcfce7', text: '#166534' },
  FullTime:  { bg: '#fef3c7', text: '#92400e' },
  PartTime:  { bg: '#ede9fe', text: '#5b21b6' },
  Contract:  { bg: '#ffedd5', text: '#9a3412' },
}

// ── Company initial avatar ───────────────────────────────────────────────────
const Avatar = ({ name, size = 36 }) => {
  const colors = ['#6366f1','#f59e0b','#10b981','#3b82f6','#ec4899','#8b5cf6','#14b8a6']
  const idx = name ? name.charCodeAt(0) % colors.length : 0
  return (
    <div style={{
      width: size, height: size, borderRadius: 10,
      background: colors[idx], color: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontWeight: 700, fontSize: size * 0.4, flexShrink: 0,
      fontFamily: 'inherit',
    }}>
      {name ? name[0].toUpperCase() : '?'}
    </div>
  )
}

// ── Single application card ──────────────────────────────────────────────────
const AppCard = ({ app, onDragStart, onDragEnd, isDragging }) => {
  const col = COLUMNS.find(c => c.id === app.status)
  const tags = [app.workType, app.jobType].filter(Boolean)

  return (
    <div
      draggable
      onDragStart={e => onDragStart(e, app)}
      onDragEnd={onDragEnd}
      style={{
        background: '#fff',
        borderRadius: 14,
        padding: '14px 16px',
        border: '1.5px solid #f1f5f9',
        cursor: 'grab',
        opacity: isDragging ? 0.45 : 1,
        transition: 'box-shadow 0.15s, transform 0.15s, opacity 0.15s',
        boxShadow: isDragging ? 'none' : '0 1px 4px rgba(0,0,0,0.06)',
        userSelect: 'none',
      }}
      onMouseEnter={e => {
        if (!isDragging) {
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.1)'
          e.currentTarget.style.transform = 'translateY(-2px)'
        }
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.06)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      {/* Top row: avatar + title + date */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
        <Avatar name={app.companyName} size={36} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 13.5, color: '#0f172a', lineHeight: 1.3, marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {app.jobRole}
          </div>
          <div style={{ fontSize: 12, color: '#64748b', fontWeight: 500 }}>{app.companyName}</div>
        </div>
        {app.dateApplied && (
          <div style={{ fontSize: 11, color: '#94a3b8', whiteSpace: 'nowrap', fontWeight: 500 }}>
            {app.dateApplied}
          </div>
        )}
      </div>

      {/* Location */}
      {app.location && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 10 }}>
          <MdLocationOn style={{ color: '#94a3b8', fontSize: 13, flexShrink: 0 }} />
          <span style={{ fontSize: 12, color: '#64748b' }}>{app.location}</span>
        </div>
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
          {tags.map(tag => {
            const t = TAG_COLORS[tag] || { bg: '#f1f5f9', text: '#475569' }
            return (
              <span key={tag} style={{
                background: t.bg, color: t.text,
                fontSize: 10.5, fontWeight: 700,
                padding: '3px 9px', borderRadius: 20,
                textTransform: 'uppercase', letterSpacing: '0.04em',
              }}>
                {tag}
              </span>
            )
          })}
        </div>
      )}

      {/* Status pill at bottom */}
      {col && (
        <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: col.dot }} />
          <span style={{ fontSize: 11, color: col.dot, fontWeight: 600 }}>{col.label}</span>
        </div>
      )}
    </div>
  )
}

// ── Drop column ──────────────────────────────────────────────────────────────
const KanbanColumn = ({ col, apps, dragOverCol, onDragOver, onDragLeave, onDrop, onDragStart, onDragEnd, draggingId }) => {
  const isOver = dragOverCol === col.id
  return (
    <div
      onDragOver={e => onDragOver(e, col.id)}
      onDragLeave={onDragLeave}
      onDrop={e => onDrop(e, col.id)}
      style={{
        flex: '1 1 0',
        minWidth: 220,
        maxWidth: 300,
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
      }}
    >
      {/* Column header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        marginBottom: 14, padding: '0 2px',
      }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: col.color, flexShrink: 0 }} />
        <span style={{ fontWeight: 700, fontSize: 13, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          {col.label}
        </span>
        <span style={{
          marginLeft: 4, background: col.light, color: col.color,
          borderRadius: 20, padding: '1px 9px', fontSize: 11, fontWeight: 700,
        }}>
          {apps.length}
        </span>
        <MdMoreHoriz style={{ marginLeft: 'auto', color: '#cbd5e1', fontSize: 18, cursor: 'pointer' }} />
      </div>

      {/* Drop zone */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        minHeight: 120,
        padding: isOver ? '6px' : '0',
        borderRadius: 14,
        border: isOver ? `2px dashed ${col.color}` : '2px dashed transparent',
        background: isOver ? col.light : 'transparent',
        transition: 'all 0.15s ease',
      }}>
        {apps.map(app => (
          <AppCard
            key={app.id}
            app={app}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            isDragging={draggingId === app.id}
          />
        ))}

        {/* Empty state */}
        {apps.length === 0 && !isOver && (
          <div style={{
            border: '1.5px dashed #e2e8f0', borderRadius: 14,
            padding: '28px 16px', textAlign: 'center',
            color: '#cbd5e1', fontSize: 12, fontWeight: 500,
          }}>
            Drop here
          </div>
        )}
      </div>
    </div>
  )
}

// ── Main Kanban page ─────────────────────────────────────────────────────────
const Kanban = () => {
  const { applications, addApplication, updateApplication, deleteApplication, loading } = useApplications()
  const [search, setSearch] = useState('')
  const [draggingApp, setDraggingApp] = useState(null)
  const [draggingId, setDraggingId] = useState(null)
  const [dragOverCol, setDragOverCol] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [updating, setUpdating] = useState(false)

  // ── Filter by search ──────────────────────────────────────────────────────
  const filtered = applications.filter(a =>
    !search ||
    a.companyName?.toLowerCase().includes(search.toLowerCase()) ||
    a.jobRole?.toLowerCase().includes(search.toLowerCase())
  )

  // ── Drag handlers ─────────────────────────────────────────────────────────
  const handleDragStart = (e, app) => {
    setDraggingApp(app)
    setDraggingId(app.id)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragEnd = () => {
    setDraggingApp(null)
    setDraggingId(null)
    setDragOverCol(null)
  }

  const handleDragOver = (e, colId) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setDragOverCol(colId)
  }

  const handleDragLeave = () => setDragOverCol(null)

  const handleDrop = async (e, newStatus) => {
    e.preventDefault()
    setDragOverCol(null)
    if (!draggingApp || draggingApp.status === newStatus) return

    setUpdating(true)
    try {
      // Update Firestore
      const ref = doc(db, 'applications', draggingApp.id)
      await updateDoc(ref, { status: newStatus })
      // Update local context so UI is instant
      await updateApplication(draggingApp.id, { ...draggingApp, status: newStatus })
    } catch (err) {
      console.error('Failed to update status:', err)
    } finally {
      setUpdating(false)
      setDraggingApp(null)
      setDraggingId(null)
    }
  }

  // ── Loading state ─────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div style={{ marginLeft: 256, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#f8fafc' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 40, height: 40, border: '3px solid #e2e8f0', borderTopColor: '#3b82f6', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 12px' }} />
          <p style={{ color: '#64748b', fontSize: 14 }}>Loading your board...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  return (
    <div style={{ marginLeft: 256, minHeight: '100vh', background: '#f8fafc', fontFamily: "'DM Sans', 'Inter', sans-serif" }}>

      {/* ── Top bar ── */}
      <div style={{ background: '#fff', borderBottom: '1px solid #f1f5f9', padding: '24px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', margin: 0, letterSpacing: '-0.02em' }}>
              Applications
            </h1>
            <p style={{ color: '#94a3b8', fontSize: 13, marginTop: 4 }}>
              Drag cards between columns to update status
            </p>
          </div>

          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            {/* Search */}
            <div style={{ position: 'relative' }}>
              <MdSearch style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: 17 }} />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search applications..."
                style={{
                  paddingLeft: 34, paddingRight: 16, paddingTop: 9, paddingBottom: 9,
                  borderRadius: 10, border: '1.5px solid #e2e8f0',
                  fontSize: 13, color: '#0f172a', background: '#f8fafc',
                  outline: 'none', width: 220,
                  fontFamily: 'inherit',
                }}
              />
            </div>

            {/* Quick apply btn */}
            <button
              onClick={() => setIsModalOpen(true)}
              style={{
                display: 'flex', alignItems: 'center', gap: 7,
                background: '#3b82f6', color: '#fff',
                border: 'none', borderRadius: 10,
                padding: '9px 18px', fontWeight: 700, fontSize: 13,
                cursor: 'pointer', transition: 'background 0.15s',
                fontFamily: 'inherit',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#2563eb'}
              onMouseLeave={e => e.currentTarget.style.background = '#3b82f6'}
            >
              <FaBolt style={{ fontSize: 12 }} />
              Quick Apply
            </button>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 24, marginTop: 20, flexWrap: 'wrap' }}>
          {COLUMNS.map(col => {
            const count = filtered.filter(a => a.status === col.id).length
            return (
              <div key={col.id} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: col.color }} />
                <span style={{ fontSize: 12, color: '#64748b', fontWeight: 500 }}>{col.label}</span>
                <span style={{ fontSize: 12, color: col.color, fontWeight: 700 }}>{count}</span>
              </div>
            )
          })}
          <div style={{ marginLeft: 'auto', fontSize: 12, color: '#94a3b8' }}>
            {filtered.length} total applications
          </div>
        </div>
      </div>

      {/* ── Board ── */}
      <div style={{ padding: '28px 32px', overflowX: 'auto' }}>
        <div style={{ display: 'flex', gap: 20, minWidth: 'max-content', alignItems: 'flex-start' }}>
          {COLUMNS.map(col => (
            <KanbanColumn
              key={col.id}
              col={col}
              apps={filtered.filter(a => a.status === col.id)}
              dragOverCol={dragOverCol}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              draggingId={draggingId}
            />
          ))}
        </div>
      </div>

      {/* Updating toast */}
      {updating && (
        <div style={{
          position: 'fixed', bottom: 24, right: 24,
          background: '#0f172a', color: '#fff',
          padding: '10px 18px', borderRadius: 10,
          fontSize: 13, fontWeight: 600,
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          display: 'flex', alignItems: 'center', gap: 8,
          zIndex: 9999,
        }}>
          <div style={{ width: 14, height: 14, border: '2px solid #334155', borderTopColor: '#3b82f6', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
          Saving...
        </div>
      )}

      <AddApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={async (data) => { await addApplication(data); setIsModalOpen(false) }}
      />

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

export default Kanban