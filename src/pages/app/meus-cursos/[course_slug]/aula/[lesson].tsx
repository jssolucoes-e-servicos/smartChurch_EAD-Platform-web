import React from 'react';
import { 
  useColorModeValue,
  useDisclosure,
  useToast,
  Box,
  Flex,
  Heading,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
 
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { CourseType, LessonType } from '~/types/basic';
import TeacherCard from '~/components/TeacherCard';
import FilesItem from '~/components/TableItems/FilesItem';
import { setupApiClient } from "~/services/api"
import { api } from "~/services/apiClient"
import { withSSRAuth } from "~/utils/withSSRAuth"

import AppTemplate from '~/templates/AppTemplate';
import { YouTubePlayer } from '~/components/VideoPlayer/YouTube';
import { Button } from '~/components/Button';

type CourseDetailsProps = {
  course: CourseType;
  lesson: LessonType;
}

export default function CourseDetails({ course, lesson }: CourseDetailsProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const router = useRouter()


  return (
    <AppTemplate page="Assistir Aula">
      <Box
          flex="1"
          ml="6"
          borderRadius={4}
          bgColor="white" 
          shadow="0 0 20px rgba(0, 0, 0, 0.05)"
          p="4"
        >
          <YouTubePlayer videoId={lesson.videoIdentify}/>
          <Flex 
            boxShadow={'md'}
            maxW={'100%'}
            direction={{ base: 'column-reverse', md: 'row' }}
            width={'full'}
            rounded={'md'}
            mt={10}
            p={10}
            justifyContent={'space-between'}
            position={'relative'}
            bg={useColorModeValue('white', 'gray.800')}
          >
            <Box>
              <Heading size="lg" fontWeight="medium">Aula: <b>{lesson.name}</b></Heading>
              <Heading size="md" fontWeight="medium">Curso: <b>{course.name}</b></Heading>
              { lesson.material.length > 0 && (<Button mt={3} onClick={onOpen}> Ver materiais </Button>)}
            </Box>
          </Flex>
          <Flex
            textAlign={'center'}
            pt={10}
            justifyContent={'center'}
            direction={'column'}
            width={'full'}
          >
            <TeacherCard teacher={lesson.teacher} />
          </Flex>
        </Box>

      <Modal size="4xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{lesson.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            

            <Table>
            <Thead>
              <Tr>
                <Th>Arquivo</Th>
              </Tr>
            </Thead>
            <Tbody>
              {lesson?.material?.map(file => (
                <FilesItem file={file}/>
              ))} 
            </Tbody>
          </Table>


          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

     

    </AppTemplate>
  )
}







/* 

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

  return {
    props: {
      lesson:{
        "id": 1,
        "isVideo": true,
        "videoPlatform": "Youtube",
        "name": "Aula 1 | Boas vindas",
        "type": "Online",
        "participed": false,
        "description": "Aula inalgural da Escola de Integração da Quadrangular Tua Morada",
        "videoIdentify": "3hGxkJUebek",
        "material":[
          {
            "id": "bdibacbicb7898793kj",
            "format": "pdf",
            "name": "AULA 2  A ORIGEM E A QUEDA DO HOMEM",
            "url": "8e51b0b6c1ac6e87e1c75a2468e423e0_aula-2"
          }
        ],

        teacher: {
          "id": "fbwfhgofnwfrg98749",
          "name": "Pastor Fabiano dos Santos",
          "bio": "Pastor titular da Quadrangular Tua Morada, Seperintendente da Região 749- Porto alegre 4",
          "photo": 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
        }
      },
      course: {
        id: "bxub8a9c08ctcabca6cac8ashc9",
        name: "Escola de Integração",
        group: "Trilho do Crescimento",
        slug: "escola-de-integracao",
        status: "Matriculado",
      }
    }
  }
}