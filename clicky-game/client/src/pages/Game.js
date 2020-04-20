import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import Images from "../components/Images";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
//image imports
import Occultism from "../components/Images/pictures/Occultism.png"
import Face from "../components/Images/pictures/Face.png"
import Sulfur from "../components/Images/pictures/Sulfur.png"
import Dog from "../components/Images/pictures/Dog.png"
import Thumb from "../components/Images/pictures/Thumb.png"

class Game extends Component{

  state = {
    mountGame: false,
    whichState: true,
    images: [
      {name: Occultism, data: 0}, 
      {name: Face, data: 1},
      {name: Sulfur, data: 2},
      {name: Dog, data: 3},
      {name: Thumb, data: 4}
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
      let num = Math.floor(Math.random() * this.state.images.length);//this.state.images.length
      console.log(num);
      // this.setState({
      //   num: num,
      //   img: this.state.images[num].data
      // })
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
    API.getScores()
      .then(res =>
        {this.setState({ users: res.data, name: res.data[res.data.length-1].name, id: res.data[res.data.length-1]._id})
        console.log(this.state.score)
        console.log(this.state.name)
        console.log(this.state.users)
        }
      )
      .catch(err => console.log(err))
  }

  shuffleArray = (array) => {
    for(let i = array.length-1; i > 0; i--){
      const j = Math.floor(Math.random() * (i+1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  //Randomize the Images
  checkImg = (e, data) => {
    console.log(data)
    console.log(this)
    if(this.state.theImage.img == data){
      console.log("Got it right!")
      //Update the Score
      var newScore = (this.state.score + 10)
      console.log(newScore)
      this.setState({ 
        score: newScore
      })
      //Add new score to Mongo
      API.updateScore(this.state.id,
        { highscore: newScore })
        .then(res => console.log(res))
        .catch(err => console.log(err))
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
              {this.shuffleArray(images)}
              {images.map(image => (
              <img src={image.name} onClick={((e) => this.checkImg(e, image.data))}></img>
              ))}
            </Images> }
          </Col>
        </Row>
      </Container>
    )
  }
}





export default Game;
