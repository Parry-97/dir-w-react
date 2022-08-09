import { CloseIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { useSearchQuery } from "../hooks/useSearchQuery";

export function SearchInput() {
  const [searchQuery, setSearchQuery] = useSearchQuery();

  const resetSearchQuery = () => setSearchQuery("");
  const handleChange = (event) => setSearchQuery(event.target.value);

  const navigate = useNavigate();
  const handleFocus = () => navigate(`/?q=${searchQuery}`);

  return (
    <InputGroup onFocus={handleFocus}>
      <InputLeftElement pointerEvents="none">
        <SearchIcon />
      </InputLeftElement>
      <Input placeholder="search" value={searchQuery} onChange={handleChange} />
      <InputRightElement>
        <Button aria-label="clear search" onClick={resetSearchQuery}>
          <CloseIcon color="gray.600" />
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}
