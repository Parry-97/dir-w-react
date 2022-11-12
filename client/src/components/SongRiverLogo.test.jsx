import { render, screen } from "@testing-library/react";
import { SongRiverLogo } from "./SongRiverLogo";

// example test for reference
test("SongRiver logo contains the text 'SongRiver' when the font size is 'lg'", () => {
  render(<SongRiverLogo size="lg" />);
  const logoText = screen.getByText("SongRiver");
  expect(logoText).toBeInTheDocument();
});
