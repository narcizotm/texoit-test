import { Card, Table } from "react-bootstrap"

const Top3StudiosWinners = () => {
  return (
    <Card className="mt-3">
      <Card.Title className="m-3">Top 3 Studios With Winners</Card.Title>
      <Card.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Win Count</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Columbia</td>
              <td>6</td>
            </tr>
            <tr>
              <td>Paramount</td>
              <td>6</td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  )
}

export default Top3StudiosWinners