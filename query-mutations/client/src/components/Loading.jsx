import { Center, Spinner } from "@chakra-ui/react";
import { useIsFetching } from "@tanstack/react-query";

export function Loading() {
  const isFetching = useIsFetching();
  return (
    // z-index of `1` and `-1` would work just as well
    <Center pos="fixed" width="100vw" height="100vh" zIndex={-100}>
      <Spinner
        pos="fixed"
        zIndex={100}
        aria-label="loading"
        display={isFetching > 0 ? "inherit" : "none"}
      />
    </Center>
  );
}
