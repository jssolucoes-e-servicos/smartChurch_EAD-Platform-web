import React from "react";
import {
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CRow,
} from '@coreui/react'

function AccessTemplate({ children }) {

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  {children}
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center"
                  style={{
                    backgroundImage: "url('/assets/images/login.png')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    opacity: 0.5
                  }}
                >
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
}

export default AccessTemplate;
