
import { Box, Flex, Heading, HStack, Table, Icon, Tbody, Td, Text, Th, Thead, Tr, Link as ChakraLink, StackDivider } from '@chakra-ui/react'
import AppTemplate from '~/templates/AppTemplate';
import { Button } from '~/components/Button'
import { withSSRAuth } from '~/utils/withSSRAuth'
import { Pagination } from '~/components/Pagination'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { RiSearch2Line, RiAddLine } from 'react-icons/ri';

import { Input } from '~/components/Form/Input';

import Link from 'next/link';
import CourseItem from '~/components/TableItems/CourseItem';



export default function MyCourses({coursesRegistreds}) {
  const [page, setPage] = useState(1)

  const { register, handleSubmit } = useForm();

  return (
    <AppTemplate page="Meu Cursos">
     


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
              <Heading size="lg" fontWeight="medium">Meus Cursos</Heading>
              <Text mt="1" color="gray.400">Listagem de cursos que estou matriculado</Text>
            </Box>

            <Flex>
              
              <Link href="/app/cursos">
                <Button
                  size="lg"
                  fontSize="xl"
                  colorScheme="blue"
                  ml="2"
                >
                  <Icon as={RiAddLine} />
                  Novo Curso
                </Button>
              </Link>
            </Flex>
          </Flex>

          <Table>
            <Thead>
              <Tr>
                <Th>Curso</Th>
                <Th>Grupo</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {coursesRegistreds.map(course => (
                <CourseItem course={course} />
              ))} 
            </Tbody>
          </Table>

          {/* <Pagination 
            totalCountOfRegisters={data?.totalCount}
            currentPage={page}
            onPageChange={setPage}
            currentCountOfPosts={data?.messages.length}
          />  */}
        </Box>




    </AppTemplate>
  )
}

/* 
export const getServerSideProps = withSSRAuth(async ctx => {
  return {
    props: {}
  };
}); */

export const getServerSideProps  = async (ctx) => {

  let list = [
    {
      id: 456,
      name: "Escola de Integração",
      slug: "escola-de-integracao",
      group: "Trilho do Crescimento",
      status: "Matriculado"
      
    },
    {
      id: 858,
      name: "Escola da Familia",
      slug: "escola-da-familia",
      group: "Coordenadoria de Casais",
      status: "Disponível"
    },
    {
      id: 23,
      name: "Curso de Capacitação para Células",
      slug: "curso-de-capacitacao-para-celulas",
      group: "Trilho do Crescimento",
      status: "Indisponível"
    }
  ]

  return {
    props: {
      coursesRegistreds: list
    }
  }
}