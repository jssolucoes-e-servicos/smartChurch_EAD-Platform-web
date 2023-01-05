import { VStack, Link, Text, Flex, Button } from "@chakra-ui/react";
import { RiContactsLine, RiPencilRulerLine, RiPriceTag3Line, RiSettings2Line, RiSendPlaneLine, RiLogoutBoxLine } from "react-icons/ri";
import { MdSchool } from 'react-icons/md';
import { signOut } from "~/contexts/AuthContext";
import { ActiveLink } from "./ActiveLink";

export function Sidebar() {
  function handleSignOut() {
    signOut()
  }

  return (
    <Flex
      as="aside" 
      w="72"
      minH="calc(100vh - 8rem)"
      bgColor="white" 
      py="8"
      shadow="0 0 20px rgba(0, 0, 0, 0.05)"
      borderRadius={4}
      direction="column"
    >
      <VStack spacing="4" pr="8" alignItems="stretch">
        <ActiveLink href="/app/inicio" passHref>
          <Link display="flex" alignItems="center" py="1" pl={8} borderLeft="3px solid">
            <MdSchool size="20" />
            <Text ml="4" fontSize="medium" fontWeight="medium">Início</Text>
          </Link>
        </ActiveLink>
        <Text fontWeight="bold" color="gray.700" fontSize="small" px={8}>GERAL</Text>
        <ActiveLink href="/app/meus-cursos" passHref>
          <Link display="flex" alignItems="center" py="1" pl={8} borderLeft="3px solid">
            <MdSchool size="20" />
            <Text ml="4" fontSize="medium" fontWeight="medium">Meus Cursos</Text>
          </Link>
        </ActiveLink>
        <ActiveLink href="/app/cursos-disponíveis" passHref>
          <Link display="flex" alignItems="center" py="1" pl={8} borderLeft="3px solid">
            <RiContactsLine size="20" />
            <Text ml="4" fontSize="medium" fontWeight="medium">Cursos Disponíveis</Text>
          </Link>
        </ActiveLink>
        <ActiveLink href="/app/minhas-aulas" passHref>
          <Link display="flex" alignItems="center" py="1" pl={8} borderLeft="3px solid">
            <MdSchool size="20" />
            <Text ml="4" fontSize="medium" fontWeight="medium">Minhas Aulas</Text>
          </Link>
        </ActiveLink>
        <ActiveLink href="/app/avaliacoes-disponiveis" passHref>
          <Link display="flex" alignItems="center" py="1" pl={8} borderLeft="3px solid">
            <RiPencilRulerLine size="20" />
            <Text ml="4" fontSize="medium" fontWeight="medium">Avliações</Text>
          </Link>
        </ActiveLink>
        <ActiveLink href="/app/secretaria/requisicoes" passHref>
          <Link display="flex" alignItems="center" py="1" pl={8} borderLeft="3px solid">
            <RiPriceTag3Line size="20" />
            <Text ml="4" fontSize="medium" fontWeight="medium">Requisições</Text>
          </Link>
        </ActiveLink>
      </VStack>
      <VStack spacing="4" pr="8" mt={8} alignItems="stretch">
        <Text fontWeight="bold" color="gray.700" fontSize="small" px={8}>SISTEMA</Text>
        <ActiveLink href="/app/configuracoes" passHref>
          <Link display="flex" alignItems="center" py="1" pl={8} borderLeft="3px solid">
            <RiSettings2Line size="20" />
            <Text ml="4" fontSize="medium" fontWeight="medium">Configuração</Text>
          </Link>
        </ActiveLink>
        <ActiveLink href="/app/ajuda" passHref>
          <Link display="flex" alignItems="center" py="1" pl={8} borderLeft="3px solid">
            <RiSendPlaneLine size="20" />
            <Text ml="4" fontSize="medium" fontWeight="medium">Ajuda</Text>
          </Link>
        </ActiveLink>
      </VStack>

      <Button
        onClick={handleSignOut}
        variant="link"
        alignSelf="flex-start"
        display="flex"
        alignItems="center"
        py="1"
        ml={8}
        mt="auto"
      >
        <RiLogoutBoxLine size="20" />
        <Text ml="4" fontSize="medium" fontWeight="medium">Sair</Text>
      </Button>
    </Flex>
  );
}