import { parseCookies } from "node_modules/nookies/dist/index";
import React from "react";
import { Container, } from "reactstrap";
import FutureImplementation from "~/components/FutureImplementetion/index";
import Header from "~/components/_partials/Header";
import { getAPIClient } from "~/services/axios";
import AlunoTemplate from "~/templates/AlunoTemplate";
import { withSSRAuth } from "~/utils/withSSRAuth";

export default function Page({ pageData }) {
  return (
    <AlunoTemplate>
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
  /* const { "smartEAD.user": userCookie } = parseCookies(ctx);
  const userData = JSON.parse(userCookie)
  const { data } = await getAPIClient.get(`studants-on-class/by-studant/${userData.id}`); */
  const pageData = {};
  return {
    props: { pageData },

  }
}