import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { expect, test } from "vitest";
import MovieWinnersByYear from ".";

test("render component", () => {
  render(<MovieWinnersByYear />);
  const titleElement = screen.getByText("List movie winners by year");
  expect(titleElement).toBeInTheDocument();
});

test("show search by year", async () => {
  render(<MovieWinnersByYear />);
  const searchInput = screen.getByPlaceholderText(
    "Search by year"
  ) as HTMLInputElement;

  fireEvent.change(searchInput, { target: { value: "1999" } });
  await waitFor(() => {
    expect(searchInput.value).toBe("1999");
  });

  const submitSearch = screen.getByRole("button");
  fireEvent.click(submitSearch);

  const table = await screen.findByRole("table");
  const tbody = within(table).getAllByRole("rowgroup")[1];
  const rows = within(tbody).getAllByRole("row");
  checkRowContents(rows[0], "101", "1999", "Wild Wild West");
});

function checkRowContents(row: any, id: string, year: string, title: string) {
  const columns = within(row).getAllByRole("cell");
  expect(columns).toHaveLength(3);
  expect(columns[0]).toHaveTextContent(id);
  expect(columns[1]).toHaveTextContent(year);
  expect(columns[2]).toHaveTextContent(title);
}
