import React from 'react';
import { Td } from '@chakra-ui/react';

type CourseStatus = {
  status: string;
}

export default function CourseStats({ status } : CourseStatus) {
  return (
    <React.Fragment>
      { status === "Indisponível" && ( <Td color="red.500"> {status} </Td>)}
      { status === "Disponível" &&  <Td color="orange.500"> {status} </Td>}
      { status === "Matriculado" &&  <Td color="green.500"> {status} </Td>}
      { status === "Concluído" &&  <Td color="gray.500"> {status} </Td>}
    </React.Fragment>
  )
}