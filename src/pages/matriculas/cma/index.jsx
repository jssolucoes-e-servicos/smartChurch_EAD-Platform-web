import React, { useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";
import CMATemplate from "~/templates/CMATemplate";
import Header from "~/components/_partials/Header";
import MessagesList from "~/components/Messages/List";
import { withSSRAuth } from "~/utils/withSSRAuth";

export default function DashboardCMA({ pageData }) {

  return (
    <CMATemplate>
      <Header cards={pageData.dashboardCards} />
      <Container className="mt--7" fluid>

      </Container>
    </CMATemplate>
  );
};


export const getServerSideProps = async ctx => {
  withSSRAuth(ctx);
  const HEADER_CARDS_ARRAY = [
    {
      title: "Cursos Matriculado",
      value: "1",
      icon: null
    },
    {
      title: "Aulas Disponíveis",
      value: "10",
      icon: null
    },
    {
      title: "Provas Pendentes",
      value: "0",
      icon: null
    },
    {
      title: "Leituras Pendentes",
      value: "0",
      icon: null
    }
  ]

  const pageData = {
    dashboardCards: HEADER_CARDS_ARRAY
  }

  return {
    props: { pageData },

  }
} 
