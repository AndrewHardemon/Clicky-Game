//Make login feature so we can save the score to a username
import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import DeleteBtn from "../components/DeleteBtn";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, StartBtn, FormBtn } from "../components/Form";
import Thumb from "../components/Images/pictures/Thumb.png"

class LogIn extends Component {
  state = {
    users: [],
    allUsers: [],
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
            this.setState({ allUsers: res.data, users: temp })
          } else {
            this.setState({ allUsers: res.data, users: res.data, name: "", id: ""})
          }
        }
      )
      .catch(err => console.log(err))
  }


  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleFormSubmit = event => {
    event.preventDefault();
    let userIndex = 0;
    let repeat = false;
    //See if there is a repeat name
    for(let i = 0; i < this.state.allUsers.length; i++){
      if(this.state.allUsers[i].name === this.state.name){
        userIndex = i;
        repeat = true;
        break;
      }
    }
    //If there is a repeat name
    if(repeat){
      console.log("Found previous user")
      const temp = this.state.allUsers[userIndex]
      let newUserList = this.state.allUsers;
      // Reorganize the list to have the repeat name first
      for(let j = userIndex; j < newUserList.length; j++){
        if(j === newUserList.length-1){
          newUserList[j] = temp
          console.log(newUserList)
        } else {
          newUserList[j] = newUserList[j+1]
          console.log(newUserList)
        }
      }
      // Delete the old list
      newUserList.map(users => {
        API.deleteScore(users._id)
        .then(res => this.loadScores())
        .catch(err => console.log(err));
      })
      // Create the new list
      newUserList.map(users => {
        API.saveUser({
          name: users.name,
          highscore: users.highscore
        })
      })
    // If no repeat just save new name
    } else {
      console.log("No previous User")
      API.saveUser({
        name: this.state.name,
        highscore: 0
      })
      .then(res => this.loadScores())
      .catch(err => console.log(err));
    }
    //Show User has been picked
    this.setState({
      userState: true
    });
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
            <StartBtn
              disabled={!(this.state.userState)}
              onClick={this.runTheGame}
            >
              Start
            </StartBtn>
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
                  <Link to={""}>
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
        <Col size="md-6 sm-12">
          <Link to={""}>
            <img style={{width: "300px"}} src={Thumb} alt=""></img>
          </Link>
        </Col>
      </Row>
    </Container>
    )
  }

};

export default LogIn;