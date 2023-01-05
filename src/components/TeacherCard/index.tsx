import React from 'react';
import { TeacherType } from '~/types/basic';
import { Flex, Text, Avatar, useColorModeValue } from "@chakra-ui/react";


type TestimonialCardProps = {
  teacher: TeacherType
}

const TeacherCard = ({teacher} : TestimonialCardProps) => {
  return (
    <Flex
      boxShadow={'md'}
      maxW={'100%'}
      direction={{ base: 'column-reverse', md: 'row' }}
      width={'full'}
      rounded={'md'}
      p={10}
      justifyContent={'space-between'}
      position={'relative'}
      bg={useColorModeValue('white', 'gray.800')}
     >
      <Flex
        direction={'column'}
        textAlign={'left'}
        justifyContent={'space-between'}>
        <Text
          fontFamily={'Inter'}
          fontWeight={'medium'}
          fontSize={'15px'}
          pb={4}>
         {teacher.bio}
        </Text>
        <Text fontFamily={'Work Sans'} fontWeight={'bold'} fontSize={14}>
          {teacher.name}
         
        </Text>
      </Flex>
      <Avatar
        src={teacher.photo}
        height={'80px'}
        width={'80px'}
        alignSelf={'center'}
        m={{ base: '0 0 35px 0', md: '0 0 0 50px' }}
      />
    </Flex>
  );
}

export default TeacherCard;