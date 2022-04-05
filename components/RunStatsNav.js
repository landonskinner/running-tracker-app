function RunStatsNav({setPeriod}) {
  return (
      <div>
        <button name="all" onClick={(e) => setPeriod(e.target.name)}>Average All-Time Stats</button>
        <button name="month" onClick={(e) => setPeriod(e.target.name)}>Average Monthly Stats</button>
        <button name="week" onClick={(e) => setPeriod(e.target.name)}>Average Weekly Stats</button>
      </div>
  )
}

export default RunStatsNav;
