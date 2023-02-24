import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export function useSearchTerm() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setsearchValue] = useState("");

  useEffect(() => {
    setSearchParams({ q: searchValue });
  }, [searchValue]);

  const setSearchTerm = function (value) {
    setsearchValue(value);
  };

  return [searchValue ?? "", setSearchTerm];
}
