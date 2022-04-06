import styles from '../styles/RunDetails.module.css'

function RunDetails({user, date}) {
    console.log(user, date)

    const { scheduledRuns } = user;
    const selectedRun = scheduledRuns.filter(run => new Date(run.date).toDateString() === date.toDateString())[0]


    if (selectedRun?.completedRun) {
        const run = selectedRun.completedRun
        return (
            <div className={styles.list}>
                <p>Scheduled Pace: <span>{selectedRun.paceMinutes}:{selectedRun.paceSeconds}</span></p>
                <p>Scheduled Mileage: <span>{selectedRun.distance}</span></p>
                <p>Actual Pace: <span>{run.paceMinutes}:{run.paceSeconds}</span></p>
                <p>Actual Mileage: <span>{run.realDistance}</span></p>
                <p>Calories: <span>{run.calories}</span></p>
                <p>Rating: <span>{run.rating}</span></p>
            </div>
        )
    }

    if (selectedRun) return <div>oh...run</div>

  return (
    <div>hey</div>
  )
}

export default RunDetails