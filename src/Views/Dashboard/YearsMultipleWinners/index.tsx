import { Card, Table } from "react-bootstrap"

const YearsMultipleWinners = () => {
  return (
    <Card className="mt-3">
      <Card.Title className="m-3">List Years With Multiple Winners</Card.Title>
      <Card.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Year</th>
              <th>Win Count</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1986</td>
              <td>2</td>
            </tr>
            <tr>
              <td>1990</td>
              <td>2</td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  )
}

export default YearsMultipleWinners