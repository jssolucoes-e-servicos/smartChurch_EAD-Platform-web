import { 
  useDisclosure,
  Box,
  Td,
  Tr,
  Link as ChakraLink,  
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react';
import FileStats from './Stats';
import Link from 'next/link';
import { FileType } from '~/types/basic';
import { useState } from 'react';

type FileProps = {
  file : FileType
}

export default function FilesItem({ file }:FileProps) {

  return (
    <>
      <Tr key={file.id}>
        <Td>
          <Box>

              <ChakraLink
                title="Visualizar"
                fontSize="md"
                color="blue.500"
                onClick={()=> {
                  window.open(`${window.location.protocol}//${window.location.host}/storage/files/${file.url}.pdf`,
                   '_blank');}}
              >
                <FileStats format={file.format}/>
                {file.name}
              </ChakraLink>
     
          </Box>
        </Td>

      </Tr>

      
      
      
      
    </>
    
  )
}
