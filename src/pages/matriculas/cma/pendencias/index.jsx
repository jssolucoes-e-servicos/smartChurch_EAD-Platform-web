import React from "react";
import {
  Container,
} from "reactstrap";
import CMATemplate from "~/templates/CMATemplate";
import Header from "~/components/_partials/Header";
import { withSSRAuth } from "~/utils/withSSRAuth";

export default function DashboardCMA({ pageData, userData }) {

  return (
    <CMATemplate userData={userData}>
      <Header />
      <Container className="mt--7" fluid>

      </Container>
    </CMATemplate>
  );
};


export const getServerSideProps = async ctx => {
  withSSRAuth(ctx);
  const { "SEAD-02": userCookie } = parseCookies(ctx);
  const userData = JSON.parse(userCookie)
  const pageData = {}
  return {
    props: { userData, pageData },
  }
} 
