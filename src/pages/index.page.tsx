import { Heading } from '@ignite-ui/react'
import { GetServerSideProps } from 'next'
import { getSession, signOut } from 'next-auth/react'
import { Session } from 'next-auth'

interface HomeProps {
  session: Session | null
}

export default function Home({ session }: HomeProps) {
  const { user } = session || {}
  console.log(user)

  return (
    <>
      <Heading as="h1">Home</Heading>
      {user && (
        <>
          <p>Nome: {user.name}</p>
          <p>Email: {user.email}</p>
          <div>
            <button onClick={() => signOut()}>Sign out</button>
          </div>
          {user.image && <img src={user.image} style={{ borderRadius: '50%' }} alt="" />}
        </>
      )}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  return {
    props: {
      session,
    },
  }
}
