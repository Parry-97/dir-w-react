import { createStandaloneToast } from "@chakra-ui/toast";
import theme from "../theme/index.js";

export const { ToastContainer, toast } = createStandaloneToast({
  theme: theme,
});

// render the ToastContainer in your React root

// toast({
//   title: "An error occurred.",
//   description: "Unable to create user account.",
//   status: "error",
//   duration: 9000,
//   isClosable: true,
// });
