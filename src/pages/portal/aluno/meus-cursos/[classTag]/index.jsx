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
import AlunoTemplate from "~/templates/AlunoTemplate";
import Header from "~/components/_partials/Header";
import { withSSRAuth } from "~/utils/withSSRAuth";
import api from "~/services/api";
import { parseCookies } from "nookies";
import { getAPIClient } from "~/services/axios";
import { toast } from "react-toastify";
import moment from "moment";
import Router, { useRouter } from 'next/router';
import Link from "next/link";

export default function MyLessonsByClass({ pageData }) {
  const router = useRouter();
  const { classTag } = router.query;

  const [activeNav, setActiveNav] = useState(1);
  const [classData, setClassData] = useState(pageData.lessonsList);
  const [lessonsList, setLessonsList] = useState(pageData.lessonsList.course.CourseLesson);
  const [infoLoad, setInfoLoad] = useState('Nenhum registro');
  const { "SEAD-02": userCookie } = parseCookies();

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };

  const reloadCourses = async () => {
    const userData = JSON.parse(userCookie);
    const toastId = toast.loading("Consultando aulas disponívies...");
    setLessonsList([]);
    setInfoLoad('Carregando...');
    try {
      const { data } = await api.get(`studants-on-class/by-class-tag/${classTag}`);

      if (data.course.CourseLesson.length > 0) {
        setLessonsList(data.course.CourseLesson);
      } else {
        setInfoLoad('Nenhum registro');
        setLessonsList([]);
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
    <AlunoTemplate>
      <Header />
      <Container className="mt--5" fluid>
        <Card className="shadow">
          <CardHeader className="border-0">
            <Row className="align-items-center">
              <div className="col">
                <h3 className="mb-0">Aulas disponíveis</h3>
                <div className="mb-0">
                  <h5 className="mb-0">Curso: <b>{classData.course.name}</b></h5>
                  <h5 className="mb-0">Turma: <b>{classData.name}</b></h5>
                </div>
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
                <th scope="col">Aula</th>
                <th scope="col">Nome</th>
                <th scope="col">Tipo de Aula</th>
                <th scope="col">Realizado</th>
              </tr>
            </thead>
            <tbody>
              {
                lessonsList ? (
                  lessonsList.map((item, index) => {
                    return (
                      <tr key={`item-${item.id}`}>
                        <td>{index + 1}</td>
                        <td><Link href={`/portal/aluno/meus-cursos/${classTag}/assistir/${item.slug}`}>{item.name}</Link></td>
                        <td>{item.type}</td>
                        {/* <td><Link href={`/portal/aluno/meus-cursos/aulas/${item.class.id}`}>{item.class.course.name}</Link></td> */}
                        <td>{`<< Não Calculado >>`}</td>
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
  const { classTag } = ctx.params;
  const apiClient = getAPIClient(ctx);
  const { "SEAD-02": userCookie } = parseCookies(ctx);
  const userData = JSON.parse(userCookie)
  const { data } = await apiClient.get(`studants-on-class/by-class-tag/${classTag}`);
  const pageData = {
    userCookie: userData,
    lessonsList: data
  }

  return {
    props: { pageData },
  }
}; 
