import Head from "next/head";
import styles from "../../../styles/Profile.module.css";
import prisma from "../../../lib/prisma";

export default function Profile(props) {

  let user = JSON.parse(props.user)

  const {id, firstName, email, scheduledRuns} = user;

  const renderRuns = scheduledRuns.map(run => {
      return (
          <div key={run.id} >Distance: {run.distance}</div>
      )
  })

  return (
    <div className={styles.container}>
      <Head>
        <title>{firstName}'s Page</title>
        <meta name="description" content="Running tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>{firstName}'s Page</h1>
      {renderRuns}
    </div>
  );
}

export async function getStaticPaths() {
  let users = await prisma.user.findMany();

  return {
    fallback: false,
    paths: users.map((user) => ({
      params: { id: user.id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const userId = parseInt(context.params.id, 10);

  let user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
        scheduledRuns: {
            include: {
                completedRun: true
            }
        }
    },
  });
  user = JSON.stringify(user);
  return {
    props: {
      user,
    },
  };
}
