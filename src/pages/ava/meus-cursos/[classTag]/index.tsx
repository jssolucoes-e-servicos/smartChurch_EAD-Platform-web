
import LessonListDescription from '@/components/Decorator/LessonListDescription/index';
import LessonListTitle from '@/components/Decorator/LessonListTitle/index';
import LessonStatusLabel from "@/components/Decorator/LessonStatusLabel/index";
import Header from "@/components/_partials/Header";
import api from "@/services/api";
import { getAPIClient } from "@/services/axios-module";
import AlunoTemplate from "@/templates/AlunoTemplate";
import { withSSRAuth } from "@/utils/withSSRAuth";
import { useRouter } from 'next/router';
import { parseCookies } from "nookies";
import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  Button, Card, CardHeader,
  Container,
  Row,
  Table
} from "reactstrap";


export default function MyLessonsByClass({ userData, pageData }) {
  const router = useRouter();
  const { classTag } = router.query;
  const [lessons, setLessons] = useState(pageData.lessons);
  const [classData, setClassData] = useState(pageData.class);
  const [course, setCourse] = useState(pageData.course);


  const [infoLoad, setInfoLoad] = useState('Nenhum registro');
  const { "SEAD-02": userCookie } = parseCookies();

  const reloadCourses = async () => {
    const userData = JSON.parse(userCookie);
    const toastId = toast.loading("Consultando aulas disponívies...");
    setLessons([]);
    setInfoLoad('Carregando...');
    try {
      const { data } = await api.get(`ead/studants-on-classes/${userData.Church.id}/by-class-tag/${userData.id}/${classTag}`);
      if (data.StudantOnLesson.length > 0) {
        setLessons(data.StudantOnLesson);
      } else {
        setInfoLoad('Nenhum registro');
        setLessons([]);
      }
      setCourse(data.class.course);
      setClassData({
        id: data.class.id,
        name: data.class.name,
        slug: data.class.slug
      });
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
      <Container className="mt--5" fluid>
        <Card className="shadow">
          <CardHeader className="border-0">
            <Row className="align-items-center">
              <div className="col">
                <h3 className="mb-0">Aulas disponíveis</h3>
                <div className="mb-0">
                  <h5 className="mb-0">Curso: <b>{course.name}</b></h5>
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
                <th scope="col">Descrição</th>
                <th scope="col">Tipo de Aula</th>
                <th scope="col">Realizado</th>
              </tr>
            </thead>
            <tbody>
              {
                lessons ? (
                  lessons.map((item, index) => {
                    return (
                      <tr key={`item-${item.id}`}>
                        <td>{`[ ${index + 1} ] `}<LessonListTitle tag={classTag} data={item} /></td>
                        <td><LessonListDescription description={item.lesson.description} /></td>
                        <td><i className="fab fa-youtube" /> Online</td>
                        <td><LessonStatusLabel lesson={item} /></td>
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
  const { data } = await apiClient.get(`ead/studants-on-classes/${userData.Church.id}/by-class-tag/${userData.id}/${classTag}`);
  const pageData = {
    userCookie: userData,
    course: data.class.course,
    lessons: data.StudantOnLesson,
    class: {
      id: data.class.id,
      name: data.class.name,
      slug: data.class.slug
    }
  }
  return {
    props: { userData, pageData },
  }
}; 
