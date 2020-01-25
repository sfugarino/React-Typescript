import React from "react";
import List from "./components/List";
import About from "./components/About";
import Details from "./components/Details";
import Header from "./components/common/Header";
import NotFoundPage from "./components/NotFoundPage";
import "./App.css";
import { Route, Switch } from "react-router-dom";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <div className="container-fluid">
        <Switch>
          <Route path="/" exact component={List} />
          <Route path="/details/:id" component={Details} />
          <Route path="/about" component={About} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </>
  );
};

export default App;
