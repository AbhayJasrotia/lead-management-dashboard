import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Dashboard() {
  const [leads, setLeads] = useState([])
  const [stats, setStats] = useState({ total: 0, converted: 0, new: 0 })
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const navigate = useNavigate()

  useEffect(() => {
    fetchLeads()
  }, [search, statusFilter, page])

  const fetchLeads = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/leads`, {
        params: {
          search,
          status: statusFilter,
          page,
          limit: 10
        }
      })
      setLeads(res.data.leads)
      setTotalPages(res.data.pages)
      calculateStats(res.data.total)
    } catch (err) {
      console.log(err)
    }
  }

  const calculateStats = async (total) => {
    try {
      const allLeads = await axios.get('http://localhost:5000/api/leads?limit=1000')
      const converted = allLeads.data.leads.filter(l => l.status === 'Converted').length
      const newLeads = allLeads.data.leads.filter(l => l.status === 'New').length
      setStats({ total, converted, new: newLeads })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Lead Dashboard</h1>
        <button onClick={() => navigate('/login')} style={styles.logoutBtn}>Logout</button>
      </div>

      {/* Stats Cards */}
      <div style={styles.statsContainer}>
        <div style={styles.statCard}>
          <h3>{stats.total}</h3>
          <p>Total Leads</p>
        </div>
        <div style={styles.statCard}>
          <h3>{stats.converted}</h3>
          <p>Converted</p>
        </div>
        <div style={styles.statCard}>
          <h3>{stats.new}</h3>
          <p>New Leads</p>
        </div>
      </div>

      {/* Filters */}
      <div style={styles.filters}>
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={styles.select}
        >
          <option value="">All Status</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Converted">Converted</option>
          <option value="Lost">Lost</option>
        </select>
      </div>

      {/* Leads Table */}
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {leads.map(lead => (
              <tr key={lead._id} style={styles.tableRow}>
                <td style={styles.td}>{lead.name}</td>
                <td style={styles.td}>{lead.email}</td>
                <td style={styles.td}>
                  <span style={getStatusStyle(lead.status)}>{lead.status}</span>
                </td>
                <td style={styles.td}>{new Date(lead.createdAt).toLocaleDateString()}</td>
                <td style={styles.td}>
                  <button
                    onClick={() => navigate(`/lead/${lead._id}`)}
                    style={styles.viewBtn}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div style={styles.pagination}>
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          style={styles.pageBtn}
        >
          Previous
        </button>
        <span style={styles.pageInfo}>Page {page} of {totalPages}</span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          style={styles.pageBtn}
        >
          Next
        </button>
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
    padding: '5px 10px',
    borderRadius: '5px',
    background: colors[status] || '#95a5a6',
    color: '#fff',
    fontSize: '12px',
    fontWeight: 'bold'
  }
}

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px'
  },
  logoutBtn: {
    padding: '10px 20px',
    background: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontWeight: 'bold'
  },
  statsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
    marginBottom: '30px'
  },
  statCard: {
    background: '#fff',
    padding: '30px',
    borderRadius: '10px',
    textAlign: 'center',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  },
  filters: {
    display: 'flex',
    gap: '15px',
    marginBottom: '20px'
  },
  searchInput: {
    flex: 1,
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '14px'
  },
  select: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '14px',
    width: '200px'
  },
  tableContainer: {
    background: '#fff',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  tableHeader: {
    background: '#000',
    color: '#fff'
  },
  th: {
    padding: '15px',
    textAlign: 'left',
    fontWeight: 'bold'
  },
  tableRow: {
    borderBottom: '1px solid #eee'
  },
  td: {
    padding: '15px'
  },
  viewBtn: {
    padding: '8px 15px',
    background: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '12px'
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
    marginTop: '30px'
  },
  pageBtn: {
    padding: '10px 20px',
    background: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '5px'
  },
  pageInfo: {
    fontSize: '14px'
  }
}

export default Dashboard
