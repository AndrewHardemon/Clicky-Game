import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LogIn from "./pages/LogIn";
import Game from "./pages/Game";
import GameOver from "./pages/GameOver";
// import Score from "./pages/Score";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import Images from "./components/Images";

class App extends React.Component{
  state = {
    mountGame: false
  }

  setTheState = () => {
    this.setState(prevState =>
      ({mountGame: !prevState.mountGame})  
    )
  }

  render(){
    const {mountGame} = this.state;
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            <Route exact path="/" component={LogIn} />
            <Route exact path="/game" component={Game} />
            <Route exact path="/gameover" component={GameOver} />
            <Route component={NoMatch} />
          </Switch>
          {/* <button onClick={this.setTheState}>{mountGame ? "Unm" : "M"}ount Game</button>
          {mountGame && <Images />} */}
        </div>
      </Router>
    );
  }

}

export default App;