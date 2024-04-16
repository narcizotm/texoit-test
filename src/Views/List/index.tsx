import { Card, Container, Form, InputGroup, Row, Table } from "react-bootstrap";

const List = () => {
  return (
    <Container className="p-2">
      <Row className="m-3">
        <Card>
          <Card.Title className="m-3">List Movies</Card.Title>
          <Card.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>
                    <div>Year</div>
                    <InputGroup className="mb-3">
                      <Form.Control
                        type="number"
                        placeholder="Filter by year"
                      />
                    </InputGroup>
                  </th>
                  <th>Title</th>
                  <th>
                    <div>Winner</div>
                    <Form.Select aria-label="Default select example">
                      <option value="0"></option>
                      <option value="1">Yes</option>
                      <option value="2">No</option>
                    </Form.Select>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>1980</td>
                  <td>Can't Stop the Music</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>1980</td>
                  <td>Cruising</td>
                  <td>No</td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
};

export default List;
