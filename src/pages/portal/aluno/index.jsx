import React, { useState } from "react";
import {
  Container
} from "reactstrap";
import Header from "~/components/_partials/Header";
import AlunoTemplate from "~/templates/AlunoTemplate";
import { withSSRAuth } from "~/utils/withSSRAuth";

export default function Dashboard({ pageData }) {
  const [activeNav, setActiveNav] = useState(1);


  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
  };
  return (
    <AlunoTemplate>
      <Header cards={pageData.dashboardCards} />
      <Container className="mt--7" fluid>

      </Container>
    </AlunoTemplate>
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
