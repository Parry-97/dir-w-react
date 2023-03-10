import { screen } from "@testing-library/react"
import { server } from "../../__tests__/msw/server"
import { customRender } from "../../__tests__/test-utils"
import { SearchResults } from "../SearchResults"
import { rest } from 'msw'

describe('The Search results component should display', () => {
  it('the all employee as result when the search term is empty', async () => {
    customRender(<SearchResults />)
    let pageHeading = await screen.findByText("All Employees (10)")

    let links = await screen.findAllByRole("link")
    let employeeRouteRegex = /^\/employees\/\d\d?/;
    let employeeLinks = links.filter((link) =>
      employeeRouteRegex.test(link.getAttribute("href"))
    );
    expect(employeeLinks).toHaveLength(10);
  })

  it('the search results when the search term is not empty', async () => {

    customRender(<SearchResults />, { initialEntries: ["/?q=nonempty"] })
    let pageHeading = await screen.findByText("Search Results (10)")
    // screen.debug()
    //
    let links = await screen.findAllByRole("link")
    let employeeRouteRegex = /^\/employees\/\d\d?/;
    let employeeLinks = links.filter((link) =>
      employeeRouteRegex.test(link.getAttribute("href"))
    );
    expect(employeeLinks).toHaveLength(10);
  })

  it('no results when the search term does not match with server data', async () => {
    server.use(
      rest.get('http://localhost:3030/employees', (req, res, ctx) => {
        return res(ctx.json([]))
      })
    )
    customRender(<SearchResults />, { initialEntries: ["/?q=nonempty"] })
    let pageHeading = await screen.findByText("Search Results (0)")
    let links = await screen.queryAllByRole("link")
    let employeeRouteRegex = /^\/employees\/\d\d?/;
    let employeeLinks = links.filter((link) =>
      employeeRouteRegex.test(link.getAttribute("href"))
    );
    expect(employeeLinks).toHaveLength(0);
    // screen.debug()
  })



})
