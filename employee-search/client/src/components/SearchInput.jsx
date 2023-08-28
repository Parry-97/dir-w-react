import { CloseIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { useNavigate } from "react-router";
// import { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";
import { useSearchTerm } from "./custom-hooks";

const SearchInput = () => {
  const [searchTerm, setSearchValue] = useSearchTerm();
  const navigate = useNavigate();

  return (
    <div onFocus={() => navigate(`/?q=${searchTerm}`)}>
      <InputGroup>
        <InputLeftElement children={<SearchIcon />}></InputLeftElement>
        <Input
          placeholder="search"
          // @ts-ignore
          value={searchTerm}
          onChange={(evt) => {
            // @ts-ignore
            setSearchValue(evt.target.value);
          }}
        ></Input>
        <InputRightElement
          //INFO: Use setSearchParams (returned from useSearchParams) to clear the search term.
          // @ts-ignore
          onClick={(evt) => setSearchValue("")}
          children={<CloseIcon />}
        ></InputRightElement>
      </InputGroup>
    </div>
  );
};

export default SearchInput;
