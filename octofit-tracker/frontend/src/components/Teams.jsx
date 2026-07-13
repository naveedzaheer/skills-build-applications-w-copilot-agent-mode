import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

function Teams() {
  const [teams, setTeams] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let ignore = false

    fetchCollection('teams')
      .then((data) => {
        if (!ignore) {
          setTeams(data)
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
    return <p className="text-secondary">Loading teams...</p>
  }

  if (status === 'error') {
    return <p className="text-danger">Unable to load teams.</p>
  }

  return (
    <div className="row g-3">
      {teams.map((team) => (
        <div className="col-lg-6" key={team._id || team.name}>
          <article className="app-card h-100">
            <div className="d-flex justify-content-between gap-3">
              <div>
                <p className="eyebrow mb-2">{team.mascot}</p>
                <h2 className="h4">{team.name}</h2>
              </div>
              <span className="metric">{team.weeklyGoalMinutes}</span>
            </div>
            <p className="text-secondary mb-0">{team.motto}</p>
            <p className="small text-uppercase text-secondary mt-3 mb-0">
              weekly goal minutes
            </p>
          </article>
        </div>
      ))}
    </div>
  )
}

export default Teams
{/* -8000.app.github.dev/api/teams */}