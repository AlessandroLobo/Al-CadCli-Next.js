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
  Option,
  ProfilePhoto,
  Select,
  SignOutButton,
  TextInputContainer,
} from './styles'
import { useGenres } from '@/src/hooks/useGenres';
import { useState } from 'react';
import { getAddress } from '@/src/hooks/getAddress';

interface HomeProps {
  session: Session | null
}

interface Genres {
  id: number;
  value: string;
  label: string;
}

export default function Home({ session }: HomeProps) {

  const [addressInfo, setAddressInfo] = useState({ city: '', address: '', state: '' });
  const [error, setError] = useState('');

  async function handleGetAddressBlur(event: React.FocusEvent<HTMLInputElement>) {
    try {
      // Chama a função getAddress para buscar as informações de endereço com base no CEP informado pelo usuário
      const zipCode = event.currentTarget.value.replace(/\D/g, '');
      const addressInfo = await getAddress(zipCode);

      console.log('Endereço retornado pela API:', addressInfo);

      if (!addressInfo) {
        setError('Invalid Zip Code');
        return;
      }
      // Atualiza o estado com as informações de endereço retornadas pela API
      setAddressInfo(addressInfo);
      // ...código omitido para simplificar
    } catch (error) {
      console.log(error)
      setError('Something went wrong')
    }
  }

  const genres: Genres[] = useGenres()

  const { user } = session || {}

  return (
    <>
      <Container>
        <Form>
          <label>
            <Text size="sm">Nome:</Text>
            <TextInput
              placeholder="Digite seu nome completo"
            />
            <FormError>
              <Text>
              </Text>
            </FormError>
            <FormDataTelSexo>
              <TextInputContainer>
                <Text size="sm">CPF:</Text>
                <TextInput
                  placeholder="Digite seu CPF completo"
                  style={{ width: '100%' }}
                />
              </TextInputContainer>
              <TextInputContainer>
                <Text size="sm">E-Mail:</Text>
                <TextInput
                  placeholder="Entre com e-Mail completo"
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
                placeholder="Digite sua data de Nascimento completo"
                style={{ width: '100%' }}
              />
            </TextInputContainer>
            <TextInputContainer>
              <Text size="sm">Telefone:</Text>
              <TextInput
                placeholder="Entre com o numero de telefone "
                style={{ width: '100%' }}
              />
            </TextInputContainer>
            <TextInputContainer>
              <TextInputContainer>
                <Text size="sm">Sexo:</Text>
                <Select style={{ width: '100%' }}>
                  {genres.map(genre => (
                    <Option key={genre.id} value={genre.value}>
                      {genre.label}
                    </Option>
                  ))}
                </Select>
              </TextInputContainer>
            </TextInputContainer>
          </FormDataTelSexo>
          <Line />
          <FormDataTelSexo>
            <TextInputContainer>
              <Text size="sm">CEP:</Text>
              <TextInput
                onBlur={handleGetAddressBlur}
                placeholder="Digite o CEP"
                style={{ width: '100%' }}
              />
            </TextInputContainer>
            <TextInputContainer>
              <Text size="sm">Cidade:</Text>
              <TextInput
                placeholder="Cidade"
                style={{ width: '100%' }}
                value={addressInfo.city ?? 'Aguardando informações...'}
                onChange={(event) => setAddressInfo({ ...addressInfo, city: event.target.value })}
              />
            </TextInputContainer>
          </FormDataTelSexo>

          <FormDataTelSexo>
            <TextInputContainer>
              <Text size="sm">Endereço:</Text>
              <TextInput
                placeholder="Endereço completo"
                style={{ width: '100%' }}
                value={addressInfo.address ?? 'Aguardando informações...'}
                onChange={(event) => setAddressInfo({ ...addressInfo, address: event.target.value })}
              />
            </TextInputContainer>
            <TextInputContainer>
              <Text size="sm">Numero:</Text>
              <TextInput
                placeholder="Digite o numero da casa"
                style={{ width: '100%' }}
              />
            </TextInputContainer>
            <TextInputContainer>
              <Text size="sm">Estado:</Text>
              <TextInput
                placeholder="Estado"
                style={{ width: '100%' }}
                value={addressInfo.state ?? 'Aguardando informações...'}
                onChange={(event) => setAddressInfo({ ...addressInfo, state: event.target.value })}
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
