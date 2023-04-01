import { useState } from 'react'
import { GetServerSideProps } from 'next'
import { getSession, signOut, useSession } from 'next-auth/react'
import { Session } from 'next-auth'
import { Container, Form, FormError, Text, TextInputContainer } from './styles'
import { Button, TextInput } from '@ignite-ui/react'
import axios from 'axios'

interface HomeProps {
  session: Session | null
}

async function searchUsers(searchTerm: string): Promise<any> {
  const response = await axios.get('/api/search', {
    params: {
      search: searchTerm,
    },
  })
  return response.data
}

export default function RegistrationSearch({ session }: HomeProps) {
  const [searchResults, setSearchResults] = useState<any[]>([])
  // const { user } = session || {}
  const userLogin = useSession()

  async function handleSearch() {
    const searchTerm = (document.querySelector('#search-input') as HTMLInputElement)?.value || ''
    const clients = await searchUsers(searchTerm)
    setSearchResults(clients)
  }

  return (
    <Container>
      <Form>
        <TextInputContainer>
          <Text>Pesquise por Nome ou Cpf:</Text>
          <TextInput id="search-input" placeholder="Digite seu nome completo" />
        </TextInputContainer>
        <Button onClick={handleSearch} style={{ marginTop: 27, marginBottom: 20 }}>
          Buscar
        </Button>
        {!!searchResults.length && (
          <ul>
            {searchResults.map((clients) => (
              <li key={clients.id}>{clients.name}</li>
            ))}
          </ul>
        )}
      </Form>

    </Container>
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
