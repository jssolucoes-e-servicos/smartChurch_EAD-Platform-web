import React, { useState, useRef } from "react";
import Router, { useRouter } from 'next/router';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Container,
  Row,
} from "reactstrap";
import { parseCookies } from "nookies";
import { toast } from "react-toastify";
import AlunoTemplate from "~/templates/AlunoTemplate";
import Header from "~/components/_partials/Header";
import { withSSRAuth } from "~/utils/withSSRAuth";
import api from "~/services/api";
import { getAPIClient } from "~/services/axios";
import VideoPlayerYoutube from "~/components/VideoPlayerYoutube/index";

export default function MyLessonsByClass({ userData, pageData }) {
  const router = useRouter();
  const { lessonTag } = router.query;
  const [infoLoad, setInfoLoad] = useState('Nenhum registro');
  const { "SEAD-02": userCookie } = parseCookies();

  const reloadChat = async () => {
    const toastId = toast.loading("atualizando chat");
    setInfoLoad('Carregando...');
    try {
      const { data } = await api.get(`courses-lessons/find-by-tag/${lessonTag}`);
      if (data) {
        setInfoLoad('Nenhum registro');
      } else {
        setInfoLoad('Nenhum registro');
      }
      toast.update(toastId, { render: `Pronto`, type: "success", isLoading: false });
      toast.dismiss(toastId);
    } catch (err) {
      toast.update(toastId, { render: `Ops! ${err}`, type: "error", isLoading: false });
      toast.dismiss(toastId);
      setInfoLoad('Falha ao carregar chat!');
      console.error(err);
    }
  }

  const reloadFiles = async () => {
    const toastId = toast.loading("atualizando anexos");
    setInfoLoad('Carregando...');
    try {
      const { data } = await api.get(`courses-lessons/find-by-tag/${lessonTag}`);
      if (data) {
        setInfoLoad('Nenhum registro');
      } else {
        setInfoLoad('Nenhum registro');
      }
      toast.update(toastId, { render: `Pronto`, type: "success", isLoading: false });
      toast.dismiss(toastId);
    } catch (err) {
      toast.update(toastId, { render: `Ops! ${err}`, type: "error", isLoading: false });
      toast.dismiss(toastId);
      setInfoLoad('Falha ao carregar anexos!');
      console.error(err);
    }
  }

  return (
    <AlunoTemplate userData={userData}>
      <Header />
      <Container className="mt--6" fluid>
        <Card className="shadow">
          <CardBody className="mt-3">
            {pageData.lessonData.videoPlatform === 'youtube' ? (
              <VideoPlayerYoutube data={pageData.lessonData} />
            ) : (<h3>Falha ao carregar</h3>)}
          </CardBody>
          <CardFooter>

          </CardFooter>
        </Card>
      </Container>
    </AlunoTemplate >
  );
};


export const getServerSideProps = async ctx => {
  withSSRAuth(ctx);
  const { lessonTag } = ctx.params;
  const apiClient = getAPIClient(ctx);
  const { "SEAD-02": userCookie } = parseCookies(ctx);
  const userData = JSON.parse(userCookie)
  const { data } = await apiClient.get(`courses-lessons/find-by-tag/${lessonTag}`);
  const pageData = {
    userCookie: userData,
    lessonData: data
  }

  return {
    props: { userData, pageData },
  }
};