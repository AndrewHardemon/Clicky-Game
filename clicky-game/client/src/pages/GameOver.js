import React from "react";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";

// Need to add API for score or just use props
function GameOver(props) {
  return (
    <Container fluid>
      <Row>
        <Col size="md-12">
          <Jumbotron>
            <h1>You lost!</h1>
          </Jumbotron>
        </Col>
      </Row>
    </Container>
  );
}

export default GameOver;