//Make login feature so we can save the score to a username
import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import DeleteBtn from "../components/DeleteBtn";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, StartBtn, FormBtn } from "../components/Form";

class LogIn extends Component {
  state = {
    users: [],
    // user: {},
    name: "",
    id: "",
    userState: false
  }

  componentDidMount(){
    this.loadScores();
  }

  loadScores = () => {
    // Get highscore list
    API.getScores()
      .then(res =>
        { 
        // Check if Userlist is longer than 6 people
        if(res.data.length >= 6){
          let temp = [];
          // Only grab the newest 6
          for(let i = res.data.length-6; i < res.data.length; i++){
            temp.push(res.data[i]);
          }
            this.setState({ users: temp })
          } else {
            this.setState({ users: res.data, name: "", id: ""})
          }
        }
      )
      .catch(err => console.log(err))
  }

  checkName = (name) => {
    this.state.users.map(users => {
      if(users.name === name){
        console.log("same name")
      }
    })
  }


  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleFormSubmit = event => {
    event.preventDefault();



    if(this.state.name && !this.state.repeat){
      API.saveUser({
        name: this.state.name,
        highscore: 0
      })
        .then(res => this.loadScores())
        .catch(err => console.log(err));
    } else {
      //Make ID the user with same name
    }
    //Shows new user has been made
    this.setState({
      userState: true
    });
    this.runTheGame()
  }

  runTheGame = () => {
    console.log(this.state.users)
    this.props.history.push('/game')
  }

  deleteTheScore = (id) => {
    API.deleteScore(id)
    .then(res => this.loadScores())
    .catch(err => console.log(err));
  }

  render(){
    return(
      <Container fluid>
      <Row>
        <Col size="md-12">
          <Jumbotron>
            <h1>Log In to play the Memory Game!</h1>
          </Jumbotron>
          <form>
            <Input
              value={this.state.name}
              onChange={this.handleInputChange}
              name="name"
              placeholder="Username"
            />
            {/* <StartBtn
              disabled={!(this.state.userState)}
              onClick={this.runTheGame}
            >
              Start
            </StartBtn> */}
            <FormBtn
              disabled={!(this.state.name)}
              onClick={this.handleFormSubmit}
            >
              Submit
            </FormBtn>
          </form>
        </Col>
      </Row>
      <Row>
        <Col size="md-6 sm-12">
          <Jumbotron>
            <h1>Recent Players</h1>
          </Jumbotron>
          {this.state.users.length ? (
            <List>
              {this.state.users.map(user => (
                <ListItem key={user._id}>
                  <Link to={"/scores/" + user._id}>
                    <strong>
                      {user.name} : {user.highscore}
                    </strong>
                  </Link>
                  <DeleteBtn onClick={() => this.deleteTheScore(user._id)} />
                </ListItem>
              ))}
            </List>
          ) : (
            <h3>No Results to Display</h3>
          )}
        </Col>
      </Row>
    </Container>
    )
  }

};

export default LogIn;