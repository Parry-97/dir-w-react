import { QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { queryClient } from "../query-client";


// @ts-ignore
export const AllProviders = ({ children, options }) => {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={options?.initialEntries ?? ["/"]}>{children}</MemoryRouter>
      </QueryClientProvider>
    </div>
  )
}

// @ts-ignore
export const customRender = (ui, options) =>
  render(ui, {
    wrapper: ({ children }) => {
      return (
        <div>
          <QueryClientProvider client={queryClient}>
            <MemoryRouter initialEntries={options?.initialEntries ?? ["/"]}>{children}</MemoryRouter>
          </QueryClientProvider>
        </div>
      )
    }, ...options
  })
