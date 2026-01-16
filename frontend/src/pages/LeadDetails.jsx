import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

function LeadDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [lead, setLead] = useState(null)
  const [newStatus, setNewStatus] = useState('')

  useEffect(() => {
    fetchLead()
  }, [])

  const fetchLead = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/leads/${id}`)
      setLead(res.data)
      setNewStatus(res.data.status)
    } catch (err) {
      console.log(err)
    }
  }

  const updateStatus = async () => {
    try {
      await axios.put(`http://localhost:5000/api/leads/${id}`, {
        status: newStatus
      })
      alert('Status updated!')
      fetchLead()
    } catch (err) {
      console.log(err)
    }
  }

  if (!lead) return <div style={styles.loading}>Loading...</div>

  return (
    <div style={styles.container}>
      <button onClick={() => navigate('/dashboard')} style={styles.backBtn}>
        ← Back to Dashboard
      </button>

      <div style={styles.card}>
        <h2 style={styles.title}>Lead Details</h2>
        
        <div style={styles.field}>
          <label style={styles.label}>Name:</label>
          <p style={styles.value}>{lead.name}</p>
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Email:</label>
          <p style={styles.value}>{lead.email}</p>
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Current Status:</label>
          <p style={styles.value}>
            <span style={getStatusStyle(lead.status)}>{lead.status}</span>
          </p>
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Created:</label>
          <p style={styles.value}>{new Date(lead.createdAt).toLocaleString()}</p>
        </div>

        <hr style={styles.divider} />

        <div style={styles.updateSection}>
          <h3 style={styles.subtitle}>Update Status</h3>
          <select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            style={styles.select}
          >
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Converted">Converted</option>
            <option value="Lost">Lost</option>
          </select>
          <button onClick={updateStatus} style={styles.updateBtn}>
            Update Status
          </button>
        </div>
      </div>
    </div>
  )
}

const getStatusStyle = (status) => {
  const colors = {
    'New': '#3498db',
    'Contacted': '#f39c12',
    'Qualified': '#9b59b6',
    'Converted': '#27ae60',
    'Lost': '#e74c3c'
  }
  return {
    padding: '8px 15px',
    borderRadius: '5px',
    background: colors[status] || '#95a5a6',
    color: '#fff',
    fontSize: '14px',
    fontWeight: 'bold'
  }
}

const styles = {
  container: {
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto'
  },
  backBtn: {
    padding: '10px 20px',
    background: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    marginBottom: '20px',
    cursor: 'pointer'
  },
  card: {
    background: '#fff',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  title: {
    marginBottom: '30px',
    fontSize: '24px'
  },
  field: {
    marginBottom: '20px'
  },
  label: {
    fontWeight: 'bold',
    display: 'block',
    marginBottom: '5px',
    color: '#666'
  },
  value: {
    fontSize: '16px'
  },
  divider: {
    margin: '30px 0',
    border: 'none',
    borderTop: '1px solid #eee'
  },
  updateSection: {
    marginTop: '20px'
  },
  subtitle: {
    marginBottom: '15px',
    fontSize: '18px'
  },
  select: {
    width: '100%',
    padding: '12px',
    marginBottom: '15px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '14px'
  },
  updateBtn: {
    width: '100%',
    padding: '12px',
    background: '#27ae60',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  loading: {
    textAlign: 'center',
    padding: '50px',
    fontSize: '18px'
  }
}

export default LeadDetails