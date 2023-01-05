import React from 'react';
import { Td } from '@chakra-ui/react';

type CourseStatus = {
  status: boolean;
}

export default function CourseStats({ status } : CourseStatus) {
  return (
    <React.Fragment>
      { status === true ? <Td color="gray.500"> Já assistiu </Td> : <Td color="green.500"> Disponível </Td> }
    </React.Fragment>
  )
}