import { Heading, HStack } from "@chakra-ui/react";
import { useNavigate } from "react-router";

import { SongRiverLogo } from "./SongRiverLogo";

export function Header({ children }) {
  const navigate = useNavigate();
  return (
    <HStack
      direction="row"
      justify="flex-start"
      align="center"
      spacing={8}
      boxShadow="md"
      p={2}
      w="100vw"
    >
      <SongRiverLogo size="5xl" />
      <Heading
        cursor={"pointer"}
        onClick={() => navigate("/")}
        as="h1"
        size="lg"
      >
        Employee&nbsp;&nbsp;Directory
      </Heading>
      {children}
    </HStack>
  );
}
