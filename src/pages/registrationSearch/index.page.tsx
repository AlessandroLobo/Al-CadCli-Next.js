import { useState } from 'react'
import { GetServerSideProps } from 'next'
import { getSession, signOut, useSession } from 'next-auth/react'
import { Session } from 'next-auth'
import { Container, ContainerList, Form, FormError, HeaderTitle, Line, TableResult, Tbody, Text, TextInputContainer } from './styles'
import { Button, TextInput } from '@ignite-ui/react'
import axios from 'axios'
import { cpfMask, phoneMask } from '@/src/utils/maskUtils'
import RegistrationEdit from '../components/RegistrationEdit/registrationEdit'



interface HomeProps {
  session: Session | null
}
interface Clients {
  id: string;
  name: string;
  phoneNumber: string;
  cpf: string;
  email: string;
}

interface RegistrationEditProps {
  clientId: string;
  setModalOpen: (isOpen: boolean) => void;
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
  const [editVisible, setEditVisible] = useState(false); // Estado para controlar a visibilidade do componente RegistrationEdit
  const [selectedClients, setSelectedClients] = useState<any>(null); // Estado para armazenar o cliente selecionado na tabela

  async function handleSearch() {
    const searchTerm = (document.querySelector('#search-input') as HTMLInputElement)?.value || ''
    const clients = await searchUsers(searchTerm)
    setSearchResults(clients)
  }

  function handleEdit(clientId: string) {
    setSelectedClients(clientId); // Armazena o cliente selecionado na tabela
    setEditVisible(true); // Exibe o componente RegistrationEdit
    console.log('RegistrationSearch======', clientId)
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
                  <td style={{ width: '40%' }}>NOME:</td>
                  <td style={{ width: '20%' }}>TELEFONE:</td>
                  <td style={{ width: '20%' }}>CPF:</td>
                  <td style={{ width: '20%' }}>E-MAIL:</td>
                </tr>
              </HeaderTitle>
              <Line />
              <TableResult>
                {searchResults.map((clients) => (
                  <tr key={clients.id}>
                    <td onClick={() => handleEdit(clients.id)} style={{ width: '50%', paddingLeft: '10px', textTransform: 'uppercase' }}>
                      {clients.name}
                    </td>
                    <td style={{ width: '20%' }}>
                      <input
                        type="text"
                        value={phoneMask(clients.phoneNumber)}
                        onChange={(event) => {
                          const maskedValue = cpfMask(event.target.value);
                          // Aqui você pode atualizar o valor no estado ou passar para outra função
                        }}
                      />
                    </td>
                    <td style={{ width: '20%' }}>
                      <input
                        type="text"
                        value={cpfMask(clients.cpf)}
                        onChange={(event) => {
                          const maskedValue = cpfMask(event.target.value);
                          // Aqui você pode atualizar o valor no estado ou passar para outra função
                        }}
                      />
                    </td>
                    <td style={{ width: '10%' }}>{clients.email}</td>
                  </tr>
                ))}
              </TableResult>
            </Tbody>

          )}
        </ContainerList>

        {editVisible && (
          <RegistrationEdit clientId={selectedClients} setModalOpen={setEditVisible} />
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
