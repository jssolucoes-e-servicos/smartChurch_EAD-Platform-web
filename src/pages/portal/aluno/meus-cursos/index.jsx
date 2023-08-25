import Header from "@/components/_partials/Header";
import api from "@/services/api";
import { getAPIClient } from "@/services/axios-module";
import AlunoTemplate from "@/templates/AlunoTemplate";
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
          <Table className="align-items-center table-flush table-strip" responsive>
            <thead className="thead-light">
              <tr>
                <th scope="col">Curso</th>
                <th scope="col">Turma</th>
                <th scope="col">Total de Aulas</th>
                <th scope="col">Realizado</th>
                <th scope="col">Matriculado em</th>
              </tr>
            </thead>
            <tbody>
              {
                myClasses ? (
                  myClasses.map(item => {
                    const lessonsLentgh = item.StudantOnLesson?.length;
                    let conludedCount = 0;
                    item.StudantOnLesson?.map(lesson => {
                      if (lesson) { }
                      if (lesson.concluded === true) { conludedCount += 1 }
                    });
                    const percentage = ((conludedCount / lessonsLentgh) * 100);
                    const progressColor = percentage >= 75 ? '#2dce89' : (percentage >= 25 ? '#ffd600' : '#f5365c');
                    return (
                      <tr key={`item-${item.id}`}>
                        <td><Link href={`/portal/aluno/meus-cursos/${item.class?.slug}`}>{item.class.course.name}</Link></td>
                        <td>{item.class.name}</td>
                        <td>{item.StudantOnLesson.length}</td>
                        <td>
                          <span style={{ color: progressColor, fontWeight: 'bold' }}>{percentage} %</span>
                          <div className="progress" style={{ height: 5 }} role="progressbar" aria-label="Progresso" aria-valuenow={percentage} aria-valuemin={0} aria-valuemax={100}>
                            <div className="progress-bar" style={{ width: `${percentage}%`, backgroundColor: progressColor }}></div>
                          </div>

                        </td>
                        <td> {moment(item.createdAt).format('DD/MM/YYYY')}</td>
                      </tr>
                    )
                  })
                ) : (
                  <tr>
                    <td className={`text-${infoLoad === 'Nenhum registro' ? 'danger' : 'primary'
                      } pl-5 pt-2`}>
                      {infoLoad}
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                )
              }
            </tbody>
          </Table>
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
