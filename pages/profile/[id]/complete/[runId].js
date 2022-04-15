import RunCompletionForm from "../../../../components/RunCompletionForm";
import { useRouter } from "next/router"

function Complete() {
    const router = useRouter();
    const id = parseInt(router.query.id, 10)
    const runId = parseInt(router.query.runId, 10)

  return (
    <RunCompletionForm id={id} runId={runId}/>
  )
}

export default Complete