import { Card, Table } from "react-bootstrap";

const ProducersIntervalsBetweenWins = () => {
  return (
    <Card className="mt-3">
      <Card.Title className="m-3">
        Producers With Longest And Shortest Interval Between Wins
      </Card.Title>
      <Card.Body>
        <h3>Maximum</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Producer</th>
              <th>Interval</th>
              <th>Previous Year</th>
              <th>Following Year</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Matthew Vaughn</td>
              <td>13</td>
              <td>2002</td>
              <td>2015</td>
            </tr>
          </tbody>
        </Table>

        <h3>Minimum</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Producer</th>
              <th>Interval</th>
              <th>Previous Year</th>
              <th>Following Year</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Joel Silver</td>
              <td>1</td>
              <td>1990</td>
              <td>1991</td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default ProducersIntervalsBetweenWins;
