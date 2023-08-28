import { createStandaloneToast } from "@chakra-ui/toast";

import theme from "../theme";

// call `createSTandaloneToast` just once so that all toasts invoked by `toast`
// end up in the `ToastContainer` instance that's been added to the app
export const { toast, ToastContainer } = createStandaloneToast({ theme });
