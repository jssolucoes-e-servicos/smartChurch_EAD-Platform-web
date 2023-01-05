import React from 'react';
import { Td } from '@chakra-ui/react';

import {
  FaFilePdf,
  FaFileExcel,
  FaFileWord,
  FaFilePowerpoint,
  FaFileImage,
  FaFileArchive,
  FaFileAudio, 
  FaFileCode,
  FaFileCsv, 
  FaFileVideo,
} from 'react-icons/fa';

type CourseStatus = {
  format: string;
}

export default function FileStats({ format } : CourseStatus) {
  return (
    <React.Fragment>
      { format === "pdf" && ( <Td color="red.500"><FaFilePdf/> </Td>)}
      { format === "image" &&  <Td color="gray.500"> <FaFileImage/>  </Td>}
      { format === "excel" &&  <Td color="orange.500"> <FaFileExcel/> </Td>}
      { format === "word" &&  <Td color="green.500"> <FaFileWord/>  </Td>}
      { format === "powerpoint" &&  <Td color="green.500"> <FaFilePowerpoint/>  </Td>}
      { format === "zip" &&  <Td color="green.500"> <FaFileArchive/>  </Td>}
      { format === "audio" &&  <Td color="green.500"> <FaFileAudio/>  </Td>}
      { format === "video" &&  <Td color="green.500"> <FaFileVideo/>  </Td>}
      { format === "script" &&  <Td color="green.500"> <FaFileCode/>  </Td>}
      { format === "csv" &&  <Td color="green.500"> <FaFileCsv/>  </Td>}
      
    </React.Fragment>
  )
}