import { badges, employeesWithBadgeDetails, employeesWithoutBadgeDetails } from "../test-data";
import { rest } from 'msw'
// add Mock Service Worker handlers here
export const handlers = [
  rest.get('http://localhost:3030/employees/:id', (req, res, ctx) => {

    return res(ctx.json(
      employeesWithBadgeDetails[0]
    ))
  }),
  rest.get('http://localhost:3030/badges', (req, res, ctx) => {
    return res(ctx.json([...badges]))
  })
]
