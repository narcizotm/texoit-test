import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { expect, test } from "vitest";
import MoviesList from ".";

test("render component", () => {
  render(<MoviesList />);
  const titleElement = screen.getByText("List movies");
  expect(titleElement).toBeInTheDocument();
});

test("show movies list", async () => {
  render(<MoviesList />);

  await waitFor(() => {
    const table = screen.getByRole("table");
    const tbody = within(table).getAllByRole("rowgroup")[1];
    const rows = within(tbody).getAllByRole("row");

    expect(rows.length).toBe(15);
    checkRowContents(rows[0], "1", "1980", "Can't Stop the Music", "Yes");
    checkRowContents(rows[14], "15", "1981", "Tarzan, the Ape Man", "No");
  });
});

test("show search by year", async () => {
  render(<MoviesList />);

  const searchInput = screen.getByPlaceholderText(
    "Filter by year"
  ) as HTMLInputElement;
  fireEvent.change(searchInput, { target: { value: "1986" } });
  expect(searchInput.value).toBe("1986");

  await waitFor(() => {
    const table = screen.getByRole("table");
    const tbody = within(table).getAllByRole("rowgroup")[1];
    const rows = within(tbody).getAllByRole("row");

    expect(rows.length).toBe(5);
    checkRowContents(rows[0], "36", "1986", "Howard the Duck", "Yes");
    checkRowContents(rows[4], "40", "1986", "Shanghai Surprise", "No");
  });
});

test("show search by winner", async () => {
  render(<MoviesList />);

  const winnerFilter = screen.getByRole("combobox");
  fireEvent.change(winnerFilter, { target: { value: "false" } });
  const options = screen.getAllByRole("option");
  expect(options).toHaveLength(3);

  await waitFor(() => {
    const table = screen.getByRole("table");
    const tbody = within(table).getAllByRole("rowgroup")[1];
    const rows = within(tbody).getAllByRole("row");

    expect(rows.length).toBe(15);
    checkRowContents(rows[0], "2", "1980", "Cruising", "No");
    checkRowContents(rows[14], "18", "1982", "Butterfly", "No");
  });
});

test("show search by year and winner", async () => {
  render(<MoviesList />);

  const searchInput = screen.getByPlaceholderText(
    "Filter by year"
  ) as HTMLInputElement;
  fireEvent.change(searchInput, { target: { value: "1986" } });
  expect(searchInput.value).toBe("1986");

  const winnerFilter = screen.getByRole("combobox");
  fireEvent.change(winnerFilter, { target: { value: "true" } });
  const options = screen.getAllByRole("option");
  expect(options).toHaveLength(3);

  await waitFor(() => {
    const table = screen.getByRole("table");
    const tbody = within(table).getAllByRole("rowgroup")[1];
    const rows = within(tbody).getAllByRole("row");

    expect(rows.length).toBe(2);
    checkRowContents(rows[0], "36", "1986", "Howard the Duck", "Yes");
    checkRowContents(rows[1], "37", "1986", "Under the Cherry Moon", "Yes");
  });
});

function checkRowContents(
  row: any,
  id: string,
  year: string,
  title: string,
  winner: string
) {
  const columns = within(row).getAllByRole("cell");
  expect(columns).toHaveLength(4);
  expect(columns[0]).toHaveTextContent(id);
  expect(columns[1]).toHaveTextContent(year);
  expect(columns[2]).toHaveTextContent(title);
  expect(columns[3]).toHaveTextContent(winner);
}
