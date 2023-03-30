import { Heading } from '@ignite-ui/react'
import { GetServerSideProps } from 'next'
import { getSession, signOut } from 'next-auth/react'
import { Session } from 'next-auth'
import { useEffect } from 'react';
import { useRouter } from 'next/router';

interface HomeProps {
  session: Session | null
}

export default function Home({ session }: HomeProps) {

  const router = useRouter();

  useEffect(() => {
    if (session) {
      window.location.replace('/registrationSearch');
    } else {
      window.location.replace('/login');
    }
  }, [session]);

  return null;
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
