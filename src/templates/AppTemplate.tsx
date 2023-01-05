import React from 'react';
import { Box, Flex, Heading, HStack, Table, Icon, Tbody, Td, Text, Th, Thead, Tr, Link as ChakraLink, StackDivider } from '@chakra-ui/react'

import { Sidebar } from '~/partials/Sidebar'
import { Header } from '~/partials/Header'



export default function AppTemplate({children, page}){
  return (
    <Box>
      <Header page={page} />
      <Flex width="100%" my="6" maxWidth={1480} marginX="auto">
        <Sidebar />
        {children}
      </Flex>
      </Box>
  );
}