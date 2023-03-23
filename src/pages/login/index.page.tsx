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
  TextAcount,
} from './styles';
import { ArrowRight } from 'phosphor-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub,
  faGoogle,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import { getSession, signIn, useSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { useRouter } from 'next/router';

const claimUserNameFormshema = z.object({
  email: z.string().email('Por favor, insira um endereço de e-mail válido.').min(5, 'O endereço de e-mail deve ter pelo menos 5 caracteres.'),
  password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres.').max(50, 'A senha não pode ultrapassar 50 caracteres.').regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.'),

});

type ClaimUserNameFormData = z.infer<typeof claimUserNameFormshema>;

function Login() {
  const session = useSession()
  console.log(session)

  const [error, setError] = useState<string | null>(null);

  const [loginError, setLoginError] = useState<string | null>(null);

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ClaimUserNameFormData>({
    resolver: zodResolver(claimUserNameFormshema)
  });

  async function onSubmit(values: any) {

    try {
      const { email, password } = values;
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: "/home"
      });

      console.log(result)
      if (result?.error) {
        setLoginError(result.error)
      } else if (result?.url) {
        router.push(result.url)
        console.log('tudo ok')
      }
    } catch (error) {
      console.log(error)
      setError('Something went wrong')
    }

  }


  return (
    <>
      <Container>
        <Header>
          <Heading as="strong">Sing in to your account</Heading>
        </Header>
        <Form as="form" onSubmit={handleSubmit(onSubmit)}>
          <label>
            <Text size="sm">Email address</Text>
            <TextInput placeholder="Enter your Email" {...register('email')} />
            <FormError >
              <Text>
                {errors.email ? errors.email?.message : ''}
              </Text>
            </FormError>
          </label>
          <label>
            <Text size="sm">Password</Text>
            <TextInput id='password' type={showPassword ? 'text' : 'password'} placeholder="Enter your password" {...register('password')} autoComplete="new-password" />
            <FormError>
              <Text>
                {errors.password ? errors.password?.message : ''}
                {loginError && <><br /><span>{loginError}</span></>}
                {error && <><br /><span>{error}</span></>}
              </Text>
              <ShowPasswordButton onClick={() => setShowPassword(!showPassword)} >Show password</ShowPasswordButton>
            </FormError>

          </label>
          <Button type="submit" >
            LOGIN
            <ArrowRight />
          </Button>
          <ButtonContainer>
            <TextAcount>
              New around here? <a href="/register">Create an account.</a>
            </TextAcount>
          </ButtonContainer>
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
        destination: '/home',
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
