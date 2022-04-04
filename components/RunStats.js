function RunStats({user}) {

    const {id, firstName, lastName, scheduledRuns} = user;

    const dateLimit = (length) => {
        const date = new Date()
        if (length === 'week') date.setDate(date.getDate() - 7)
        if (length === 'month') date.setMonth(date.getMonth() - 1)
        date.setHours(0)
        date.setMinutes(0)
        date.setSeconds(0)
        date.setMilliseconds(0)
        return date.toISOString()
    }

    const filteredRuns = (length) => scheduledRuns.filter(run => {
        // filter runs that have been completed within the specified timeframe
        return run.completedRun && run.date >= dateLimit(length)
    })

    // initialize arrays of objects containing runs within specified timeframe
    const weekRuns = filteredRuns('week');
    const monthRuns = filteredRuns('month');
    const allRuns = scheduledRuns.filter(run => run.completedRun);

    const averageLength = (runsArr) => {
        let totalDistance = 0;
        runsArr.forEach(run => totalDistance += run.completedRun.realDistance)
        return totalDistance/runsArr.length
    }

    const averagePace = (runsArr) => {
        let totalMinutes = 0;
        let totalSeconds = 0;
        runsArr.forEach(run => {
            totalMinutes += run.completedRun.paceMinutes
            totalSeconds += run.completedRun.paceSeconds
        })
        const averageMins = (totalMinutes + totalSeconds/60)/runsArr.length
        const min = Math.floor(averageMins);
        const sec = Math.round((averageMins * 60) % 60);
        return min + ":" + (sec < 10 ? "0" : "") + sec;
    }

    const averageCalories = (runsArr) => {
        let totalCalories = 0;
        runsArr.forEach(run => totalCalories += run.completedRun.calories)
        return totalCalories/runsArr.length
    }

    const averageRating = (runsArr) => {
        let totalRating = 0;
        runsArr.forEach(run => totalRating += run.completedRun.rating)
        return totalRating/runsArr.length
    }

    const percentCompleted = (runsArr, length) => {
        const totalScheduled = scheduledRuns.filter(run => run.date >= dateLimit(length)).length
        return Math.round(runsArr.length/totalScheduled * 100)
    }

console.log(averageRating(monthRuns))
    // console.log(averae)
    // 604800000
    return (
        <div>
            <ul>
                <li>Average Run Length (Week): {averageLength(weekRuns)}</li>
                <li>Average Run Length (Month): {averageLength(monthRuns)}</li>
                <li>Average Run Length (All Time): {averageLength(allRuns)}</li>
                <li>Average Run Pace (Week): {averagePace(weekRuns)}</li>
                <li>Average Run Pace (Month): {averagePace(monthRuns)}</li>
                <li>Average Run Pace (All Time): {averagePace(allRuns)}</li>
                <li>Average Run Calories (Week): {averageCalories(weekRuns)}</li>
                <li>Average Run Calories (Month): {averageCalories(monthRuns)}</li>
                <li>Average Run Calories (All Time): {averageCalories(allRuns)}</li>
                <li>Average Run Rating (Week): {averageRating(weekRuns)}</li>
                <li>Average Run Rating (Month): {averageRating(monthRuns)}</li>
                <li>Average Run Rating (All Time): {averageRating(allRuns)}</li>
                <li>Percent of Runs Completed (Week): {percentCompleted(weekRuns, 'week')}</li>
                <li>Percent of Runs Completed (Month): {percentCompleted(monthRuns, 'month')}</li>
                <li>Percent of Runs Completed (All Time): {Math.round(allRuns.length/scheduledRuns.length * 100)}</li>
            </ul>
        </div>
    )
}

export default RunStats