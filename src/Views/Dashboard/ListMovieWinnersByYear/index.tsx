import { ChangeEvent, useState } from "react";
import { Button, Card, Form, InputGroup, Table } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";

const API_URL = import.meta.env.VITE_API_URL_BASE;

interface WinnersByYear {
  id: number;
  year: number;
  title: string;
}

const MovieWinnersByYear = () => {
  const [winners, setWinners] = useState<WinnersByYear[]>([]);
  const [search, setSearch] = useState<string>("");
  const [searched, setSearched] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onChangeInputSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onClickSearch = () => {
    setSearched(true);
    fetchWinners();
  };

  const fetchWinners = async () => {
    setIsLoading(true);
    const response = await fetch(`${API_URL}?winner=true&year=${search}`);
    const winners = await response.json();
    setWinners(winners as WinnersByYear[]);
    setIsLoading(false);
  };

  console.log(search);
  return (
    <Card className="mt-3">
      <Card.Title className="m-3">List movie winners by year</Card.Title>
      <Card.Body>
        <Form.Group className="mb-4">
          <InputGroup>
            <Form.Control
              type="number"
              id="search"
              name="search"
              placeholder="Search by year"
              value={search}
              onChange={onChangeInputSearch}
            />

            <Button onClick={onClickSearch} disabled={search?.length != 4}>
              <Search />
            </Button>
          </InputGroup>
        </Form.Group>

        {isLoading ? (
          <p>Loading...</p>
        ) : Array.isArray(winners) ? (
          winners.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Year</th>
                  <th>Title</th>
                </tr>
              </thead>
              <tbody>
                {winners.map((winner, index) => {
                  return (
                    <tr key={index}>
                      <td>{winner.id}</td>
                      <td>{winner.year}</td>
                      <td>{winner.title}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          ) : searched ? (
            <p>No movies were found for the searched year</p>
          ) : (
            <p>
              Type a four-digit year in the field above and click the search
              button
            </p>
          )
        ) : (
          <p className="text-danger">Unable to list information</p>
        )}
      </Card.Body>
    </Card>
  );
};

export default MovieWinnersByYear;
