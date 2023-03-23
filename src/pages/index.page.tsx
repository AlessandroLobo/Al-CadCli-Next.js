import { Heading } from '@ignite-ui/react'
import { Session } from 'next-auth'

interface HomeProps {
  session: Session | null
}

export default function index({ session }: HomeProps) {

  return (

    <Heading as="h1">Index</Heading>
  )
}
