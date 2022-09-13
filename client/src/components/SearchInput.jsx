import { CloseIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { useSearchTerm } from "../hooks/useSearchTerm";

export function SearchInput() {
  const [searchTerm, setSearchTerm] = useSearchTerm();

  const resetSearchTerm = () => setSearchTerm("");
  const handleChange = (event) => setSearchTerm(event.target.value);

  const navigate = useNavigate();
  const handleFocus = () => navigate(`/?q=${searchTerm}`);

  return (
    <InputGroup onFocus={handleFocus}>
      <InputLeftElement pointerEvents="none">
        <SearchIcon />
      </InputLeftElement>
      <Input placeholder="search" value={searchTerm} onChange={handleChange} />
      <InputRightElement>
        <Button aria-label="clear search" onClick={resetSearchTerm}>
          <CloseIcon color="gray.600" />
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}
