import { useSearchParams } from "react-router-dom";

export const useSearchTerm = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // the || (logical or) operator will return the first value if it's truthy;
  //   otherwise it will return the second value
  const searchTerm = searchParams.get("q") || "";
  const setSearchTerm = (searchTerm) => setSearchParams({ q: searchTerm });

  return [searchTerm, setSearchTerm];
};
