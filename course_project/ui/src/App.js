import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Profile } from "./pages/Profile";
import { Layout } from "./components/Layout";
import { Flights } from "./pages/Flights";
import { Flight } from "./pages/Flight";
import { Airports } from "./pages/Airports";
import { Users } from "./pages/Users";
import { Statistics } from "./pages/Statistics";

import "./App.scss";

const App = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path={["/", "/profile"]} component={Profile} />
          <Route exact path={"/flights"} component={Flights} />
          <Route exact path={"/flights/:flightUid"} component={Flight} />
          <Route exact path={"/airports"} component={Airports} />
          <Route exact path={"/users"} component={Users} />
          <Route exact path={"/statistics"} component={Statistics} />
        </Switch>
      </Layout>
    </Router>
  );
};

export default App;
