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
import Header from "@/components/_partials/Header";
import AlunoTemplate from "@/templates/AlunoTemplate";
import { withSSRAuth } from "@/utils/withSSRAuth";
export default function Page({ userData, pageData }) {
  const [activeNav, setActiveNav] = useState(1);
  const [evaluations, setEvaluations] = useState([]);
  const [infoLoad, setInfoLoad] = useState('Nenhum registro');
  const { "SEAD-02": userCookie } = parseCookies();

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
  };

  const reloadEvaluations = async () => {
    const userData = JSON.parse(userCookie);
    const toastId = toast.loading("Consultando avaliações...");
    setInfoLoad('Carregando...');
    try {

      setInterval(() => {
        setInfoLoad('Nenhum registro');
        setEvaluations([]);
        toast.update(toastId, { render: `Pronto`, type: "success", isLoading: false });
        toast.dismiss(toastId);
      }, 3000);

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
                <h3 className="mb-0">Avaliações Disponíveis</h3>
              </div>
              <div className="col text-right">
                <Button
                  color="primary"
                  disable={true}
                  onClick={() => reloadEvaluations}
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
                <th scope="col">Avaliação</th>
                <th scope="col">Curso</th>
                <th scope="col">Situação</th>
                <th scope="col">Disponivel até</th>
              </tr>
            </thead>
            <tbody>
              {
                evaluations ? (
                  evaluations.map(item => {
                    return (
                      <tr key={`item-${item.id}`}>
                        <td><Link href={`/portal/aluno/meus-cursos/${item.class.slug}`}>{item.class.course.name}</Link></td>
                        <td>{item.class.name}</td>
                        <td>{item.class.course.CourseLesson.length}</td>
                        <td>{`<< Não Calculado >>`}</td>
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
  /* const apiClient = getAPIClient(ctx); */
  const { "SEAD-02": userCookie } = parseCookies(ctx);
  const userData = JSON.parse(userCookie)
  //const { data } = await apiClient.get(`studants-on-class/by-studant/${userData.id}`);
  const pageData = {}
  return {
    props: { userData, pageData },
  }
}; 
