import Head from 'next/head'
import styles from '../styles/Home.module.css'
import prisma from '../lib/prisma';
import { useSession, signIn, signOut } from "next-auth/react"

export default function Home(props) {

  // const users = JSON.parse(props.users)
  
  // const renderUsers = users.map((user) => {
  //   return (
  //     <>
  //       <div key={user.id}>{user.name}</div>
  //       <div>{user.runs[0].distance}</div>
  //     </>
  //   )
  // })

  // return (
  //   <div className={styles.container}>
  //     <Head>
  //       <title>Running Tracker</title>
  //       <meta name="description" content="Running tracker" />
  //       <link rel="icon" href="/favicon.ico" />
  //     </Head>
  //     {renderUsers}
  //   </div>
  // )
  const { data: session } = useSession()

  console.log(session)
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}

export async function getStaticProps() {
  let users = await prisma.user.findMany({
    include: {
      runs: true
    },
  });
  users = JSON.stringify(users)
  return { props: { users } };
}
