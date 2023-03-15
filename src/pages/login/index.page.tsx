import { Heading, Text, Button, TextInput } from '@ignite-ui/react';
import {
  ButtonContainer,
  Container,
  Form,
  FormError,
  Header,
  Line,
  LogimMenssage,
  ShowPasswordButton,
  SocialButton,
} from './styles';
import { ArrowRight } from 'phosphor-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub,
  faGoogle,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import { getSession, signIn } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormEvent, useState } from 'react';

const claimUserNameFormshema = z.object({
  email: z.string().email('Por favor, insira um endereço de e-mail válido.').min(5, 'O endereço de e-mail deve ter pelo menos 5 caracteres.'),
  password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres.').max(50, 'A senha não pode ultrapassar 50 caracteres.').regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.'),
});

type ClainUserNameFormData = z.infer<typeof claimUserNameFormshema>;

function Login() {
  const [error, setError] = useState<string | null>(null);


  const [showPassword, setShowPassword] = useState(false);
  const credentials = {
    email: 'email_do_usuario',
    password: 'senha_do_usuario'
  }

  const { register, handleSubmit, formState: { errors } } = useForm<ClainUserNameFormData>({
    resolver: zodResolver(claimUserNameFormshema)
  });

  // const handleClaimUsername = async (data: ClainUserNameFormData | null | undefined, credentials?: { email: string, password: string }) => {
  //   try {
  //     await signIn('credentials', { ...data });
  //   } catch (error) {
  //     setError('Email ou senha inválidos. Por favor, tente novamente.');
  //   }
  //   if (!data && credentials) {
  //     await signIn('credentials', { ...credentials });
  //   } else if (data) {
  //     const isValid = Object.keys(errors).length === 0;
  //     if (isValid) {
  //       await signIn('credentials', { ...data });
  //     }
  //   }
  // }

  const handleClaimUsername = async (data: ClainUserNameFormData | null | undefined) => {
    try {
      await signIn('credentials', { ...data });
    } catch (error) {
      setError('Email ou senha inválidos. Por favor, tente novamente.');
    }
  }


  return (
    <>
      <Container>
        <Header>
          <Heading as="strong">Sing in to your account</Heading>
        </Header>
        <Form as="form" onSubmit={handleSubmit((data) => handleClaimUsername(data))}>
          <label>
            <Text size="sm">Email address</Text>
            <TextInput placeholder="Enter your Email" {...register('email')} />
            <FormError >
              <Text>
                {errors.email ? errors.email?.message : 'Digite um email'}
              </Text>
            </FormError>
          </label>
          <label>
            <Text size="sm">Password</Text>
            <TextInput type={showPassword ? 'text' : 'password'} placeholder="Enter your password" {...register('password')} autoComplete="new-password" />
            <FormError>
              <Text>
                {errors.password ? errors.password?.message : 'Digite uma senha'}
              </Text>
              {error && <FormError><Text>{error}</Text></FormError>}
              <ShowPasswordButton onClick={() => setShowPassword(!showPassword)} >Mostrar senha</ShowPasswordButton>
            </FormError>
          </label>
          <Button type="submit">
            Sign in
            <ArrowRight />
          </Button>
          <LogimMenssage>
            <Line />
            <Text size="sm">Or continue with</Text>
            <Line />
          </LogimMenssage>
          <ButtonContainer>
            <SocialButton onClick={(e) => { e.preventDefault(); signIn('linkedin') }}>
              <FontAwesomeIcon icon={faLinkedin} />
            </SocialButton>
            <SocialButton onClick={(e) => { e.preventDefault(); signIn('github') }}>
              <FontAwesomeIcon icon={faGithub} />
            </SocialButton>
            <SocialButton onClick={(e) => { e.preventDefault(); signIn('google') }}>
              <FontAwesomeIcon icon={faGoogle} />
            </SocialButton>
          </ButtonContainer>
          <Line />
        </Form>
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {
      session: session,
    },
  };
};

export default Login;
