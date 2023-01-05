
import { Flex,SimpleGrid, useColorModeValue } from '@chakra-ui/react';
import AppTemplate from '~/templates/AppTemplate';
import { withSSRAuth } from '~/utils/withSSRAuth';
import MiniStatistics from "~/components/Dashboard/MiniStatistics";
import { MdSchool } from 'react-icons/md';


export default function Dashboard() {
  const iconBoxInside = useColorModeValue("white", "white");

  return (
    <AppTemplate page="Dashboard">
      <Flex flexDirection='column' pt={{ base: "120px", md: "75px" }}>
        <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing='24px'>
          <MiniStatistics
            title={"Today's Moneys"}
            amount={"$53,000"}
            percentage={55}
            icon={<MdSchool/>}
          />
          <MiniStatistics
            title={"Today's Users"}
            amount={"2,300"}
            percentage={5}
            icon={<MdSchool/>}
          />
          <MiniStatistics
            title={"New Clients"}
            amount={"+3,020"}
            percentage={-14}
            icon={<MdSchool/>}
          />
          <MiniStatistics
            title={"Total Sales"}
            amount={"$173,000"}
            percentage={8}
            icon={<MdSchool/>}
          />
        </SimpleGrid>
      </Flex>
    </AppTemplate>
  )
}

/* 
export const getServerSideProps = withSSRAuth(async ctx => {
  return {
    props: {}
  };
}); */