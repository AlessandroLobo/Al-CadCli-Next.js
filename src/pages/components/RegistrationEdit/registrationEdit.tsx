import { useEffect, useState } from "react";
import { ModalInfo } from "../Modal/modalInfo";
import { RegistrationEditProps } from './types';
import axios from "axios";
import { Button, Text, TextInput } from '@ignite-ui/react';
import { cpf } from 'cpf-cnpj-validator';
import { cepMask, cpfMask, dataMask, phoneMask } from '@/src/utils/maskUtils';
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
import { api } from "@/src/lib/axios";
import { getAddress } from "@/src/hooks/getAddress";

interface Data {
  id: string;
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
    // console.log('Dados do cliente:', response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export function RegistrationEdit({ clientId, setModalOpen }: RegistrationEditProps) {
  const [modalOpen, setModalOpenState] = useState(true);
  const [clientData, setClientData] = useState<Data | null>(null);

  const [addressInfo, setAddressInfo] = useState({ city: '', address: '', state: '' });

  const [error, setError] = useState('');

  const [registerError, setRegisterError] = useState<string | null>(null);

  async function handleGetAddressBlur(event: React.FocusEvent<HTMLInputElement>) {
    try {
      // Chama a função getAddress para buscar as informações de endereço com base no CEP informado pelo usuário
      const zipCode = event.currentTarget.value.replace(/\D/g, '').toUpperCase();
      const addressInfo = await getAddress(zipCode);


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


  const formattedClientData = {
    ...clientData,
    birthdate: clientData?.birthdate?.toISOString?.().substr(0, 10),
  };

  const { register, handleSubmit, reset, formState: { errors }, trigger, getValues } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: formattedClientData,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const { birthdate, ...restData } = await searchClient(clientId);
        setClientData({ birthdate: new Date(birthdate), ...restData });
        reset({});

        const zipCode = restData.zipCode.replace(/\D/g, '').toUpperCase();
        const addressInfo = await getAddress(zipCode);


        if (!addressInfo) {
          setError('Invalid Zip Code');
          return;
        }

        setAddressInfo(addressInfo);

      } catch (error) {
        console.error(error);
        setError('Something went wrong');
      }
    }

    fetchData();
  }, [clientId, reset]);



  function formatBirthdate(birthdate: string) {
    const parts = birthdate.split('/');
    if (parts.length !== 3) {
      throw new Error('Invalid birthdate format. Expected dd/mm/yyyy.');
    }
    const day = parts[0];
    const month = parts[1];
    const year = parts[2];

    return `${year}-${month}-${day}`;
  }

  async function handleUpdate(id: string) {
    try {
      console.log('Dados enviados para atualização:', id);
      const clientId = id;
      console.log('Função handleUpdate');

      // Format birthdate to expected format
      const formattedBirthdate = formatBirthdate(getValues('birthdate'));

      // Create Date object from formatted birthdate
      const birthdate = new Date(formattedBirthdate);

      // Convert birthdate to accepted format
      const isoBirthdate = birthdate.toISOString();

      await api.put('/clientUpdate', {
        id: clientId,
        name: getValues('name').toUpperCase(),
        cpf: getValues('cpf'),
        email: getValues('email'),
        birthdate: isoBirthdate,
        phone: getValues('phone'),
        gender: getValues('gender'),
        zipCode: getValues('zipCode'),
        city: getValues('city'),
        address: getValues('address'),
        number: getValues('number'),
        state: getValues('state'),
      });
      setModalOpen(true)
      alert('Alteração feita')
    } catch (err: any) {
      if (err.response && err.response.status === 404) {
        setRegisterError('Cliente não encontrado');
      } else if (err.response && err.response.status === 409) {
        setRegisterError('CPF já cadastrado');
      } else {
        setRegisterError('Ocorreu um erro interno do servidor. Por favor, tente novamente mais tarde.');
      }
    }
  }

  async function handleDelete(id: string) {
    try {
      console.log('Função handleDelete');
      const clientId = id;
      console.log('Função haldeDelete --- ', clientId)

      await api.delete('/clientDelete', { data: { id: clientId } });

      alert('Exclusão feita');
      reset({
        name: '',
        cpf: '',
        email: '',
        birthdate: '',
        phone: '',
        gender: '',
        zipCode: '',
        city: '',
        address: '',
        number: '',
        state: ''
      });
      reset()
      setModalOpen(false);
      setAddressInfo({ city: '', address: '', state: '' });
    } catch (err: any) {
      if (err.response && err.response.status === 404) {
        setRegisterError('Cliente não encontrado');
      } else if (err.response && err.response.status === 409) {
        setRegisterError('CPF já cadastrado');
      } else {
        setRegisterError('Ocorreu um erro interno do servidor. Por favor, tente novamente mais tarde.');
      }
    }
  }


  return (
    <>
      <ModalInfo isOpen={modalOpen} setIsOpen={() => {
        setModalOpenState(false);
        setModalOpen(false);
      }} backDropClose={true}>
        <Form as="form" onSubmit={(event) => {
          event.preventDefault();
          handleDelete(clientId);
          handleUpdate(clientId);
        }}>
          <label>
            {registerError && (
              <FormError>
                <Text>{registerError}</Text>
              </FormError>
            )}
            <Text size="sm" style={{ textAlign: 'left' }}>Nome:</Text>
            <TextInput
              {...register("name", {
                required: true,
              })}
              defaultValue={clientData?.name || ""}
              onBlur={event => event.target.value = event.target.value.toUpperCase()}
            />
            {errors.name && (
              <FormError>
                <Text>{errors.name?.message}</Text>
              </FormError>
            )}
          </label>
          <FormDataTelSexo>
            <TextInputContainer>
              <Text size="sm" style={{ textAlign: 'left' }}>CPF:</Text>
              <TextInput
                {...register("cpf", {
                  required: true,
                })}
                defaultValue={cpfMask(clientData?.cpf || "")}
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
              <Text size="sm" style={{ textAlign: 'left' }}>E-Mail:</Text>
              <TextInput
                {...register("email", {
                  required: true,
                })}
                defaultValue={clientData?.email || ""}
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

              />
              {errors.birthdate && (
                <FormError>
                  <Text>{errors.birthdate?.message}</Text>
                </FormError>
              )}
            </TextInputContainer>
            <TextInputContainer>
              <Text size="sm" style={{ textAlign: 'left' }}>Telefone:</Text>
              <TextInput
                {...register("phone", {
                  required: true,
                })}
                defaultValue={phoneMask(clientData?.phoneNumber || "")}
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
              <Text size="sm" style={{ textAlign: 'left' }}>Sexo:</Text>
              <TextInput
                {...register("gender", { required: true })}
                defaultValue={clientData?.gender || ""}
              />
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
              <Text size="sm" style={{ textAlign: 'left' }}>CEP:</Text>
              <TextInput
                {...register("zipCode", {
                  required: true,
                })}
                defaultValue={cepMask(clientData?.zipCode || "")}
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
              <Text size="sm" style={{ textAlign: 'left' }}>Cidade:</Text>
              <TextInput
                contentEditable={false}
                readOnly={true}
                value={addressInfo.city ?? 'Aguardando informações...'}
                style={{ width: '100%', pointerEvents: 'none' }}
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
                value={addressInfo.address ?? 'Aguardando informações...'}
                style={{ width: '100%', pointerEvents: 'none' }}
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
              {errors.number && (
                <FormError>
                  <Text>{errors.number?.message}</Text>
                </FormError>
              )}
            </TextInputContainer>
            <TextInputContainer>
              <Text size="sm" style={{ textAlign: 'left' }}>Estado:</Text>
              <TextInput
                contentEditable={false}
                readOnly={true}
                value={addressInfo.state ?? 'Aguardando informações...'}
                style={{ width: '100%', pointerEvents: 'none' }}
              />
            </TextInputContainer>
          </FormDataTelSexo>
          <Line />
          <ButtonContainer>
            <Button type="button" onClick={() => clientData && handleUpdate(clientData.id)}>
              ALTERAR
            </Button>
            <Button type="button" onClick={() => clientData && handleDelete(clientData.id)}>
              EXCLUIR
            </Button>
          </ButtonContainer>
        </Form>
      </ModalInfo>
    </>
  )
}

export default RegistrationEdit;
