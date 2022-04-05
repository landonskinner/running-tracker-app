import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

function RunCalendar({user}) {
  const [date, setDate] = useState(new Date());

  const { scheduledRuns } = user;
  console.log(scheduledRuns)
  const scheduledRunDates = scheduledRuns.map(run => new Date(run.date))
  console.log(scheduledRunDates)

  const formatRunDay = (date) => {
    //   console.log(date)
    // date = date.toISOString();
    let dayFormat;
    scheduledRunDates.filter(runDate => {
        console.log(runDate.getDate(), date.getDate(), date.getDate() === runDate.getDate())
        if (runDate.getDate() === date.getDate() && runDate.getMonth() === date.getMonth() && runDate.getFullYear() === date.getFullYear()) {
            dayFormat = <div style={{color: 'red'}}>{date.getDate()}</div>
        }
    })
      return dayFormat || date.getDate()
  }
    console.log(date.toISOString())
  return (
    <>
      <div className="calendar-container">
        <Calendar 
            onChange={setDate} 
            value={date} 
            onClickDay={(e) => console.log(e)}
            formatDay={(locale, date) => formatRunDay(date)}
        />
      </div>
      <p className="text-center">
        <span className="bold">Selected Date:</span> {date.toDateString()}
      </p>
    </>
  );
}

export default RunCalendar;
