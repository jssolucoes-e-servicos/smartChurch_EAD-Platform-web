import { Button, Flex, Link as ChakraLink, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';

import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

import Head from 'next/head';
import { useContext } from 'react';
import { Input } from '~/components/Form/Input';
import { AuthContext } from '~/contexts/AuthContext';
import { Logo } from '~/partials/Logo';
import { withSSRGuest } from '../utils/withSSRGuest';

type SignInFormData = {
  email: string;
  password: string;
};

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória')
});

export default function SignIn() {
  const { signIn } = useContext(AuthContext);
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema)
  });

  const { errors } = formState;

  const handleSignIn: SubmitHandler<SignInFormData> = async data => {

    await signIn(data);
  };


  const FormSignIn =  () => {

  }

  return (
    <>
      <Head>
        <title>Login | EAD Tua Morada</title>
      </Head>
      <Flex w="100vw" h="100vh" alignItems="center" justifyContent="center" flexDirection={['column', 'row']}>
        <Stack p={[6, 8]} spacing="4" mr={[0, 0, 0, 100]}>
          <Logo />
          <Text color="gray.900" letterSpacing="tight" lineHeight="normal" fontSize={["3xl","5xl"]} mb="8" fontWeight="extrabold" maxW={430}>
            Faça login para acessar a dashboard
          </Text>
        </Stack>



        <Flex
          as="form"
          width="100%"
          maxWidth={400}
          p={[6, 8]}
          borderRadius={8}
          flexDirection="column"
          onSubmit={handleSubmit(handleSignIn)}
        >
          <Stack spacing="4">
            <Input
              name="email"
              type="email"
              value="jackson144@gmail.com"
              placeholder="Seu email"
              {...register('email')}
              error={errors.email}
              bg="gray.100"
              focusBorderColor='blue.300'
              errorBorderColor='red.300'
            />
            <Input
              name="password"
              type="password"
              placeholder="Senha"
            value="522576c"
              {...register('password')}
              error={errors.password}
              bg="gray.100"
              focusBorderColor='blue.300'
              errorBorderColor='red.300'
            />
          </Stack>
          <Button
            type="submit"
            mt="6"
            colorScheme="blue"
            size="lg"
            isLoading={formState.isSubmitting}
            loadingText='Validando dados'
          >
            Entrar
          </Button>
          <Link href="/forgot-password" passHref>
            <ChakraLink alignSelf="center" mt="4">
              <Text color="gray.500">Esqueci minha senha</Text>
            </ChakraLink>
          </Link>
        </Flex>
      </Flex>
    </>
  );
}

export const getServerSideProps = withSSRGuest(async ctx => {
  return {
    props: {}
  };
});