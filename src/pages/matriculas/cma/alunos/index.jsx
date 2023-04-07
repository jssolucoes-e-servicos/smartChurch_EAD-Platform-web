import React, { useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Table,
  Container,
  Row,
  Col,
  Form,
  Collapse,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { CFormInput } from '@coreui/react'
import CMATemplate from "~/templates/CMATemplate";
import { useForm } from 'react-hook-form';
import Header from "~/components/_partials/Header";
import { withSSRAuth } from "~/utils/withSSRAuth";
import { parseCookies } from "node_modules/nookies";
import { toast } from "node_modules/react-toastify";
import moment from "node_modules/moment/moment";
import api from "~/services/api";

export default function DashboardCMA({ userData }) {
  const { register, handleSubmit, formState } = useForm();
  const [persons, setPersons] = useState(null);
  const [infoLoad, setInfoLoad] = useState('Nenhum registro');
  const [isOpenRegister, setIsOpenRegister] = useState(false);
  const { errors } = formState;
  const toggleRegister = () => setIsOpenRegister(!isOpenRegister);

  const handleFind = async ({ name }) => {
    setPersons(null);
    if (name.length <= 2) {
      toast.info('digite no mínimo 3 caracteres');
    } else {
      const toastId = toast.loading("Consultando...");
      try {
        const { data } = await api.post(`persons/find-with-name`, {
          churchId: userData.PersonsOnChurches[0].church.id,
          name: name
        });
        setPersons(data);
        console.log(data);
        toast.update(toastId, { render: `Pronto`, type: "success", isLoading: false });
        toast.dismiss(toastId);
      } catch (error) {
        toast.update(toastId, { render: `Ops! ${error}`, type: "error", isLoading: false });
        toast.dismiss(toastId);
        toast.error('Ops! Falha ao pesquisar esta pessoa');
      }
    }
  }

  return (
    <CMATemplate userData={userData}>
      <Header />
      <Container className="mt--7" fluid>
        <Card className="shadow">
          <CardHeader className="border-0">
            <Row className="align-items-center">
              <div className="col">
                <h3 className="mb-0">Matrícula de Alunos</h3>
              </div>
              {/* <div className="col text-right">
                <Button
                  color={isOpenRegister ? 'danger' : 'primary'}
                  onClick={toggleRegister}
                  size="md"
                >
                  {isOpenRegister ? 'Cancelar' : 'Nova Matricula'}
                </Button>
              </div> */}
            </Row>
            <Form onSubmit={handleSubmit(handleFind)}>
              <FormGroup floating>
                <Label for="txtName">
                  <b>Nome da Pessoa</b><span>(no cadastro de membros da IEQTM)</span>
                </Label>
                <CFormInput
                  id="txtName"
                  placeholder="Nome da pessoa"
                  type="text"
                  {...register('name')}
                  error={errors.name}
                />
              </FormGroup>
            </Form>
          </CardHeader>
          <CardBody>


            {/* <Collapse isOpen={true}>
              
            </Collapse> */}

          </CardBody>
        </Card>

        <Card className="shadow mt-2">
          <CardHeader className="border-0">
            <Row className="align-items-center">
              <div className="col">
                <h4 className="mb-0">Pessoas Encontradas {persons ? `(${persons.length})` : ''}</h4>
              </div>
            </Row>
          </CardHeader>
          <Table className="align-items-center table-flush table-strip" responsive>
            <thead className="thead-light">
              <tr>
                <th scope="col">Nome</th>
                <th scope="col">E-mail | Telefone</th>
                <th scope="col">Data de Cadastro</th>
                <th scope="col">Ações</th>
              </tr>
            </thead>
            <tbody>
              {
                persons ? (
                  persons.map(item => {
                    return (
                      <tr key={`item-${item.id}`}>
                        <td><h4>{item.name}</h4></td>
                        <td>{item.email}<p>{item.phone}</p></td>
                        <td>{moment(item.createdAt).format('DD/MM/YYYY')}</td>
                        <td> <Button
                          color='primary'
                          onClick={toggleRegister}
                          size="sm"
                        >
                          Matricular
                        </Button></td>
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
    </CMATemplate >
  );
};


export const getServerSideProps = async ctx => {
  withSSRAuth(ctx);
  //  const apiClient = getAPIClient(ctx);
  const { "SEAD-02": userCookie } = parseCookies(ctx);
  const userData = JSON.parse(userCookie)
  // const { data } = await apiClient.get(`studants-on-class/`);
  const pageData = {
    //studantsList: data
  }
  return {
    props: { userData, pageData },

  }
} 
