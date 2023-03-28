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
  Line,
  Option,
  Select,
  TextInputContainer,
} from './styles'
import { useGenders } from '@/src/hooks/useGenders';
import { useEffect, useState } from 'react';
import { getAddress } from '@/src/hooks/getAddress';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import { cpf } from 'cpf-cnpj-validator';
import { cepMask, cpfMask, dataMask, phoneMask } from '@/src/utils/maskUtils';

interface HomeProps {
  session: Session | null
}

interface Genders {
  id: number;
  value: string;
  label: string;
}

const registerFormSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  cpf: z
    .string()
    .length(11, "O CPF deve ter exatamente 11 dígitos")
    .refine((value) => cpf.isValid(value), "CPF inválido")
    .transform((value) => value.replace(/[^\d]/g, "")),
  email: z.string().email("Endereço de e-mail inválido"),

  birthdate: z.string().length(8, "Digiete uma data valida"),

  phone: z.string().min(10, "O telefone deve ter pelo menos 10 dígitos"),
  gender: z.string().nonempty({ message: 'Escolha um genero.' }),
  zipCode: z.string().length(8, "O CEP deve ter exatamente 8 dígitos"),
  // street: z.string().nonempty({ message: 'O endereço é obrigatório.' }),
  number: z.string().nonempty({ message: 'O número é obrigatório.' }),
  // city: z.string().nonempty({ message: 'A cidade é obrigatória' }),
  // state: z.string().length(2, "O estado deve ter exatamente 2 caracteres"),
});

type RegisterFormData = z.infer<typeof registerFormSchema>;

export default function Home({ session }: HomeProps) {
  const [dataNasc, setDataNasc] = useState<Date | null>(null);
  const { register, handleSubmit, formState: { errors }, trigger } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });
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

      // Re-validate the form fields after updating the address information
    } catch (error) {
      console.log(error)
      setError('Something went wrong')
    }
  }

  const genders: Genders[] = useGenders()

  const { user } = session || {}

  async function handleRegister(data: RegisterFormData) {
    console.log(data)
  }

  return (
    <>
      <Container>
        <Form as="form" onSubmit={handleSubmit(handleRegister)}>
          <label>
            <Text size="sm">Nome:</Text>
            <TextInput
              {...register("name", {
                required: true,
              })}
              placeholder="Digite seu nome completo"
            />
            {errors.name && (
              <FormError>
                <Text>{errors.name?.message}</Text>
              </FormError>
            )}
          </label>
          <FormDataTelSexo>
            <TextInputContainer>
              <Text size="sm">CPF:</Text>
              <TextInput
                {...register("cpf", {
                  required: true,
                })}
                placeholder="Digite seu CPF completo"
                style={{ width: '100%' }}
                onBlur={(e) => {
                  e.target.value = cpfMask(e.target.value);
                  trigger("cpf");
                }}
              />
              {errors.cpf && (
                <FormError>
                  <Text>{errors.cpf?.message}</Text>
                </FormError>
              )}
            </TextInputContainer>
            <TextInputContainer>
              <Text size="sm">E-Mail:</Text>
              <TextInput
                {...register("email", {
                  required: true,
                })}
                placeholder="Entre com e-Mail completo"
                style={{ width: '100%' }}
              />
              {errors.email && (
                <FormError>
                  <Text>{errors.email?.message}</Text>
                </FormError>
              )}
            </TextInputContainer>
          </FormDataTelSexo>
          <FormDataTelSexo>
            <TextInputContainer>
              <Text size="sm">Data de Nascimento:</Text>
              <TextInput
                {...register("birthdate", {
                  required: true,
                })}
                placeholder="Digite sua data de Nascimento completo"
                style={{ width: '100%' }}
                onBlur={(e) => {
                  e.target.value = dataMask(e.target.value);
                  trigger("birthdate");
                }}
              />
              {errors.birthdate && (
                <FormError>
                  <Text>{errors.birthdate?.message}</Text>
                </FormError>
              )}
            </TextInputContainer>
            <TextInputContainer>
              <Text size="sm">Telefone:</Text>
              <TextInput
                {...register("phone", {
                  required: true,
                })}
                placeholder="Entre com o numero de telefone "
                style={{ width: '100%' }}
                onBlur={(e) => {
                  e.target.value = phoneMask(e.target.value);
                  trigger("phone");
                }}
              />
              {errors.phone && (
                <FormError>
                  <Text>{errors.phone?.message}</Text>
                </FormError>
              )}
            </TextInputContainer>
            <TextInputContainer>
              <Text size="sm">Sexo:</Text>
              <Select style={{ width: '100%' }} {...register("gender", { required: true })}>
                {genders.map(gender => (
                  <Option key={gender.id} value={gender.value}>
                    {gender.label}
                  </Option>
                ))}
              </Select>
              {errors.gender && (
                <FormError>
                  <Text>{errors.gender?.message}</Text>
                </FormError>
              )}
            </TextInputContainer>
          </FormDataTelSexo>
          <Line />
          <FormDataTelSexo>
            <TextInputContainer>
              <Text size="sm">CEP:</Text>
              <TextInput
                {...register("zipCode", {
                  required: true,
                })}
                placeholder="Digite o CEP"
                style={{ width: '100%' }}
                onBlur={(e) => {
                  handleGetAddressBlur(e);
                  const formattedValue = cepMask(e.target.value);
                  e.target.value = formattedValue;
                  trigger("zipCode");
                }}
              />
              {errors.zipCode && (
                <FormError>
                  <Text>{errors.zipCode?.message}</Text>
                </FormError>
              )}
            </TextInputContainer>

            <TextInputContainer>
              <Text size="sm">Cidade:</Text>
              <TextInput
                contentEditable={false}
                readOnly={true}
                placeholder="Cidade"
                style={{ width: '100%', pointerEvents: 'none' }}
                value={addressInfo.city ?? 'Aguardando informações...'}
                onChange={(event) => setAddressInfo({ ...addressInfo, city: event.target.value })}
              />

            </TextInputContainer>
          </FormDataTelSexo>
          {/* Grupo Endereço, Numero e Estado */}
          <FormDataTelSexo>
            <TextInputContainer>
              <Text size="sm">Endereço:</Text>
              <TextInput
                contentEditable={false}
                readOnly={true}
                placeholder="Endereço completo"
                style={{ width: '100%', pointerEvents: 'none' }}
                value={addressInfo.address ?? 'Aguardando informações...'}
                onChange={(event) => setAddressInfo({ ...addressInfo, address: event.target.value })}
              />

            </TextInputContainer>
            <TextInputContainer>
              <Text size="sm">Numero:</Text>
              <TextInput
                {...register("number", {
                  required: true,
                })}
                placeholder="Digite o numero da casa"
                style={{ width: '100%' }}
              />
              {errors.number && (
                <FormError>
                  <Text>{errors.number?.message}</Text>
                </FormError>
              )}
            </TextInputContainer>
            <TextInputContainer>
              <Text size="sm">Estado:</Text>
              <TextInput
                contentEditable={false}
                readOnly={true}
                placeholder="Estado"
                style={{ width: '100%', pointerEvents: 'none' }}
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
