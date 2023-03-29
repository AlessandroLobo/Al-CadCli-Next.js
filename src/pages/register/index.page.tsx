import { Heading, Text, Button, TextInput } from '@ignite-ui/react';
import { z } from 'zod';
import {
  Container,
  Form,
  FormError,
  Header,
  ShowPasswordButton,
  TextBack,
} from './styles';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft } from 'phosphor-react';
import { api } from '@/src/lib/axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { error } from 'console';

const registerFormSchema = z.object({
  name: z.string().min(1, 'Por favor, insira o seu nome.'),
  email: z
    .string()
    .email('Por favor, insira um endereço de e-mail válido.')
    .min(5, 'O endereço de e-mail deve ter pelo menos 5 caracteres.'),
  password: z
    .string()
    .min(8, 'A senha deve ter pelo menos 8 caracteres.')
    .max(50, 'A senha não pode ultrapassar 50 caracteres.')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.'
    ),
  confirmPassword: z.string()
})
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword",],
  });

type RegisterFormData = z.infer<typeof registerFormSchema>;


export default function Register() {

  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });


  const [registerError, setRegisterError] = useState<string | null>(null);

  async function handleRegister(data: RegisterFormData) {
    try {
      await api.post('/users', {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      router.push('/login');
    } catch (err: any) {
      if (err.response && err.response.status === 409) {
        setRegisterError(err.response.data.message); // Define o erro de registro com a mensagem personalizada retornada pelo servidor
      } else {
        setRegisterError('Ocorreu um erro interno do servidor. Por favor, tente novamente mais tarde.');
      }
    }
  }


  return (
    <>
      <Container>
        
        <Header>
          <Heading as="strong">Create your account</Heading>
        </Header>
        {registerError && (
          <FormError>
            <Text>
              {registerError}
            </Text>
          </FormError>
        )}
        <Form as="form" onSubmit={handleSubmit(handleRegister)} >
          <label>
            <Text size="sm">Name</Text>
            <TextInput
              {...register("name", {
                required: true,
              })}
              placeholder="Enter your Name"
            />
            <FormError>
              <Text>
                {errors.name?.type === "required" && "Este campo é obrigatório."}
                {errors.name?.message}
              </Text>
            </FormError>
          </label>
          <label>
            <Text size="sm">Email address</Text>
            <TextInput
              {...register("email", {
                required: true,
              })}
              placeholder="Enter your Email"
            />
            <FormError>
              <Text>
                {errors.email?.type === "required" && "Este campo é obrigatório."}
                {errors.email?.message}
              </Text>
            </FormError>
          </label>
          <label>
            <Text size="sm">Password</Text>
            <TextInput
              {...register("password", {
                required: true,
              })}
              placeholder="Enter your password"
              autoComplete="new-password"
            />
            <FormError>
              <Text>
                {errors.password?.type === "required" && "Este campo é obrigatório."}
                {errors.password?.message}
              </Text>
            </FormError>
          </label>
          <label>
            <Text size="sm">Confirm Password</Text>
            <TextInput
              {...register("confirmPassword", {
                required: true,
              })}
              placeholder="Confirm your Password"
              autoComplete="new-password"
            />
            <FormError>
              <Text>
                {errors.confirmPassword?.type === "required" && "Este campo é obrigatório."}
                {errors.confirmPassword?.message}
              </Text>
            </FormError>
            <TextBack>
              <ArrowLeft />
              <a href="/login">Return to login page</a>
            </TextBack>
          </label>
          <Button type="submit">
            Create Account
          </Button>
        </Form>
      </Container>
    </>
  );
}
