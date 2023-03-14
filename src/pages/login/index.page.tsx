import { Heading, Text, TextInput, Button } from '@ignite-ui/react'
import {
  ButtonContainer,
  Container,
  Form,
  Header,
  Line,
  LogimMenssage,
  SocialButton,
} from './styles'
import { ArrowRight } from 'phosphor-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFacebook,
  faGithub,
  faGoogle,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons'
import { getSession, signIn, useSession } from 'next-auth/react'
import { GetServerSideProps } from 'next'


function Login() {
  const { data: session } = useSession()
  return (
    <>
      <Container>
        <Header>
          <Heading as="strong">Sing in to your account</Heading>
        </Header>
        <Form as="form">
          <label>
            <Text size="sm">Email address</Text>
            <TextInput placeholder="Enter your Email" />
          </label>
          <label>
            <Text size="sm">Password</Text>
            <TextInput placeholder="Enter your password" />
          </label>

          <Button type="submit">
            Sign in
            <ArrowRight />
          </Button>
          <LogimMenssage>
            <Line />
            <Text size="sm">Or continue with</Text>
            <Line />
          </LogimMenssage>
          <ButtonContainer>
            <SocialButton onClick={(e) => { e.preventDefault(); signIn('linkedin') }}>
              <FontAwesomeIcon icon={faLinkedin} />
            </SocialButton>
            <SocialButton onClick={(e) => { e.preventDefault(); signIn('github') }}>
              <FontAwesomeIcon icon={faGithub} />
            </SocialButton>
            <SocialButton onClick={(e) => { e.preventDefault(); signIn('google') }}>
              <FontAwesomeIcon icon={faGoogle} />
            </SocialButton>
          </ButtonContainer>
          <Line />
        </Form>
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)
  // console.log(session)
  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return {
    props: {
      session: session,
    },
  }
}


export default Login
