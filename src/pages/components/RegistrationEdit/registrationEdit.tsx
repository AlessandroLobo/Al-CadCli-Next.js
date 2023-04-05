import { useEffect, useState } from "react";
import { ModalInfo } from "../Modal/modalInfo";
import { RegistrationEditProps } from './types';
import axios from "axios";
import { Button, Text, TextInput } from '@ignite-ui/react';
import { cpf } from 'cpf-cnpj-validator';
import { useForm } from "react-hook-form";
import {
  ButtonContainer,
  Container,
  Form,
  FormDataTelSexo,
  FormError,
  Line,
  Option,
  Select,
  TextInputContainer,
} from './styles'
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface Data {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  birthdate: Date;
  gender: string;
  zipCode: string;
  city: string;
  address: string;
  addressNumber: string;
  phoneNumber: string;
  state: string;
  // Adicione outros campos, se necessário
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

  phone: z.string().min(11, "O telefone deve ter pelo menos 10 dígitos").max(11, "O telefone deve ter no maximo 10 digitos"),
  gender: z.string().nonempty({ message: 'Escolha um genero.' }),
  zipCode: z.string().length(8, "O CEP deve ter exatamente 8 dígitos"),
  city: z.string().optional(),
  address: z.string().optional(),
  number: z.string().nonempty({ message: 'O número é obrigatório.' }),
  state: z.string().optional(),
});

type RegisterFormData = z.infer<typeof registerFormSchema>;

async function searchClient(clientId: string): Promise<Data> {
  try {
    const response = await axios.post('../api/clientEdit', { clientId });
    console.log('Dados do cliente:', response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export function RegistrationEdit({ clientId, setModalOpen }: RegistrationEditProps) {
  const [modalOpen, setModalOpenState] = useState(true);
  const [clientData, setClientData] = useState<Data | null>(null);

  const formattedClientData = {
    ...clientData,
    birthdate: clientData?.birthdate?.toISOString?.().substr(0, 10),
  };

  const { register, handleSubmit, reset, formState: { errors }, trigger } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: formattedClientData,
  });


  useEffect(() => {
    async function fetchClientData() {
      console.log('fetchClientData sendo chamada');
      try {
        const data = await searchClient(clientId);
        console.log('clientId', clientId)
        setClientData(data);
        console.log('Dados da API:', data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchClientData();
  }, [clientId]);


  async function handleRegister(data: RegisterFormData) {
    console.log(data)
    // try {
    //   await api.post('/clientUpdate', {
    //     name: data.name.toUpperCase(),
    //     cpf: data.cpf,
    //     email: data.email,
    //     birthdate: data.birthdate,
    //     phone: data.phone,
    //     gender: data.gender,
    //     zipCode: data.zipCode,
    //     city: addressInfo.city, // aqui estamos incluindo o valor de city a partir do estado local
    //     address: addressInfo.address, // aqui estamos incluindo o valor de address a partir do estado local
    //     number: data.number,
    //     state: addressInfo.state, // aqui estamos incluindo o valor de state a partir do estado local
    //   })
    //   setModalOpen(true)
    //   reset()
    //   setAddressInfo({ city: '', address: '', state: '' });
    // } catch (err: any) {
    //   if (err.response && err.response.status === 409) {
    //     setRegisterError(err.response.data.message); // Define o erro de registro com a mensagem personalizada retornada pelo servidor
    //   } else {
    //     setRegisterError('Ocorreu um erro interno do servidor. Por favor, tente novamente mais tarde.');
    //   }
    // }
  }


  return (
    <>
      <ModalInfo isOpen={modalOpen} setIsOpen={() => {
        setModalOpenState(false);
        setModalOpen(false);
      }} backDropClose={true}>
        <Form as="form" onSubmit={handleSubmit(handleRegister)}>
          <label>
            {/* {registerError && (
              <FormError>
                <>
                  {registerError}
                </>
              </FormError>
            )} */}
            <Text size="sm" style={{ textAlign: 'left' }}>Nome:</Text>
            <TextInput
              {...register("name", {
                required: true,
              })}
              defaultValue={clientData?.name || ""}
              onBlur={event => event.target.value = event.target.value.toUpperCase()}
            />
            {/* {errors.name && (
              <FormError>
                <Text>{errors.name?.message}</Text>
              </FormError>
            )} */}
          </label>
          <FormDataTelSexo>
            <TextInputContainer>
              <Text size="sm" style={{ textAlign: 'left' }}>CPF:</Text>
              <TextInput
                {...register("cpf", {
                  required: true,
                })}
                defaultValue={clientData?.cpf || ""}
                style={{ width: '100%' }}
              // onBlur={(e) => {
              //   e.target.value = cpfMask(e.target.value);
              //   trigger("cpf");
              // }}
              />
              {/* {errors.cpf && (
                <FormError>
                  <Text>{errors.cpf?.message}</Text>
                </FormError>
              )} */}
            </TextInputContainer>
            <TextInputContainer>
              <Text size="sm" style={{ textAlign: 'left' }}>E-Mail:</Text>
              <TextInput
                {...register("email", {
                  required: true,
                })}
                defaultValue={clientData?.email || ""}
                style={{ width: '100%' }}
              />
              {/* {errors.email && (
                <FormError>
                  <Text>{errors.email?.message}</Text>
                </FormError>
              )} */}
            </TextInputContainer>
          </FormDataTelSexo>
          <FormDataTelSexo>
            <TextInputContainer>
              <Text size="sm" style={{ textAlign: 'left' }}>Data de Nascimento:</Text>
              <TextInput
                {...register("birthdate", {
                  required: true,
                })}
                defaultValue={
                  clientData && clientData.birthdate
                    ? new Date(clientData.birthdate).toISOString().split("T")[0].split("-").reverse().join("/")
                    : ""
                }

                style={{ width: '100%' }}
              // onBlur={(e) => {
              //   e.target.value = dataMask(e.target.value);
              //   trigger("birthdate");
              // }}
              />
              {/* {errors.birthdate && (
                <FormError>
                  <Text>{errors.birthdate?.message}</Text>
                </FormError>
              )} */}
            </TextInputContainer>
            <TextInputContainer>
              <Text size="sm" style={{ textAlign: 'left' }}>Telefone:</Text>
              <TextInput
                {...register("phone", {
                  required: true,
                })}
                defaultValue={clientData?.phoneNumber || ""}
                style={{ width: '100%' }}
              // onBlur={(e) => {
              //   e.target.value = phoneMask(e.target.value);
              //   trigger("phone");
              // }}
              />
              {/* {errors.phone && (
                <FormError>
                  <Text>{errors.phone?.message}</Text>
                </FormError>
              )} */}
            </TextInputContainer>
            <TextInputContainer>
              <Text size="sm" style={{ textAlign: 'left' }}>Sexo:</Text>
              <TextInput
                {...register("gender", { required: true })}
                defaultValue={clientData?.gender || ""}
              />
              {/* {errors.gender && (
                <FormError>
                  <Text>{errors.gender?.message}</Text>
                </FormError>
              )} */}
            </TextInputContainer>
          </FormDataTelSexo>
          <Line />
          <FormDataTelSexo>
            <TextInputContainer>
              <Text size="sm" style={{ textAlign: 'left' }}>CEP:</Text>
              <TextInput
                {...register("zipCode", {
                  required: true,
                })}
                defaultValue={clientData?.zipCode || ""}
                style={{ width: '100%' }}
              // onBlur={(e) => {
              //   handleGetAddressBlur(e);
              //   const formattedValue = cepMask(e.target.value);
              //   e.target.value = formattedValue;
              //   trigger("zipCode");
              // }}
              />
              {/* {errors.zipCode && (
                <FormError>
                  <Text>{errors.zipCode?.message}</Text>
                </FormError>
              )} */}
            </TextInputContainer>


            <TextInputContainer>
              <Text size="sm" style={{ textAlign: 'left' }}>Cidade:</Text>
              <TextInput
                contentEditable={false}
                readOnly={true}
                defaultValue={clientData?.city || ""}
                style={{ width: '100%', pointerEvents: 'none' }}
              // value={addressInfo.city ?? 'Aguardando informações...'}
              // onChange={(event) => setAddressInfo({ ...addressInfo, city: event.target.value })}
              // onInput={(event: React.FormEvent<HTMLInputElement>) => {
              //   event.currentTarget.value = event.currentTarget.value.toUpperCase();
              // }}
              />

            </TextInputContainer>
          </FormDataTelSexo>
          {/* Grupo Endereço, Numero e Estado */}
          <FormDataTelSexo>
            <TextInputContainer>
              <Text size="sm" style={{ textAlign: 'left' }}>Endereço:</Text>
              <TextInput
                contentEditable={false}
                readOnly={true}
                defaultValue={clientData?.address || ""}
                style={{ width: '100%', pointerEvents: 'none' }}
              // value={addressInfo.address ?? 'Aguardando informações...'}
              // onChange={(event) => setAddressInfo({ ...addressInfo, address: event.target.value })}
              />

            </TextInputContainer>
            <TextInputContainer>
              <Text size="sm" style={{ textAlign: 'left' }}>Numero:</Text>
              <TextInput
                {...register("number", {
                  required: true,
                })}
                defaultValue={clientData?.addressNumber || ""}
                style={{ width: '100%' }}
              />
              {/* {errors.number && (
                <FormError>
                  <Text>{errors.number?.message}</Text>
                </FormError>
              )} */}
            </TextInputContainer>
            <TextInputContainer>
              <Text size="sm" style={{ textAlign: 'left' }}>Estado:</Text>
              <TextInput
                contentEditable={false}
                readOnly={true}
                defaultValue={clientData?.state || ""}
                style={{ width: '100%', pointerEvents: 'none' }}
              // value={addressInfo.state ?? 'Aguardando informações...'}
              // onChange={(event) => setAddressInfo({ ...addressInfo, state: event.target.value })}
              />

            </TextInputContainer>
          </FormDataTelSexo>
          <Line />
          <ButtonContainer>
            <Button type="button" >
              ALTERAR
            </Button>
            <Button type="button">
              EXCLUIR
            </Button>
          </ButtonContainer>
        </Form>
      </ModalInfo>
    </>
  )
}

export default RegistrationEdit;
