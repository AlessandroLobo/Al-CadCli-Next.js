import { useState } from 'react'
import { GetServerSideProps } from 'next'
import { getSession, signOut, useSession } from 'next-auth/react'
import { Session } from 'next-auth'
import { Container, ContainerList, Form, FormError, HeaderTitle, Line, TableResult, Tbody, Text, TextInputContainer } from './styles'
import { Button, TextInput } from '@ignite-ui/react'
import axios from 'axios'
import { cpfMask, phoneMask } from '@/src/utils/maskUtils'

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
        <ContainerList>
          <TextInputContainer>
            <Text>Pesquise por Nome ou Cpf:</Text>
            <TextInput onChange={handleSearch} id="search-input" placeholder="Digite seu nome completo" />
          </TextInputContainer>
          <Button onClick={handleSearch} style={{ marginTop: 17, marginBottom: 10, width: '100%' }}>

            Buscar
          </Button>
          {!!searchResults.length && (
            <Tbody>
              <HeaderTitle>
                <tr>
                  <td style={{ width: '255px' }}>NOME:</td>
                  <td style={{ width: '150px' }}>TELEFONE:</td>
                  <td style={{ width: '185px' }}>CPF:</td>
                  <td style={{ width: '215px' }} >E-MAIL:</td>
                </tr>
              </HeaderTitle>
              <Line />
              <TableResult>
                {searchResults.map((clients) => (
                  <tr key={clients.id}>
                    <td style={{ width: '350px' }}>{clients.name}</td>
                    <td style={{ width: '195px' }} data-original-value={clients.phoneNumber} contentEditable={true} onBlur={(e) => {
                      const originalValue = e.target.getAttribute('data-original-value') ?? '';
                      const maskedValue = cpfMask(originalValue)
                      e.target.innerHTML = maskedValue
                    }}>
                      {phoneMask(clients.phoneNumber)}
                    </td>
                    <td style={{ width: '185px' }} data-original-value={clients.cpf} contentEditable={true} onBlur={(e) => {
                      const originalValue = e.target.getAttribute('data-original-value') ?? '';
                      const maskedValue = cpfMask(originalValue)
                      e.target.innerHTML = maskedValue
                    }}>
                      {cpfMask(clients.cpf)}
                    </td>
                    {/* <td style={{ width: '185px' }}></td> */}
                    <td style={{ width: '215px' }} >{clients.email}</td>
                  </tr>
                ))}
              </TableResult>
            </Tbody>
          )}
        </ContainerList>
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
