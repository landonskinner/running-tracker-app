import styles from "../styles/RunStats.module.css";

function RunStats({ user, period }) {
  const { id, firstName, lastName, scheduledRuns } = user;

  const dateLimit = (period) => {
    const date = new Date();
    if (period === "week") date.setDate(date.getDate() - 7);
    if (period === "month") date.setMonth(date.getMonth() - 1);
    if (period === "all") return date.toISOString();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date.toISOString();
  };

  const filteredRuns = (period) =>
    scheduledRuns.filter((run) => {
      // filter runs that have been completed within the specified timeframe
      if (period === "all") return run.completedRun;
      console.log(dateLimit(period))
      return run.completedRun && run.date >= dateLimit(period);
    });

  // initialize array of objects containing runs within specified period
  const completedRuns = filteredRuns(period);

  const noDataMsg = "---";

  const averageLength = (runsArr) => {
    if (!runsArr.length) return noDataMsg;
    let totalDistance = 0;
    runsArr.forEach((run) => (totalDistance += run.completedRun.realDistance));
    return totalDistance / runsArr.length;
  };

  const averagePace = (runsArr) => {
    if (!runsArr.length) return noDataMsg;
    let totalMinutes = 0;
    let totalSeconds = 0;
    runsArr.forEach((run) => {
      totalMinutes += run.completedRun.paceMinutes;
      totalSeconds += run.completedRun.paceSeconds;
    });
    const averageMins = (totalMinutes + totalSeconds / 60) / runsArr.length;
    const min = Math.floor(averageMins);
    const sec = Math.round((averageMins * 60) % 60);
    return min + ":" + (sec < 10 ? "0" : "") + sec;
  };

  const averageCalories = (runsArr) => {
    if (!runsArr.length) return noDataMsg;
    let totalCalories = 0;
    runsArr.forEach((run) => (totalCalories += run.completedRun.calories));
    return totalCalories / runsArr.length;
  };

  const averageRating = (runsArr) => {
    if (!runsArr.length) return noDataMsg;
    let totalRating = 0;
    runsArr.forEach((run) => (totalRating += run.completedRun.rating));
    return totalRating / runsArr.length;
  };

  const percentCompleted = (runsArr, period) => {
    let totalScheduled;
    if (period === "all") {
      totalScheduled = scheduledRuns.filter(
        (run) => run.date < new Date().toISOString()
      ).length;
    } else {
      totalScheduled = scheduledRuns.filter(
        (run) =>
          run.date >= dateLimit(period) && run.date < new Date().toISOString()
      ).length;
    }
    if (!totalScheduled) return noDataMsg;
    return Math.round((runsArr.length / totalScheduled) * 100) + "%";
  };

  const periodNameStyled = period[0].toUpperCase() + period.slice(1);

  return (
    <div className={styles.list}>
      <div className={styles.statContainer}>
        <div className={styles.statTitle}>Length</div>
        <span className={styles.data}>{averageLength(completedRuns)}</span>
      </div>
      <div className={styles.statContainer}>
        <div className={styles.statTitle}>Pace</div>
        <span className={styles.data}>{averagePace(completedRuns)}</span>
      </div>
      <div className={styles.statContainer}>
        <div className={styles.statTitle}>Calories</div>
        <span className={styles.data}>{averageCalories(completedRuns)}</span>
      </div>
      <div className={styles.statContainer}>
        <div className={styles.statTitle}>Rating</div>
        <span className={styles.data}>{averageRating(completedRuns)}</span>
      </div>
      <div className={styles.statContainer}>
        <div className={styles.statTitle}>Completion Percentage</div>
        <span className={styles.data}>
          {percentCompleted(completedRuns, period)}
        </span>
      </div>
    </div>
  );
}

export default RunStats;
