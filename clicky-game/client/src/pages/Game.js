import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Jumbotron from "../components/Jumbotron";
import Images from "../components/Images";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
//image imports
import Occultism from "../components/Images/pictures/Occultism.png"
import Face from "../components/Images/pictures/Face.png"
import Sulfur from "../components/Images/pictures/Sulfur.png"

class Game extends Component{

  state = {
    mountGame: false,
    whichState: true,
    images: [
      {name: Occultism, data: 0}, 
      {name: Face, data: 1},
      {name: Sulfur, data: 2}
    ],
    theImage: {
      num: 0,
      img: 0
    },
    name: "",
    id: "",
    score: 0,
    lose: false
  }

  //Start or Stop Game
  setTheState = () => {
    this.setState(prevState =>
      ({mountGame: !prevState.mountGame})  
    )
    
    // Change the state of question or answer
    var that = this;
    if(this.state.whichState){
      // Get random number
      let num = Math.floor(Math.random() * 3);//this.state.images.length
      console.log(num);
      this.state.theImage.num = num;
      this.state.theImage.img = this.state.images[num].data;
      console.log(this.state.theImage)

      //Unmount the Question part
      setTimeout(function(){
        that.state.whichState = false;
        that.setTheState()
      }, 2000)
    } else {
      //Mount the Answer part
      this.setState(prevState =>
        ({mountGame: !prevState.mountGame})  
      )
    }
  }

  //When it mounts
  componentDidMount() {
    API.getScore(this.props.match.params.id)
    .then(({data}) =>
    {
      console.log(data)
      this.setState({
        name: data.name,
        id: data._id
      })}
    ).catch(err => console.log(err))
  }

  //When it loads
  // loadGame = () => {
  //   console.log("mount works");
  //   API.getScore
  // }

  //Randomize the Images
  checkImg = (e, data) => {
    console.log(data)
    if(this.state.theImage.img == data){
      console.log("Got it right!")
      //Add 10 to the score
      this.state.score += 10;
      console.log(this.state.score)
      //Add new score to Mongo
      API.updateScore((this.state.id),
      {highscore: this.state.score},
      {new:true}).catch(err => console.log(err))
      //Change State of the Answer
      this.state.whichState = true;
      this.setTheState()
      this.setState(prevState =>
        ({mountGame: !prevState.mountGame})  
      )
    } else {
      // If Wrong go to GameOver
      console.log("WRONG")
      this.props.history.push('/gameover')
    }
  }

  render() {
    const {mountGame, whichState, images, theImage} = this.state;
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>Memory Game!</h1>
              <h3>{this.state.name}'s Score is: {this.state.score}
                  {this.state.id}
              </h3>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <button onClick={this.setTheState}>St{mountGame ? "op" : "art"} Game</button>
            {/* Shows one image */}
            {mountGame && whichState && <Images>
            <h1>Try to remember</h1>
            <img src={images[theImage.num].name}></img> 
            </Images> }
            {/* Shows Several */}
            {mountGame && !whichState && <Images>
            <h1>Pick the right image</h1>
            <img src={images[0].name} onClick={((e) => this.checkImg(e, images[0].data))}></img>
            <img src={images[1].name} onClick={((e) => this.checkImg(e, images[1].data))}></img> 
            <img src={images[2].name} onClick={((e) => this.checkImg(e, images[2].data))}></img> 
            </Images> }
          </Col>
        </Row>
      </Container>
    )
  }
}





export default Game;
