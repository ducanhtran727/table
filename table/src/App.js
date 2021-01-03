import React from "react";
import {Edit} from './Edit';
import "./App.css";
import { Table } from "./Table";
import { Route, Link } from "react-router-dom";
import {FormPost} from './FormPost'

function App() {
  return (
    <div className="App">
      <Link to="/Table">Table</Link>
      <hr/>
      <Link to="/form" >Post</Link>
      <hr />
      <Route
        path="/Table"
        render={() => <Table></Table>}
      />
      <Route path="/edit/:id" component={Edit} />
      <Route path="/form" component={FormPost} />
    </div>
  );
}

export default App;
