import styles from "../styles/RunDetails.module.css";
import Link from 'next/link'

function RunDetails({ user, date }) {
  const { scheduledRuns } = user;
  const selectedRun = scheduledRuns.filter(
    (run) => new Date(run.date).toDateString() === date.toDateString()
  )[0];

  if (selectedRun) {
    const run = selectedRun?.completedRun;
    return (
      <>
        {run ? <div>Great job!</div> : <div>Run has not been completed!</div>}
        <div className={styles.list}>
          <p>
            Scheduled Pace:{" "}
            <span className={styles.data}>
              {selectedRun.paceMinutes}:{selectedRun.paceSeconds}
            </span>
          </p>
          <p>
            Scheduled Mileage:{" "}
            <span className={styles.data}>{selectedRun.distance}</span>
          </p>
          {run ? (
            <>
              <p>
                Actual Pace:{" "}
                <span className={styles.data}>
                  {run.paceMinutes}:{run.paceSeconds}
                </span>
              </p>
              <p>
                Actual Mileage:{" "}
                <span className={styles.data}>{run.realDistance}</span>
              </p>
              <p>
                Calories: <span className={styles.data}>{run.calories}</span>
              </p>
              <p>
                Rating: <span className={styles.data}>{run.rating}</span>
              </p>
            </>
          ) : null}
        </div>
      </>
    );
  }

  return (
    <>
      <div>Schedule a run for {date.toLocaleDateString()}!</div>
      <Link href={`/profile/${user.id}/create/${date}`}>Schedule</Link>
    </>
  );
}

export default RunDetails;
