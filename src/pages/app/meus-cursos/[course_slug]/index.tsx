import React from 'react';
import { Box, Flex, Heading, Table, Thead, Tbody, Tr, Th, Td, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { RiSendPlaneLine } from 'react-icons/ri';
import { CourseType, LessonType } from '~/types/basic';

import { setupApiClient } from "~/services/api"
import { api } from "~/services/apiClient"
import { withSSRAuth } from "~/utils/withSSRAuth"

import { AxiosError } from "axios"
import AppTemplate from '~/templates/AppTemplate';
import LessonItem from '~/components/TableItems/LessonItem';

type CourseDetailsProps = {
  course: CourseType;
}

export default function CourseDetails({ course }: CourseDetailsProps) {
  const toast = useToast()
  const router = useRouter()


  return (
    <AppTemplate page="Curso">
      <Box
          flex="1"
          ml="6"
          borderRadius={4}
          bgColor="white" 
          shadow="0 0 20px rgba(0, 0, 0, 0.05)"
          p="8"
        >
          <Flex mb="8" justifyContent="space-between" alignItems="center">
            <Box>
              <Heading size="lg" fontWeight="medium">Curso: <b>{course.name}</b></Heading>
            </Box>
            
          </Flex>
          <Table>
            <Thead>
              <Tr>
                <Th>Aula</Th>
                <Th>Tipo de Aula</Th>
                <Th>Assitiu?</Th>
              </Tr>
            </Thead>
            <Tbody>
              {course.lessons?.map(lesson => (
                <LessonItem lesson={lesson} courseId={course.slug} />
              ))} 
            </Tbody>
          </Table>
        </Box>
    </AppTemplate>
  )
}/* 

export const getServerSideProps = withSSRAuth(async ctx => {
  const { id } = ctx.params;

  const api = setupApiClient(ctx)

  const messageDataResponse = await api.get(`/messages/${id}`)

  if (!messageDataResponse.data) {
    return {
      redirect: {
        destination: '/messages',
        permanent: false
      }
    };
  }
  
  return {
    props: {
      message: messageDataResponse.data
    }
  };
}); */



export const getServerSideProps  = async (ctx) => {

  let lessons =[
  {
    "id": 1,
    "isVideo": true,
    "videoPlatform": "Youtube",
    "name": "Aula 1 | Boas vindas",
    "type": "Online",
    "participed": false,
    "videoIdentify": "3hGxkJUebek"
  },
  {
    "id": 2,
    "isVideo": true,
    "videoPlatform": "Youtube",
    "name": "Aula 2 | A Origem e Queda do Homem",
    "type": "Online",
    "participed": false,
    "videoIdentify": "iWO4zwq3tzE"
  },
  {
    "id": 3,
    "isVideo": true,
  "videoPlatform": "Youtube",
    "name": "Aula 3 | O Sacrifício da Cruz",
    "type": "Online",
    "participed": false,
    "videoIdentify": "rEvgJmK1mFo"
  },
  {
    "id": 4,
    "isVideo": true,
  "videoPlatform": "Youtube",
    "name": "Aula 4 | Nova Vida",
    "type": "Online",
    "participed": false,
    "videoIdentify": "1AllopkpX0Y"
  },
  {
    "id": 5,
    "isVideo": true,
  "videoPlatform": "Youtube",
    "name": "Aula 5 | Vida de Oração",
    "type": "Online",
    "participed": false,
    "videoIdentify": "P0tmKV0KnME"
  },
  {
    "id": 6,
    "isVideo": true,
  "videoPlatform": "Youtube",
    "name": "Aula 6 | Espírito Santo",
    "type": "Online",
    "participed": false,
    "videoIdentify": "IBNcdinPU6U"
  },
  {
    "id": 7,
    "isVideo": true,
    "videoPlatform": "Youtube",
    "name": "Aula 7 | Batismo no Espírito Santo",
    "type": "Online",
    "participed": false,
    "videoIdentify": "EzcvrOxYprQ"
  },
  {
    "id": 8,
    "isVideo": true,
  "videoPlatform": "Youtube",
    "name": "Aula 8 | Bíblia Sagrada",
    "type": "Online",
    "participed": false,
    "videoIdentify": "O8WBJ53_ymI"
  },
  {
    "id": 9,
    "isVideo": true,
  "videoPlatform": "Youtube",
    "name": "Aula 9 | A Origem e Propósito da Família",
    "type": "Online",
    "participed": false,
    "videoIdentify": "_5mnYD7QOVI "
  },
  {
    "id": 10,
    "isVideo": true,
  "videoPlatform": "Youtube",
    "name": "Aula 10 | Prosperidade é Dom de Deus",
    "type": "Online",
    "participed": false,
    "videoIdentify": "ObpLWVC9xdU"
  }
]


  return {
    props: {
      course: {
        id: "bxub8a9c08ctcabca6cac8ashc9",
        name: "Escola de Integração",
        group: "Trilho do Crescimento",
        slug: "escola-de-integracao",
        status: "Matriculado",
        lessons : lessons
      }
    }
  }
}