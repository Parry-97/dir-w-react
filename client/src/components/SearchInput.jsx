import { CloseIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";

const SearchInput = () => {
  const [searchParams, setSearchParams] = useSearchParams({ q: "" });

  return (
    <div>
      <InputGroup>
        <InputLeftElement children={<SearchIcon />}></InputLeftElement>
        <Input
          placeholder="search"
          // @ts-ignore
          value={searchParams.get("q")}
          onChange={(evt) => setSearchParams({ q: evt.target.value })}
        ></Input>
        <InputRightElement
          //INFO: Use setSearchParams (returned from useSearchParams) to clear the search term.
          onClick={(evt) => setSearchParams({ q: "" })}
          children={<CloseIcon />}
        ></InputRightElement>
      </InputGroup>
    </div>
  );
};

export default SearchInput;
