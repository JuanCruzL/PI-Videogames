import "./App.css";
import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Components/Home";
import LandingPage from "./Components/LandingPage";
import Details from "./Components/Details";
import Form from "./Components/Form";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/videogames/:id" component={Details} />
          <Route exact path="/form" component={Form} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
