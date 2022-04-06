import { useState } from "react";
import Calendar from "react-calendar";
import RunDetails from "./RunDetails";
import 'react-calendar/dist/Calendar.css';
import '../styles/RunCalendar.module.css'

function RunCalendar({user}) {
  const [date, setDate] = useState(new Date());

  const scheduledRunDates = user.scheduledRuns.map(run => {
      return {
          completedRun: run.completedRun,
          date: new Date(run.date)
      }
    })

  const formatRunDay = (date) => {
    let dayFormat;
    scheduledRunDates.forEach(runDate => {
        if (runDate.date.toDateString() === date.toDateString()) {    
            if (runDate.completedRun) {
                    dayFormat = <div style={{color: 'green'}}>{date.getDate()}</div>
                } else {
                    dayFormat = <div style={{color: 'red'}}>{date.getDate()}</div>
                }
        }
    })
      return dayFormat || <div>{date.getDate()}</div>
  }

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
          <RunDetails user={user} date={date} />
        {/* <span className="bold">Selected Date:</span> {date.toDateString()} */}
    </>
  );
}

export default RunCalendar;
