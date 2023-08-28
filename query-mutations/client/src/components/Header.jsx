import { Heading, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { SearchInput } from "./SearchInput";
import { SongRiverLogo } from "./SongRiverLogo";

export function Header() {
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
      <Link to="/">
        <Heading as="h1" size="lg">
          Employee&nbsp;&nbsp;Directory
        </Heading>
      </Link>
      <SearchInput />
    </HStack>
  );
}
