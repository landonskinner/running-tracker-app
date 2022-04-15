import {useState, useEffect} from 'react'

function RunScheduleForm({ id, date }) {

  // useEffect(() => {
  //   fetch(`/api/user/${id}`)
  //   .then(resp => resp.json())
  //   .then(data => {
  //     const runs
  //   })
  // }, [])

  const [scheduledRun, setScheduledRun] = useState({
    distance: 0,
    paceMinutes: 0,
    paceSeconds: 0
})

const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/scheduledRun', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({...scheduledRun, userId: id, date: new Date(date).toISOString()})
    })
    .then(resp => resp.json())
    .then(console.log)
}


return (
<form onSubmit={(e) => handleSubmit(e)}>
  <label for="distance">Distance:</label>
  <input type="number" step={0.25} name="distance" onChange={(e) => setScheduledRun({...scheduledRun, [e.target.name]: parseFloat(e.target.value)})} value={scheduledRun.distance}></input>
  <label for="paceMinutes">Pace:</label>
  <input type="number" name="paceMinutes" onChange={(e) => setScheduledRun({...scheduledRun, [e.target.name]: parseInt(e.target.value)})} value={scheduledRun.paceMinutes}></input>:
  <input type="number" name="paceSeconds" onChange={(e) => setScheduledRun({...scheduledRun, [e.target.name]: parseInt(e.target.value)})} value={scheduledRun.paceSeconds}></input>
  <button type="submit">Schedule</button>
</form>


);
}

export default RunScheduleForm;
