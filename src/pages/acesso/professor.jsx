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

export default function AccessTeacher() {
  return (
    <AccessTemplate>
      <CForm>
        <h1>Portal do Professor</h1>
        <p className="text-medium-emphasis">Identifique-se</p>
        <input type="hidden" {...register('profile')} value="teacher" />
        <CFormInput
          className="mb-4" placeholder="Seu Usuário" autoComplete="username" />
        <CFormInput
          className="mb-4"
          type="password"
          placeholder="Senha"
          autoComplete="current-password"
        />

        <CRow>
          <CCol xs={6}>
            <CButton color="primary" className="px-4">
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