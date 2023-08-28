import { render, screen } from "@testing-library/react";
import { Badge } from "../Badge";

//NOTE: it is just an alias of test. They are the same
test('Badge component render detail from badge data', () => {
  const badgeData = {
    id: 2,
    name: "Karaoke Star",
    imageFilePath: "images/badges/karaoke.png",
  }
  render(<Badge badge={badgeData} />)
  let element = screen.getByText(badgeData.name)
  expect(element).toBeInTheDocument();

})
