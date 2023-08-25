import { PageLayoutProps } from '@/@types/app';
import {
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CRow,
} from '@coreui/react';

export default function AccessTemplate({children,userData}: PageLayoutProps) {

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
              <CCard className="text-white bg-dark py-5" >
                <CCardBody className="text-center">
                  <img
                    src="/assets/images/smartEAD-2.png"
                    height={200}
                    style={{
                      boxShadow: '10'
                    }}
                  ></img>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
}