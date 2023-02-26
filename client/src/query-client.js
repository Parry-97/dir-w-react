import { QueryCache, QueryClient } from "@tanstack/react-query";
import { toast } from "./components/Toast";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) =>
      // @ts-ignore
      toast({
        description: error.message,
        duration: 3000,
        status: "error",
        title: "Server Error",
      }),
  }),
});

export default queryClient;
