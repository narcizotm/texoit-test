import { Col, Container, Row } from "react-bootstrap";
import ProducersIntervalsBetweenWins from "./ProducersIntervalsBetweenWins";
import Top3StudiosWinners from "./Top3StudiosWinners";
import YearsMultipleWinners from "./YearsMultipleWinners";
import MovieWinnersByYear from "./ListMovieWinnersByYear";

const Dashboard = () => {
  return (
    <div>
      <Container fluid>
        <Row className="mx-2">
          <Col md="6">
            <YearsMultipleWinners />
          </Col>
          <Col md="6">
            <Top3StudiosWinners />
          </Col>
        </Row>

        <Row className="mx-2">
          <Col xl="6">
            <ProducersIntervalsBetweenWins />
          </Col>
          <Col xl="6">
            <MovieWinnersByYear/>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
