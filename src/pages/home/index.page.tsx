import { Heading } from '@ignite-ui/react'
import { GetServerSideProps } from 'next'
import { getSession, signOut } from 'next-auth/react'
import { Session } from 'next-auth'

// Import the header styled components
import {
  Container,
  Form,
  Header,
  HeaderInfo,
  HeaderTitle,
  NameAndEmail,
  ProfilePhoto,
  SignOutButton,

} from './styles'

interface HomeProps {
  session: Session | null
}

export default function Home({ session }: HomeProps) {

  const { user } = session || {}
  console.log(user)

  return (
    <>
      <Header>
        <HeaderTitle>
          Cadastro
        </HeaderTitle>
        <HeaderInfo>
          <NameAndEmail>
            <p>{user?.name}</p>
            <SignOutButton onClick={() => signOut()}>Sign out</SignOutButton>
          </NameAndEmail>
          <ProfilePhoto>
            {user?.image && (<img src={user?.image} style={{ borderRadius: '50%', maxWidth: '40px', maxHeight: '40px' }} alt="" />)}
          </ProfilePhoto>
        </HeaderInfo>
      </Header>
      <Container>
        <Form>
          forme
        </Form>
      </Container>
    </>
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
