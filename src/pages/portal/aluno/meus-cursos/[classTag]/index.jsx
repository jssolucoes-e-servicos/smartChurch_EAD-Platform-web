import React, { useState } from "react";
import {
  Button, Card, CardHeader, Table, Container, Row,
  Modal, ModalHeader, ModalBody, ModalFooter
} from "reactstrap";
import AlunoTemplate from "~/templates/AlunoTemplate";
import Header from "~/components/_partials/Header";
import { withSSRAuth } from "~/utils/withSSRAuth";
import api from "~/services/api";
import { parseCookies } from "nookies";
import { getAPIClient } from "~/services/axios";
import { toast } from "react-toastify";
import moment from "moment";
import { useRouter } from 'next/router';
import LessonStatusLabel from "~/components/Decorator/LessonStatusLabel/index";

export default function MyLessonsByClass({ pageData }) {
  const router = useRouter();
  const { classTag } = router.query;
  const [classData, setClassData] = useState(pageData.lessonsList);
  const [lessonsList, setLessonsList] = useState(pageData.lessonsList.StudantOnLesson);
  const [infoLoad, setInfoLoad] = useState('Nenhum registro');
  const [dataReviewLesson, setDataReviewLesson] = useState(null);
  const [openReviewLesson, setOpenReviewLesson] = useState(false);
  const { "SEAD-02": userCookie } = parseCookies();

  const reloadCourses = async () => {
    const userData = JSON.parse(userCookie);
    const toastId = toast.loading("Consultando aulas disponívies...");
    setLessonsList([]);
    setInfoLoad('Carregando...');
    try {
      const { data } = await api.get(`studants-on-class/by-class-tag/${userData.id}/${classTag}`);
      if (data.StudantOnLesson.length > 0) {
        setLessonsList(data.StudantOnLesson);
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

  const toggle = () => setOpenReviewLesson(!openReviewLesson);

  const handleLesson = (lesson) => {
    if (lesson.concluded === false) {
      toast.info(`Abrindo aula: ${lesson.lesson.name}`);
      router.push(`/portal/aluno/meus-cursos/${classTag}/assistir/${lesson.lesson.slug}`);
    } else {
      setDataReviewLesson(lesson);
      setOpenReviewLesson(true);
    }
  }

  const ModalReviewLesson = () => {
    return (
      <Modal isOpen={openReviewLesson} toggle={toggle}>
        <ModalHeader toggle={toggle}>Assistir Novamente</ModalHeader>
        <ModalBody>
          {dataReviewLesson && (
            <div className="mb-0">
              <h4 className="mb-0">Aula: <b>{dataReviewLesson.lesson?.name}</b></h4>
              <h5 className="mb-0"><b>Você já assistiu esta aula, gostaria de assistir ela novamente?</b></h5>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secundary" onClick={() => {
            toast.info(`Abrindo aula: ${dataReviewLesson.lesson.name}`);
            router.push(`/portal/aluno/meus-cursos/${classTag}/assistir/${dataReviewLesson.lesson.slug}`);
            toggle();
          }}>
            Sim, quero!
          </Button>{' '}
          <Button color="danger" onClick={toggle}>
            Não
          </Button>
        </ModalFooter>
      </Modal>
    );
  }


  return (
    <AlunoTemplate>
      <Header />
      <ModalReviewLesson />
      <Container className="mt--5" fluid>
        <Card className="shadow">
          <CardHeader className="border-0">
            <Row className="align-items-center">
              <div className="col">
                <h3 className="mb-0">Aulas disponíveis</h3>
                <div className="mb-0">
                  <h5 className="mb-0">Curso: <b>{classData.class.course.name}</b></h5>
                  <h5 className="mb-0">Turma: <b>{classData.class.name}</b></h5>
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
                    console.log(item);
                    return (
                      <tr key={`item-${item.id}`}>
                        <td>{index + 1}</td>
                        <td><a href="#ver" onClick={() => handleLesson(item)}>{item.lesson?.name}</a></td>
                        <td>{item.lesson.type}</td>
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
  const { data } = await apiClient.get(`studants-on-class/by-class-tag/${userData.id}/${classTag}`);
  const pageData = {
    userCookie: userData,
    lessonsList: data
  }
  return {
    props: { pageData },
  }
}; 
