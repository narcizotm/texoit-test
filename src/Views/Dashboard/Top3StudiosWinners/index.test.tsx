import { render, screen, waitFor, within } from "@testing-library/react";
import { expect, test } from "vitest";
import Top3StudiosWinners from ".";

test("render component", () => {
  render(<Top3StudiosWinners/>);
  const titleElement = screen.getByText("Top 3 studios with winners");
  expect(titleElement).toBeInTheDocument();
});

test("show top 3 winners", async () => {
  render(<Top3StudiosWinners/>);

  await waitFor(() => {
    const table = screen.getByRole("table");
    const tbody = within(table).getAllByRole("rowgroup")[1];
    const rows = within(tbody).getAllByRole("row");
    
    expect(rows.length).toBe(3)
    checkRowContents(rows[0], "Columbia Pictures", "7");
    checkRowContents(rows[1], "Paramount Pictures", "6");
    checkRowContents(rows[2], "Warner Bros.", "5");

  });
});

function checkRowContents(row: any, name: string, winCount: string) {
  const columns = within(row).getAllByRole("cell");
  expect(columns).toHaveLength(2);
  expect(columns[0]).toHaveTextContent(name);
  expect(columns[1]).toHaveTextContent(winCount);
}
