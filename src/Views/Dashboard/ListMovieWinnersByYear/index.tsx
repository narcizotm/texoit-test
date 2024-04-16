import { Button, Card, Form, InputGroup, Table } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";

const MovieWinnersByYear = () => {
  return (
    <Card className="mt-3">
      <Card.Title className="m-3">List Movie Winners By Year</Card.Title>
      <Card.Body>
        <Form>
          <InputGroup className="mb-3">
            <Form.Control type="number" placeholder="Search by year" />
            <Button>
              <Search />
            </Button>
          </InputGroup>
        </Form>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Year</th>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>2003</td>
              <td>E o vento levou</td>
            </tr>
            <tr>
              <td>2</td>
              <td>1985</td>
              <td>Corra que a polícia vem aí</td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default MovieWinnersByYear;
