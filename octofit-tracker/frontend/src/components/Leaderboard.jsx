import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let ignore = false

    fetchCollection('leaderboard')
      .then((data) => {
        if (!ignore) {
          setLeaderboard(data)
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
    return <p className="text-secondary">Loading leaderboard...</p>
  }

  if (status === 'error') {
    return <p className="text-danger">Unable to load leaderboard.</p>
  }

  return (
    <div className="stacked-list">
      {leaderboard.map((entry) => (
        <article className="app-card leaderboard-row" key={entry._id}>
          <span className="rank">#{entry.rank}</span>
          <div>
            <h2 className="h5 mb-1">{entry.user?.displayName || 'OctoFit athlete'}</h2>
            <p className="text-secondary mb-0">{entry.team?.name || 'No team'}</p>
          </div>
          <div className="ms-auto text-end">
            <strong>{entry.points}</strong>
            <p className="text-secondary mb-0">{entry.streakDays} day streak</p>
          </div>
        </article>
      ))}
    </div>
  )
}

export default Leaderboard
