import React from "react";
import { Switch, Route } from "react-router-dom";
// import { AuthRoute } from "../config";
import { CardsMovie, Login, Register, DetailsMovie } from "../pages";

export default function Routes() {
  return (
    <div className="content">
      <Switch>
        <Route exact path="/" component={CardsMovie} />
        <Route exact path="/movies" component={CardsMovie} />
        <Route path={"/movies/:id"} component={DetailsMovie} />
        {/* <Route path=":redirectParam" component={DetailsMovie} /> */}
        {/* <Route path="/about" component={About} /> */}
        {/* <AuthRoute path="/movies-list" component={EditMovies} /> */}
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </div>
  );
}
