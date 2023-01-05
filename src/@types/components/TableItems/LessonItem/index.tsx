import { Box, Td, Tr, Link as ChakraLink } from '@chakra-ui/react';
import LessonStats from './Stats';
import Link from 'next/link';
import { LessonType } from '~/types/basic';

type LessonProps = {
  lesson : LessonType
  courseId: string
}


export default function CourseItem({ lesson, courseId }:LessonProps) {
  return (
    <Tr key={lesson.id}>
      <Td>
        <Box>
          <Link href={`/app/meus-cursos/${courseId}/aula/${lesson.id}`} passHref>
            <ChakraLink
              title="Ver detalhes"
              fontSize="lg"
              color="blue.500"
            >
              {lesson.name}
            </ChakraLink>
          </Link>
        </Box>
      </Td>
       <Td color="gray.500">{lesson.type}</Td>
      <LessonStats status={lesson.participed}/>
    </Tr>
  )
}