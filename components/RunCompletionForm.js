import {useState, useEffect} from 'react'

function RunCompletionForm({id, runId}) {
//     console.log(id)
//     useEffect(() => {
//     fetch(`/api/user/${id}`)
//     .then(resp => resp.json())
//     .then(data => {
//       const runs
//     })
//   }, [])



const [completedRun, setCompletedRun] = useState({
    realDistance: 0,
    paceMinutes: 0,
    paceSeconds: 0,
    calories: 0,
    rating: 1
})

const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/completedRun', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({...completedRun, scheduledRunId: runId})
    })
    .then(resp => resp.json())
    .then(console.log)
}


return (
<form onSubmit={(e) => handleSubmit(e)}>
  <label for="realDistance">Distance:</label>
  <input type="number" step={0.25} name="realDistance" onChange={(e) => setCompletedRun({...completedRun, [e.target.name]: parseFloat(e.target.value)})} value={completedRun.realDistance}></input>
  <label for="paceMinutes">Pace:</label>
  <input type="number" name="paceMinutes" onChange={(e) => setCompletedRun({...completedRun, [e.target.name]: parseInt(e.target.value)})} value={completedRun.paceMinutes}></input>:
  <input type="number" name="paceSeconds" onChange={(e) => setCompletedRun({...completedRun, [e.target.name]: parseInt(e.target.value)})} value={completedRun.paceSeconds}></input>
  <label for="calories">Calories:</label>
  <input type="number" name="calories" onChange={(e) => setCompletedRun({...completedRun, [e.target.name]: parseInt(e.target.value)})} value={completedRun.calories}></input>
  <label for="rating">Rating:</label>
  <input type="number" name="rating" onChange={(e) => setCompletedRun({...completedRun, [e.target.name]: parseInt(e.target.value)})} value={completedRun.rating}></input>
  <button type="submit">Schedule</button>
</form>
);

}

export default RunCompletionForm