import { QueryCache } from "@tanstack/react-query";
import "@testing-library/jest-dom"; // to use jest-dom matchers
import "whatwg-fetch"; // Polyfill "window.fetch" used in the React component.

import { server } from "./src/__tests__/msw/server";
// Establish API mocking before all tests.

const queryCache = new QueryCache();

beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => { server.resetHandlers() });
beforeEach(() => { queryCache.clear() })

// Clean up after the tests are finished.
afterAll(() => server.close());
