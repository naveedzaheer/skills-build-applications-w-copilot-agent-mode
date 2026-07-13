import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let ignore = false

    fetchCollection('workouts')
      .then((data) => {
        if (!ignore) {
          setWorkouts(data)
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
    return <p className="text-secondary">Loading workouts...</p>
  }

  if (status === 'error') {
    return <p className="text-danger">Unable to load workouts.</p>
  }

  return (
    <div className="row g-3">
      {workouts.map((workout) => (
        <div className="col-lg-4" key={workout._id || workout.title}>
          <article className="app-card h-100">
            <p className="eyebrow mb-2">{workout.focusArea}</p>
            <h2 className="h4">{workout.title}</h2>
            <div className="d-flex gap-2 flex-wrap my-3">
              <span className="badge text-bg-dark">{workout.difficulty}</span>
              <span className="badge text-bg-light">{workout.durationMinutes} min</span>
            </div>
            <p className="text-secondary">{workout.suggestedForGoal}</p>
            <ul className="mb-0 ps-3">
              {(workout.exercises || []).map((exercise) => (
                <li key={exercise}>{exercise}</li>
              ))}
            </ul>
          </article>
        </div>
      ))}
    </div>
  )
}

export default Workouts
{/* -8000.app.github.dev/api/workouts */}