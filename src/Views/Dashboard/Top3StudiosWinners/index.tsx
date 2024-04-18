import { useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";

const API_URL = import.meta.env.VITE_API_URL_BASE;

interface Top3Winners {
  name: string;
  winCount: number;
}

const Top3StudiosWinners = () => {
  const [winners, setWinners] = useState<Top3Winners[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchWinners = async () => {
      setIsLoading(true);
      const response = await fetch(
        `${API_URL}?projection=studios-with-win-count`
      );
      const winners = await response.json();
      setWinners(winners.studios as Top3Winners[]);
      setIsLoading(false);
    };

    fetchWinners();
  }, []);

  return (
    <Card className="mt-3">
      <Card.Title className="m-3">Top 3 studios with winners</Card.Title>
      <Card.Body>
        {isLoading ? (
          <p>loading...</p>
        ) : Array.isArray(winners) ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Win Count</th>
              </tr>
            </thead>
            <tbody>
              {winners
                .sort((a, b) => (a.winCount > b.winCount ? -1 : 1))
                .slice(0, 3)
                .map((winner, index) => {
                  return (
                    <tr key={index}>
                      <td>{winner.name}</td>
                      <td>{winner.winCount}</td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        ) : (
          <p className="text-danger">Unable to list information</p>
        )}
      </Card.Body>
    </Card>
  );
};

export default Top3StudiosWinners;
