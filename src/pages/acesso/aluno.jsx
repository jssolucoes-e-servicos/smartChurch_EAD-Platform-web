import React, { useContext } from "react";
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CRow,
} from '@coreui/react'

import AccessTemplate from "~/templates/AccessTemplate";
import { withSSRGuest } from '~/utils/withGuest';
import { AuthContext } from '~/contexts/AuthContext';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória')
});

export default function StudantAccess() {
  const { signIn } = useContext(AuthContext);

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema)
  });

  const { errors } = formState;

  const handleSignIn = async data => {
    await signIn(data);
  };

  return (
    <AccessTemplate>
      <CForm onSubmit={handleSubmit(handleSignIn)}>
        <h1>Portal do Aluno</h1>
        <p className="text-medium-emphasis">Identifique-se</p>
        <input type="hidden" {...register('profile')} value="studant" />
        <CFormInput
          className="mb-4"
          autoComplete="username"
          placeholder="Seu usuário"
          {...register('username')}
          error={errors.username}
          value="jackson"
        />
        <CFormInput
          className="mb-4"
          type="password"
          autoComplete="current-password"
          placeholder="Sua Senha"
          {...register('password')}
          error={errors.password}
          value="522576"
        />

        <CRow>
          <CCol xs={6}>
            <CButton type="submit" color="primary" className="px-4">
              Acessar
            </CButton>
          </CCol>
          <CCol xs={6} className="text-right">
            <CButton color="link" className="px-0">
              Esqueci a senha
            </CButton>
          </CCol>
        </CRow>
      </CForm>
    </AccessTemplate>

  );
}

export const getServerSideProps = withSSRGuest(async ctx => {
  return {
    props: {}
  };
});