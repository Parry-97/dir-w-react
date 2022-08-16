import { useSearchParams } from "react-router-dom";

export const useSearchQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // the || (logical or) operator will return the first value if it's truthy;
  //   otherwise it will return the second value
  const searchQuery = searchParams.get("q") || "";
  const setSearchQuery = (searchTerm) => setSearchParams({ q: searchTerm });

  return [searchQuery, setSearchQuery];
};
