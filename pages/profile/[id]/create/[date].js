import RunScheduleForm from "../../../../components/RunScheduleForm";
import { useRouter } from "next/router"

function Create() {

    const router = useRouter();
    const id = parseInt(router.query.id, 10)
    const date = router.query.date

  return (
    <RunScheduleForm id={id} date={date}/>
  )
}

export default Create
