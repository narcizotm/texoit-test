import { render, screen, waitFor, within } from "@testing-library/react";
import { expect, test } from "vitest";
import YearsMultipleWinners from ".";

test("render component", () => {
  render(<YearsMultipleWinners />);
  const titleElement = screen.getByText("List years with multiple winners");
  expect(titleElement).toBeInTheDocument();
});

test("show multiple winners", async () => {
  render(<YearsMultipleWinners />);

  await waitFor(() => {
    const table = screen.getByRole("table");
    const tbody = within(table).getAllByRole("rowgroup")[1];
    const rows = within(tbody).getAllByRole("row");

    checkRowContents(rows[0], "1986", "2");
    checkRowContents(rows[1], "1990", "2");
    checkRowContents(rows[2], "2015", "2");
  });
});

function checkRowContents(row: any, year: string, winCount: string) {
  const columns = within(row).getAllByRole("cell");
  expect(columns).toHaveLength(2);
  expect(columns[0]).toHaveTextContent(year);
  expect(columns[1]).toHaveTextContent(winCount);
}
