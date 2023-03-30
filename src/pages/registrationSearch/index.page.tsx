import { GetServerSideProps } from 'next'
import { getSession, signOut } from 'next-auth/react'
import { Session } from 'next-auth'


interface HomeProps {
  session: Session | null
}
export default function registrationSeach({ session }: HomeProps) {
  const { user } = session || {}
  return (
    <h1>Pesquisa</h1>
  )
}

// Same as before
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
