import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LogIn from "./pages/LogIn";
import Game from "./pages/Game";
import GameOver from "./pages/GameOver";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

class App extends React.Component{

  render(){
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            <Route exact path="/" component={LogIn} />\
            <Route exact path="/game" component={Game} />
            <Route exact path="/gameover" component={GameOver} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }

}

export default App;