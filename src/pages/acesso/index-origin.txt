import React from "react";
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CRow,
} from '@coreui/react'

import AccessTemplate from "@/templates/AccessTemplate";
import { useRouter } from "next/router";
import { withSSRGuest } from '@/utils/withGuest';

export const getServerSideProps = withSSRGuest(async ctx => {
  return {
    props: {}
  };
});

export default function SelectorAccess() {
  const router = useRouter();

  return (
    <AccessTemplate>
      <CForm>
        <h1>smart EAD</h1>
        <p className="text-medium-emphasis">Selecione um perfil de acesso</p>
        <CRow>
          <CCol xs={12}>
            <CButton color="primary" className="px-4 form-control" onClick={() => router.push('/acesso/aluno')}>
              Aluno
            </CButton>
          </CCol>
          <CCol xs={12} style={{ marginTop: '1rem' }}>
            <CButton color="primary" className=" px-4 form-control" onClick={() => router.push('/acesso/professor')}>
              Professor
            </CButton>
          </CCol>
        </CRow>
      </CForm>
    </AccessTemplate>

  );
}