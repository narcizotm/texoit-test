import { useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";
import styles from "./styles.module.css";

const API_URL = import.meta.env.VITE_API_URL_BASE;

interface IntervalsBetweenWins {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
}

const ProducersIntervalsBetweenWins = () => {
  const [longestInterval, setLongestInterval] = useState<IntervalsBetweenWins[]>([]);
  const [shortestInterval, setShortestInterval] = useState<IntervalsBetweenWins[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchWinners = async () => {
      setIsLoading(true);
      const response = await fetch(
        `${API_URL}?projection=max-min-win-interval-for-producers`
      );
      const winners = await response.json();
      setLongestInterval(winners.max as IntervalsBetweenWins[]);
      setShortestInterval(winners.min as IntervalsBetweenWins[]);
      setIsLoading(false);
    };

    fetchWinners();
  }, []);

  return (
    <Card className="mt-3">
      <Card.Title className="m-3">
        Producers With Longest And Shortest Interval Between Wins
      </Card.Title>
      <Card.Body>
        <h3>Maximum</h3>
        {isLoading ? (
          <p>carregando...</p>
        ) : Array.isArray(longestInterval) ? (
          <Table striped bordered hover className={styles.tableInterval}>
            <thead>
              <tr>
                <th>Producer</th>
                <th>Interval</th>
                <th>Previous Year</th>
                <th>Following Year</th>
              </tr>
            </thead>
            <tbody>
              {longestInterval.map((winner, index) => {
                return (
                  <tr key={index}>
                    <td>{winner.producer}</td>
                    <td>{winner.interval}</td>
                    <td>{winner.previousWin}</td>
                    <td>{winner.followingWin}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        ) : (
          <p className="text-danger">Não foi possível listar as informações</p>
        )}

        <h3>Minimum</h3>
        {isLoading ? (
          <p>carregando...</p>
        ) : Array.isArray(shortestInterval) ? (
          <Table striped bordered hover className={styles.tableInterval}>
            <thead>
              <tr>
                <th>Producer</th>
                <th>Interval</th>
                <th>Previous Year</th>
                <th>Following Year</th>
              </tr>
            </thead>
            <tbody>
              {shortestInterval.map((winner, index) => {
                return (
                  <tr key={index}>
                    <td>{winner.producer}</td>
                    <td>{winner.interval}</td>
                    <td>{winner.previousWin}</td>
                    <td>{winner.followingWin}</td>
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

export default ProducersIntervalsBetweenWins;
