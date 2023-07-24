import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CRow,
} from '@coreui/react';
import React, { useContext } from "react";

import AccessTemplate from "~/templates/AccessTemplate";
import { withSSRGuest } from '~/utils/withGuest';


const signInFormSchema = yup.object().shape({
  username: yup.string().required('Username / Email obrigatório'),
  password: yup.string().required('Senha obrigatória')
});


export default function AccessTeacher() {
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
        <h1>Portal do Professor</h1>
        <p className="text-medium-emphasis">Identifique-se</p>
        <input type="hidden" {...register('profile')} value="teacher" />
        <CFormInput
          className="mb-4" placeholder="Seu Usuário" autoComplete="username" {...register('username')}
          error={errors.username} />
        <CFormInput
          className="mb-4"
          type="password"
          placeholder="Senha"
          autoComplete="current-password"
          {...register('password')}
          error={errors.password}
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