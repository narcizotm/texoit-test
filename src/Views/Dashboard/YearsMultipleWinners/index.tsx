import { useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";

const API_URL = import.meta.env.VITE_API_URL_BASE;

interface MultipleWinners {
  year: number;
  winnerCount: number;
}

const YearsMultipleWinners = () => {
  const [winners, setWinners] = useState<MultipleWinners[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchWinners = async () => {
      setIsLoading(true);
      const response = await fetch(
        `${API_URL}?projection=years-with-multiple-winners`
      );
      const winners = await response.json();
      setWinners(winners.years as MultipleWinners[]);
      setIsLoading(false);
    };

    fetchWinners();
  }, []);

  return (
    <Card className="mt-3">
      <Card.Title className="m-3">List years with multiple winners</Card.Title>
      <Card.Body>
        {isLoading ? (
          <p>carregando...</p>
        ) : Array.isArray(winners) ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Year</th>
                <th>Win Count</th>
              </tr>
            </thead>
            <tbody>
              {winners.map((winner, index) => {
                return (
                  <tr key={index}>
                    <td>{winner.year}</td>
                    <td>{winner.winnerCount}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        ) : (
          <p className="text-danger">Não foi possível listar as informações</p>
        )}
      </Card.Body>
    </Card>
  );
};

export default YearsMultipleWinners;
