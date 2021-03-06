import { useState } from "react";
import Head from "next/head";
import styles from "../../../styles/Profile.module.css";
import prisma from "../../../lib/prisma";
import RunStats from "../../../components/RunStats";
import RunStatsNav from "../../../components/RunStatsNav";
import RunCalendar from "../../../components/RunCalendar";


export default function Profile(props) {

    const [period, setPeriod] = useState('week')


  let user = JSON.parse(props.user)

  const {id, firstName, email, scheduledRuns} = user;

  return (
    <div className={styles.container}>
      <Head>
        <title>{firstName}'s Page</title>
        <meta name="description" content="Running tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>{firstName}'s Page</h1>
      <RunStatsNav setPeriod={setPeriod} />
      <RunStats user={user} period={period}/>
        <RunCalendar user={user}/>
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
