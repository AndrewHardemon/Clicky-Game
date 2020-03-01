//Make login feature so we can save the score to a username
import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import DeleteBtn from "../components/DeleteBtn";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

class LogIn extends Component {
  state = {
    users: [],
    user: {},
    name: "",
    id: "",
    repeat: false
  }

  componentDidMount(){
    this.loadScores();
  }

  loadScores = () => {
    // Get highscore list
    API.getScores()
      .then(res =>
        this.setState({ users: res.data, name: "", id: ""})
      )
      .catch(err => console.log(err))
    // Get current user
    API.getScores()
    .then(res =>
      this.setState({ user: res.data[res.data.length-1]})
    )
    .catch(err => console.log(err))
  }

  checkName = id => {
    API.getScore(id)
      .then(res =>
        this.setState({ name: res.data.name, id: res.data._id})  
      )
      .catch(err => console.log(err));
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
  }

  runTheGame = () => {
    console.log(this.state.users)
    this.props.history.push('/game')
    // this.props.history.push('/game/'+this.state.users[this.state.users.length-1]._id)
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
          <button onClick={this.runTheGame}>START</button>
        </Col>
      </Row>
      <Row>
        <Col size="md-6 sm-12">
          <Jumbotron>
            <h1>High Scores</h1>
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