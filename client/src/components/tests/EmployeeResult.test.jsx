import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { queryClient } from "../../query-client";
import { EmployeeResult } from "../EmployeeResult";

// @ts-ignore
export const wrapper = ({ children }) => {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>{children}</MemoryRouter>
      </QueryClientProvider>
    </div>
  )
}


// @ts-ignore
export const customRender = (ui, options) =>
  render(ui, { wrapper: wrapper, ...options })

describe('the rendered EmployeeResult component', () => {
  const employeeData = {
    id: 41,
    firstName: "Angélica",
    lastName: "Bustos",
    imageFilePath: "images/employees/f-26.png",
    teamName: "Marketing",
    jobTitle: "VP Marketing",
    badgeIds: [2],
  }
  test("should contain the name of the employee 's team", () => {

    customRender(<EmployeeResult employee={employeeData}></EmployeeResult>)
    let teamName = screen.getByText(employeeData.teamName)
    expect(teamName).toBeInTheDocument();
  })


  test("should contain an image of the employee with the correct source from the server", () => {

    customRender(<EmployeeResult employee={employeeData}></EmployeeResult>)
    let image = screen.getByRole("img")
    expect(image).toBeInTheDocument();
    // console.log(image.getAttribute("src"))
    expect(image).toHaveAttribute("src", "http://localhost:3030/images/employees/f-26.png")
  })

  test("should contain a link to the employee page", () => {

    customRender(<EmployeeResult employee={employeeData}></EmployeeResult>)
    let link = screen.getByRole("link")
    expect(link).toBeInTheDocument();
    // console.log(link.getAttribute("href"))
    expect(link).toHaveAttribute("href", "/employees/41?q=")
  })

  test('should contain the name of the employee', () => {

    customRender(<EmployeeResult employee={employeeData}></EmployeeResult>)
    let employeeName = screen.getByText([employeeData.firstName, employeeData.lastName].join(' '))
    expect(employeeName).toBeInTheDocument();
  })
})




