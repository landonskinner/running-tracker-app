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

// export async function getStaticProps(context) {
//     console.log(context)
//     const userId = parseInt(context.params.id, 10);
  
//     // let user = await prisma.user.findUnique({
//     //   where: {
//     //     id: userId,
//     //   },
//     //   include: {
//     //       scheduledRuns: {
//     //           include: {
//     //               completedRun: true
//     //           }
//     //       }
//     //   },
//     // });
//     // user = JSON.stringify(user);
//     return {
//       props: {
//         userId,
//       },
//     };
//   }