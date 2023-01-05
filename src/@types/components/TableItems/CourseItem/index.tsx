import { Box, Td, Tr, Link as ChakraLink } from '@chakra-ui/react';
import CourseStats from './Stats';
import Link from 'next/link';
import { CourseType } from '~/types/basic';

type CourseProps = {
  course : CourseType
}

export default function CourseItem({ course }:CourseProps) {
  return (
    <Tr key={course.id}>
      <Td>
        <Box>
          <Link href={`/app/meus-cursos/${course.slug}`} passHref>
            <ChakraLink
              title="Ver detalhes"
              fontSize="lg"
              color="blue.500"
            >
              {course.name}
            </ChakraLink>
          </Link>
        </Box>
      </Td>
      <Td color="gray.500">{course.group}</Td>
      <CourseStats status={course.status}/>
    </Tr>
  )
}