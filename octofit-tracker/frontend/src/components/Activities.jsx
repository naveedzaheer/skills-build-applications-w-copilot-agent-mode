import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

function formatDate(value) {
  return value ? new Date(value).toLocaleDateString() : 'Recent'
}

function Activities() {
  const [activities, setActivities] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let ignore = false

    fetchCollection('activities')
      .then((data) => {
        if (!ignore) {
          setActivities(data)
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
    return <p className="text-secondary">Loading activities...</p>
  }

  if (status === 'error') {
    return <p className="text-danger">Unable to load activities.</p>
  }

  return (
    <div className="table-responsive app-card p-0">
      <table className="table align-middle mb-0">
        <thead>
          <tr>
            <th>Activity</th>
            <th>User</th>
            <th>Duration</th>
            <th>Calories</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => (
            <tr key={activity._id}>
              <td>{activity.activityType}</td>
              <td>{activity.user?.displayName || 'OctoFit user'}</td>
              <td>{activity.durationMinutes} min</td>
              <td>{activity.caloriesBurned}</td>
              <td>{formatDate(activity.loggedAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Activities
