// import React from "react";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import React, { Component } from "react";
import API from "../utils/API";

// Need to add API for score or just use props
class GameOver extends Component{
  state = {
    users: [],
    name: "",
    id: "",
    score: ""
  }


  componentDidMount() {
    console.log("gameover")
    API.getScores()
      .then(res =>
        {this.setState({ users: res.data, name: res.data[res.data.length-1].name, score: res.data[res.data.length-1].highscore})
        console.log(this.state.score)
        console.log(this.state.name)
        console.log(this.state.users)
        }
      )
      .catch(err => console.log(err))
  }
  
  
  render(){
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>You lost!</h1>
              <h1>{this.state.name} : {this.state.score}</h1>
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    )
  }



}

export default GameOver;