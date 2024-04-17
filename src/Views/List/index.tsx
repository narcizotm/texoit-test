import { ChangeEvent, useEffect, useState } from "react";
import {
  Button,
  Card,
  Container,
  Form,
  Pagination,
  Row,
  Table,
} from "react-bootstrap";
import styles from "./styles.module.css";

const API_URL = import.meta.env.VITE_API_URL_BASE;

interface Movies {
  id: number;
  year: number;
  title: string;
  winner: boolean;
}

const List = () => {
  const [movies, setMovies] = useState<Movies[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [yearSearch, setYearSearch] = useState<string>("");
  const [searchByYear, setSearchByYear] = useState<string>("");
  const [winnerSearch, setWinnerSearch] = useState<string>("0");
  const [searchByWinner, setSearchByWinner] = useState<string>("");

  const [firstPage, setFirstPage] = useState<boolean>(false);
  const [lastPage, setLastPage] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalElements, setTotalElements] = useState<number>(0);
  const rowsPerPage: number = 15;
  const [pageLinks, setPageLinks] = useState<number[]>([]);

  function createPageLinks(qtd: number) {
    let links: Array<number> = [];
    for (let i = 0; i < qtd; i++) {
      links.push(i);
    }
    setPageLinks(links);
  }

  const onChangeSearchByYear = (e: ChangeEvent<HTMLInputElement>) => {
    let search = e.target.value;
    setYearSearch(search);

    if (search.length === 4) {
      setSearchByYear(`&year=${search}`);
    } else {
      setSearchByYear("");
    }
  };

  const onChangeSearchByWinner = (e: ChangeEvent<HTMLSelectElement>) => {
    let search = e.target.value;
    console.log(search);
    setWinnerSearch(search);

    if (search === "true" || search === "false") {
      setSearchByWinner(`&winner=${search}`);
    } else {
      setSearchByWinner("");
    }
  };

  const resetSearchFilters = () => {
    setYearSearch("");
    setSearchByYear("");
    setWinnerSearch("");
    setSearchByWinner("");
  };

  const fetchMovies = async () => {
    setIsLoading(true);
    const response = await fetch(
      `${API_URL}?page=${page}&size=${rowsPerPage}${searchByYear}${searchByWinner}`
    );
    const movies = await response.json();
    setMovies(movies.content as Movies[]);
    setTotalPages(movies.totalPages);
    setTotalElements(movies.totalElements);
    setFirstPage(movies.first);
    setLastPage(movies.last);
    setIsLoading(false);
    createPageLinks(movies.totalPages);
  };

  useEffect(() => {
    fetchMovies();
  }, [page, searchByYear, searchByWinner]);

  return (
    <Container fluid className="p-2">
      <Row className="m-3">
        <Card>
          <Card.Title className="m-3">List Movies</Card.Title>
          <Card.Body>
            <div>
              <Table striped bordered hover className={styles.tableListMovies}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>
                      Year
                      <div>
                        <Form.Control
                          name="yearSearch"
                          value={yearSearch}
                          onChange={onChangeSearchByYear}
                          placeholder="Filter by year"
                        />
                      </div>
                    </th>
                    <th>Title</th>
                    <th>
                      Winner
                      <Form.Select
                        name="winnerSearch"
                        value={winnerSearch}
                        onChange={onChangeSearchByWinner}
                      >
                        <option value="0">Yes/No</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </Form.Select>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <div style={{ height: "670px" }}>
                      <p>carregando...</p>
                    </div>
                  ) : Array.isArray(movies) ? (
                    movies.map((movie) => {
                      return (
                        <tr key={movie.id}>
                          <td>{movie.id}</td>
                          <td>{movie.year}</td>
                          <td>{movie.title}</td>
                          <td>{movie.winner ? "Yes" : "No"}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <p className="text-danger">
                      Não foi possível listar as informações
                    </p>
                  )}
                </tbody>
              </Table>
            </div>

            {totalElements > 0 ? (
              <div className="d-flex justify-content-center align-items-baseline">
                <div className="me-3">
                  {totalElements < 2
                    ? `${totalElements} movie was found`
                    : `${totalElements} movies were found`}
                </div>
                <div className="justify-content-center">
                  <Pagination>
                    <Pagination.First
                      onClick={() => setPage(0)}
                      disabled={firstPage}
                    />
                    <Pagination.Prev
                      onClick={() => setPage(page - 1)}
                      disabled={firstPage}
                    />
                    {pageLinks.map((pg) => {
                      return (
                        <Pagination.Item
                          key={pg}
                          active={pg === page}
                          onClick={() => setPage(pg)}
                        >
                          {pg + 1}
                        </Pagination.Item>
                      );
                    })}
                    <Pagination.Next
                      onClick={() => setPage(page + 1)}
                      disabled={lastPage}
                    />
                    <Pagination.Last
                      onClick={() => setPage(totalPages - 1)}
                      disabled={lastPage}
                    />
                  </Pagination>
                </div>
              </div>
            ) : (
              <div className="d-flex align-items-baseline ">
                <p className="me-3">No movies found</p>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={resetSearchFilters}
                >
                  Reset search filters
                </Button>
              </div>
            )}
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
};

export default List;
