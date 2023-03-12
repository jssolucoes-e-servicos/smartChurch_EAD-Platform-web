import React, { useState } from 'react';
import { toast } from 'react-toastify';
import {
  Button,
  Card,
  CardHeader,
  Table,
  Row,
} from "reactstrap";

const MessagesList = ({ messagesTransport = [] }) => {
  const [messages, setMessages] = useState(messagesTransport)
  const [infoLoad, setInfoLoad] = useState('Nenhum registro');

  const reloadMessages = async () => {
    const toastId = toast.loading("Verificando mensagens...");
    setInfoLoad('Carregando...');
    try {
      setInterval(() => {
        setMessages([]);
        setInfoLoad('Nenhum registro');
        toast.update(toastId, { render: `Pronto`, type: "success", isLoading: false });
        toast.dismiss(toastId);
      }, 2000);
    } catch (err) {
      toast.update(toastId, { render: `Ops! ${err}`, type: "error", isLoading: false });
      toast.dismiss(toastId);
      setInfoLoad('Falha ao carregar listagem!');
      console.error(err);
    }
  }

  return (
    <Card className="shadow">
      <CardHeader className="border-0">
        <Row className="align-items-center">
          <div className="col">
            <h3 className="mb-0">Mensagens</h3>
          </div>
          <div className="col text-right">
            <Button
              color="primary"
              onClick={() => reloadMessages()}
              size="sm"
            >
              Atualizar
            </Button>
          </div>
        </Row>
      </CardHeader>
      <Table className="align-items-center table-flush" responsive>
        <thead className="thead-light">
          <tr>
            <th scope="col">Origem</th>
            <th scope="col">Assunto</th>
            <th scope="col">Recebimento</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {
            messages.length > 0 ? (
              messages.map(message => {
                return (
                  <tr key={`message-${message.id}`}>
                    <td>{message.origin}</td>
                    <td>{message.subject}</td>
                    <td>{message.createdAt}</td>
                    <td>
                      <i className="fas fa-envelope  mr-3" /> {message.status}
                    </td>
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
  );
}

export default MessagesList;
