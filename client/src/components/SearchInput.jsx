import { CloseIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const SearchInput = () => {
  const [searchParams, setSearchParams] = useSearchParams({ q: "" });
  const [searchValue, setsearchValue] = useState("");

  useEffect(() => {
    setSearchParams({ q: searchValue });
  }, [searchValue]);

  return (
    <div>
      <InputGroup>
        <InputLeftElement children={<SearchIcon />}></InputLeftElement>
        <Input
          placeholder="search"
          // @ts-ignore
          value={searchValue}
          onChange={(evt) => {
            setsearchValue(evt.target.value);
            setSearchParams({ q: evt.target.value });
          }}
        ></Input>
        <InputRightElement
          //INFO: Use setSearchParams (returned from useSearchParams) to clear the search term.
          onClick={(evt) => setsearchValue("")}
          children={<CloseIcon />}
        ></InputRightElement>
      </InputGroup>
    </div>
  );
};

export default SearchInput;
