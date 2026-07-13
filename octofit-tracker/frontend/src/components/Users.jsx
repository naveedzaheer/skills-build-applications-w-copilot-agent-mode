import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

function Users() {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let ignore = false

    fetchCollection('users')
      .then((data) => {
        if (!ignore) {
          setUsers(data)
          setStatus('ready')
        }
      })
      .catch(() => {
        if (!ignore) {
          setStatus('error')
        }
      })

    return () => {
      ignore = true
    }
  }, [])

  if (status === 'loading') {
    return <p className="text-secondary">Loading users...</p>
  }

  if (status === 'error') {
    return <p className="text-danger">Unable to load users.</p>
  }

  return (
    <div className="row g-3">
      {users.map((user) => (
        <div className="col-md-6 col-xl-4" key={user._id || user.username}>
          <article className="app-card h-100">
            <div className="d-flex align-items-center gap-3">
              <img
                className="avatar"
                src={user.profileImage}
                alt={user.displayName || user.username}
              />
              <div>
                <h2 className="h5 mb-1">{user.displayName || user.username}</h2>
                <p className="text-secondary mb-0">@{user.username}</p>
              </div>
            </div>
            <p className="mt-3 mb-2">{user.fitnessGoal}</p>
            <span className="badge text-bg-success">
              {user.team?.name || 'Independent'}
            </span>
          </article>
        </div>
      ))}
    </div>
  )
}

export default Users
{/* -8000.app.github.dev/api/users */}