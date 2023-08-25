import FutureImplementation from "@/components/FutureImplementetion/index";
import Header from "@/components/_partials/Header";
import { getAPIClient } from "@/services/axios-module";
import AlunoTemplate from "@/templates/AlunoTemplate";
import { withSSRAuth } from "@/utils/withSSRAuth";
import { parseCookies } from "node_modules/nookies/dist/index";
import React from "react";
import { Container, } from "reactstrap";

export default function Page({ userData, pageData }) {
  return (
    <AlunoTemplate userData={userData}>
      <Header />
      <Container className="mt--7" fluid>
        <FutureImplementation />
      </Container>
    </AlunoTemplate>
  );
}

export const getServerSideProps = async ctx => {
  withSSRAuth(ctx);
  const apiClient = getAPIClient(ctx);
  const { "SEAD-02": userCookie } = parseCookies(ctx);
  const userData = JSON.parse(userCookie)
  const pageData = {};
  return {
    props: { userData, pageData },

  }
}