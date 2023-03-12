import userEvent from '@testing-library/user-event'
import { act, screen, waitForElementToBeRemoved } from "@testing-library/react"
import { customRender } from '../../__tests__/test-utils'
import { AddBadge } from '../AddBadge'
import { server } from '../../__tests__/msw/server'
import { rest } from 'msw'


describe('the AddBadge button triggered modal', () => {
  server.use(
    rest.post("http//:localhost:3030/employees/:employeeId/badges?badgeId=:badgeId", (req, res, ctx) => {
      res(ctx.status(200))
    })
  )
  const employee = {
    id: 41,
    firstName: "Angélica",
    lastName: "Bustos",
    imageFilePath: "images/employees/f-26.png",
    teamName: "Marketing",
    jobTitle: "VP Marketing",
    badgeIds: [2, 3],
    badgeDetails: [
      {
        id: 2,
        name: "Karaoke Star",
        imageFilePath: "images/badges/karaoke.png",
      },
      {
        id: 3,
        name: "Fashionista",
        imageFilePath: "images/badges/fashionista.png",
      },
    ],
  }
  it('does not display contain for badges already associated with the user in the drop-down', async () => {
    const user = userEvent.setup()
    customRender(<AddBadge employee={employee} />)
    const addBadge = await screen.findByRole("button")
    await act(() => { return user.click(addBadge) })

    const badgeOptions = screen.queryAllByRole("option")
    const optionValues = badgeOptions.map((badgeOpt) => badgeOpt.getAttribute("value"))
    expect(optionValues).not.toContain(employee.badgeIds)
  })

  it('does display the error text before submitting the form without selection', async () => {
    const user = userEvent.setup()
    customRender(<AddBadge employee={employee} />)
    const addBadge = await screen.findByRole("button")

    await act(async () => await user.click(addBadge))
    const errorCheck = screen.queryByText("Please select badge")
    expect(errorCheck).not.toBeInTheDocument()

    const submitButton = await screen.findByText("Add badge")
    await act(() => { return user.click(submitButton) })
    const errorText = screen.getByText("Please select badge")
  })

  it('modal does not display the error text after submitting the form', async () => {
    const user = userEvent.setup()
    customRender(<AddBadge employee={employee} />)
    const addBadge = await screen.findByRole("button")

    await act(() => { return user.click(addBadge) })
    const firstCheck = screen.queryByText("Please select badge")
    expect(firstCheck).not.toBeInTheDocument()

    const submitButton = await screen.findByText("Add badge")
    await act(() => { return user.click(submitButton) })
    const errorText = screen.getByText("Please select badge")

    await act(() => {
      return userEvent.selectOptions(
        screen.getByRole('combobox'),
        screen.getByRole('option', { name: 'Comic Relief' }),
      )
    }
    )
    // @ts-ignore
    expect(screen.getByRole('option', { name: 'Comic Relief' }).selected).toBe(true)
    await act(() => { return user.click(submitButton) })

    const secondCheck = screen.queryByText("Please select badge")
    expect(secondCheck).not.toBeInTheDocument()
  })
})
