import { render, screen, waitFor, within } from "@testing-library/react";
import { expect, test } from "vitest";
import ProducersIntervalsBetweenWins from ".";

test("render component", () => {
  render(<ProducersIntervalsBetweenWins />);
  const titleElement = screen.getByText(
    "Producers with longest and shortest interval between wins"
  );
  expect(titleElement).toBeInTheDocument();
});

test("show longest and shortest interval", async () => {
  render(<ProducersIntervalsBetweenWins />);

  await waitFor(() => {
    const tableLongest = screen.getByTitle("longestInterval");
    const tableShortest = screen.getByTitle("shortestInterval");
    expect(tableLongest).toBeInTheDocument();
    expect(tableShortest).toBeInTheDocument();

    const tbodyLongest = within(tableLongest).getAllByRole("rowgroup")[1];
    const rowsLongest = within(tbodyLongest).getAllByRole("row");
    expect(rowsLongest.length).toBe(1);
    checkRowContents(rowsLongest[0], "Matthew Vaughn", "13", "2002", "2015");

    const tbodyShortest = within(tableShortest).getAllByRole("rowgroup")[1];
    const rowsShortest = within(tbodyShortest).getAllByRole("row");
    expect(rowsShortest.length).toBe(1);
    checkRowContents(rowsShortest[0], "Joel Silver", "1", "1990", "1991");
  });
});

function checkRowContents(
  row: any,
  producer: string,
  interval: string,
  previousWin: string,
  followingWin: string
) {
  const columns = within(row).getAllByRole("cell");
  expect(columns).toHaveLength(4);
  expect(columns[0]).toHaveTextContent(producer);
  expect(columns[1]).toHaveTextContent(interval);
  expect(columns[2]).toHaveTextContent(previousWin);
  expect(columns[3]).toHaveTextContent(followingWin);
}
