import { GetServerSideProps } from 'next'
import { getSession, signOut } from 'next-auth/react'
import { Session } from 'next-auth'
import { Button, Text, TextInput } from '@ignite-ui/react';
import { ArrowRight } from 'phosphor-react';
import {
  Container,
  Form,
  FormDataTelSexo,
  FormError,
  Header,
  HeaderInfo,
  HeaderTitle,
  Line,
  NameAndEmail,
  ProfilePhoto,
  SignOutButton,
  TextInputContainer,
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
          <label>
            <Text size="sm">Nome:</Text>
            <TextInput
              placeholder="Enter your Name"
            />
            <FormError>
              <Text>
              </Text>
            </FormError>
            <FormDataTelSexo>
              <TextInputContainer>
                <Text size="sm">CPF:</Text>
                <TextInput
                  placeholder="Enter your Name"
                  style={{ width: '100%' }}
                />
              </TextInputContainer>
              <TextInputContainer>
                <Text size="sm">E-Mail:</Text>
                <TextInput
                  placeholder="Enter your Name"
                  style={{ width: '100%' }}
                />
              </TextInputContainer>
            </FormDataTelSexo>
          </label>
          {/* Grupo data nasc telefone sexo */}
          <FormDataTelSexo>
            <TextInputContainer>
              <Text size="sm">Data de Nascimento:</Text>
              <TextInput
                placeholder="Enter your Name"
                style={{ width: '100%' }}
              />
            </TextInputContainer>
            <TextInputContainer>
              <Text size="sm">Telefone:</Text>
              <TextInput
                placeholder="Enter your Name"
                style={{ width: '100%' }}
              />
            </TextInputContainer>
            <TextInputContainer>
              <Text size="sm">Sexo:</Text>
              <TextInput
                placeholder="Enter your Name"
                style={{ width: '100%' }}
              />
            </TextInputContainer>

          </FormDataTelSexo>
          <Line />
          <FormDataTelSexo>
            <TextInputContainer>
              <Text size="sm">CEP:</Text>
              <TextInput
                placeholder="Enter your Name"
                style={{ width: '100%' }}
              />
            </TextInputContainer>
            <TextInputContainer>
              <Text size="sm">Cidade:</Text>
              <TextInput
                placeholder="Enter your Name"
                style={{ width: '100%' }}
              />
            </TextInputContainer>
          </FormDataTelSexo>

          <FormDataTelSexo>
            <TextInputContainer>
              <Text size="sm">Endereço:</Text>
              <TextInput
                placeholder="Enter your Name"
                style={{ width: '100%' }}
              />
            </TextInputContainer>
            <TextInputContainer>
              <Text size="sm">Estado:</Text>
              <TextInput
                placeholder="Enter your Name"
                style={{ width: '100%' }}
              />
            </TextInputContainer>
          </FormDataTelSexo>
          <Line />
          <Button type="submit" style={{ marginTop: 27, marginBottom: 20 }}>
            CADASTRAR
            <ArrowRight />
          </Button>
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
