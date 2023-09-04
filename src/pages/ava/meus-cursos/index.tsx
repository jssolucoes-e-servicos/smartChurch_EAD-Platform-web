import Header from "@/components/_partials/Header";
import api from "@/services/api";
import { getAPIClient } from "@/services/axios-module";
import AlunoTemplate from "@/templates/AlunoTemplate";
import MyCoursesTable from "@/components/Tables/MyCoursesTable";
import { withSSRAuth } from "@/utils/withSSRAuth";
import moment from "moment";
import Link from "next/link";
import { parseCookies } from "nookies";
import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardHeader,
  Container,
  Row,
  Table
} from "reactstrap";

export default function MyCourses({ userData, pageData }) {
  const [myClasses, setMyClasses] = useState(pageData.coursesList);
  const [infoLoad, setInfoLoad] = useState('Nenhum registro');
  const { "SEAD-02": userCookie } = parseCookies();

  const reloadCourses = async () => {
    const userData = JSON.parse(userCookie);
    const toastId = toast.loading("Consultando meus cursos...");
    setInfoLoad('Carregando...');
    try {
      const { data } = await api.get(`ead/studants-on-classes/${userData.Church.id}/by-studant/${userData.id}`);
      console.log(data);
      if (data.length > 0) {
        setMyClasses(data);
      } else {
        setInfoLoad('Nenhum registro');
        setMyClasses([]);
      }
      toast.update(toastId, { render: `Pronto`, type: "success", isLoading: false });
      toast.dismiss(toastId);
    } catch (err) {
      toast.update(toastId, { render: `Ops! ${err}`, type: "error", isLoading: false });
      toast.dismiss(toastId);
      setInfoLoad('Falha ao carregar listagem!');
      console.error(err);
    }
  }

  return (
    <AlunoTemplate userData={userData}>
      <Header />
      <Container className="mt--7" fluid>
        <Card className="shadow">
          <CardHeader className="border-0">
            <Row className="align-items-center">
              <div className="col">
                <h3 className="mb-0">Meus Cursos</h3>
              </div>
              <div className="col text-right">
                <Button
                  color="primary"
                  onClick={() => reloadCourses()}
                  size="sm"
                >
                  Atualizar
                </Button>
              </div>
            </Row>
          </CardHeader>
          <MyCoursesTable data={myClasses}/>
        </Card>
      </Container>
    </AlunoTemplate>
  );
};

export const getServerSideProps = async ctx => {
  withSSRAuth(ctx);
  const apiClient = getAPIClient(ctx);
  const { "SEAD-02": userCookie } = parseCookies(ctx);
  const userData = JSON.parse(userCookie)

  const { data } = await apiClient.get(`ead/studants-on-classes/${userData.Church.id}/by-studant/${userData.id}`);
  const pageData = {
    coursesList: data
  }
  console.log(data);
  return {
    props: { userData, pageData },
  }
}; 
