import { Heading, Text, Button, TextInput } from '@ignite-ui/react';
import { z } from 'zod';
import {
  Container,
  Form,
  FormError,
  Header,
  ShowPasswordButton,
} from './styles';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';


const registerFormSchema = z.object({
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

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });

  function handleRegister(data: RegisterFormData) {
    console.log(data)
  }

  return (
    <>
      <Container>
        <Header>
          <Heading as="strong">Create your account</Heading>
        </Header>
        <Form as="form" onSubmit={handleSubmit(handleRegister)} >
          <label>
            <Text size="sm">Email address</Text>
            <TextInput {...register('email')} placeholder="Enter your Email" />
            <FormError >
              <Text>
                {errors.email ? errors.email?.message : ''}
              </Text>
            </FormError>
          </label>
          <label>
            <Text size="sm">Password</Text>
            <TextInput {...register('password')} placeholder="Enter your password" />
            <FormError>
              <Text>
                {errors.password ? errors.password?.message : ''}
              </Text>
            </FormError>

          </label>
          <label>
            <Text size="sm">Confirm Password</Text>
            <TextInput {...register('confirmPassword')} placeholder="Confirm your Password" />
            <FormError>
              <Text>
                {errors.confirmPassword ? errors.confirmPassword?.message : ''}
              </Text>
            </FormError>

          </label>
          <Button type="submit">
            Create Account
          </Button>
        </Form>

      </Container>
    </>
  );
}