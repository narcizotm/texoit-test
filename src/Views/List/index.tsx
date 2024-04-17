import { useEffect, useState } from "react";
import { Card, Container, Pagination, Row, Table } from "react-bootstrap";

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

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      const response = await fetch(
        `${API_URL}?page=${page}&size=${rowsPerPage}`
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

    fetchMovies();
  }, [page]);

  return (
    <Container className="p-2">
      <Row className="m-3">
        <Card>
          <Card.Title className="m-3">List Movies</Card.Title>
          <Card.Body>
            {isLoading ? (
              <div style={{ height: "670px" }}>
                <p>carregando...</p>
              </div>
            ) : Array.isArray(movies) ? (
              <div>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Year</th>
                      <th>Title</th>
                      <th>Winner</th>
                    </tr>
                  </thead>
                  <tbody>
                    {movies.map((movie, index) => {
                      return (
                        <tr key={index}>
                          <td>{movie.id}</td>
                          <td>{movie.year}</td>
                          <td>{movie.title}</td>
                          <td>{movie.winner ? "Yes" : "No"}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            ) : (
              <p className="text-danger">
                Não foi possível listar as informações
              </p>
            )}
            <div>
              <Pagination className="justify-content-center">
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
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
};

export default List;
