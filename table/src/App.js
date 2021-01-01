import React from "react";
import {Edit} from './Edit';
import "./App.css";
import { Table } from "./Table";
import { Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Link to="/Table">Table</Link>
      <Route
        path="/Table"
        render={() => <Table></Table>}
      />
      <Route path="/edit/:id" component={Edit} />
    </div>
  );
}

export default App;
