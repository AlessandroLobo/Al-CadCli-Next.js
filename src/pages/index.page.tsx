import { Heading } from '@ignite-ui/react'
import { Session } from 'next-auth'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

interface HomeProps {
  session: Session | null
}

export default function index({ session }: HomeProps) {

  const router = useRouter();

  useEffect(() => {
    router.push('/login')
  }, [])

  return (
    <Heading as="h1"></Heading>
  )
}
