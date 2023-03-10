import { screen } from "@testing-library/react";
import { server } from "../../__tests__/msw/server";
import { rest } from 'msw'
import { employeesWithBadgeDetails } from "../../__tests__/test-data";
import { Employee } from "../Employee";
import { customRender } from "../../__tests__/test-utils";


// @ts-ignore
function wait(milliseconds) {
  return new Promise(resolve => {
    setTimeout(resolve, milliseconds);
  });
}

describe('The Employee component', () => {
  it('should display the employee data from the server', async () => {
    customRender(<Employee />)

    let firstName = await screen.findByText(employeesWithBadgeDetails[0].firstName)
    let lastName = await screen.findByText(employeesWithBadgeDetails[0].lastName)
    let jobTitle = await screen.findByText(employeesWithBadgeDetails[0].jobTitle)
    let badgesHeading = await screen.findByText("Badges")
    let image = screen.queryAllByRole("img")
    let addBadge = await screen.findByLabelText("add new badge")

    expect(firstName).toBeInTheDocument()
    expect(lastName).toBeInTheDocument()
    expect(jobTitle).toBeInTheDocument()
    expect(image[0]).toHaveAttribute("src", "http://localhost:3030/" + employeesWithBadgeDetails[0].imageFilePath)
    expect(addBadge).toBeInTheDocument()
    expect(badgesHeading).toBeInTheDocument()

    // let jobTitle2 = await screen.findByText("test")

  })

  it('should display the no badges heading for an employee without badges', async () => {
    server.use(
      rest.get('http://localhost:3030/employees/:id', (req, res, ctx) => {
        return res(ctx.json(
          employeesWithBadgeDetails[1]
        ))
      })
    )
    customRender(<Employee />)
    let badgesHeading = await screen.findByText("No Badges Yet")
    expect(badgesHeading).toBeInTheDocument()
    // screen.debug()
  })
})

