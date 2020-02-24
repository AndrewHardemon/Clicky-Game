import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import Images from "../components/Images";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
// import { List, ListItem } from "../components/List";
// import { Input, TextArea, FormBtn } from "../components/Form";
//image imports
import Occultism from "../components/Images/Occultism.png"

class Game extends Component{

  state = {
    players: [],
    name: "",
    score: "",
    lose: false
  }

  componentDidMount() {
    this.loadGame();
  }

  loadGame = () => {
    console.log("mount works")


  }



  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>Memory Game!</h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <Images>
              <img src={Occultism} alt="Occultism"></img>
            </Images>
          </Col>
        </Row>
      </Container>
    )
  }


}


export default Game;
