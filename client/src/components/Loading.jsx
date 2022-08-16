import { Center, Spinner } from "@chakra-ui/react";
import { useIsFetching, useIsMutating } from "@tanstack/react-query";

export function Loading() {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  return (
    // z-index of `1` and `-1` would work just as well
    <Center pos="fixed" width="100vw" height="100vh" zIndex={-100}>
      <Spinner
        pos="fixed"
        zIndex={100}
        aria-label="loading"
        // `isFetching + isMutating > 0` is equivallent to `isFetching > 0 || isMutating > 0`
        display={isFetching + isMutating > 0 ? "inherit" : "none"}
      />
    </Center>
  );
}
