import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";
import './App.css';

function App() {
  return (
    <Router>
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/url/list">
            <UrlList />
          </Route>
          <Route path="/url/edit/:id">
            <UrlEdit />
          </Route>
          <Route path="/url/view/:id">
            <UrlView />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function Dashboard() {
  return <h2>Dashboard</h2>;
}

function UrlList() {
  return <h2>UrlList</h2>;
}

function UrlEdit() {
  const { id } = useParams();

  return <h2>UrlEdit { id }</h2>;
}

function UrlView() {
  const { id } = useParams();

  return <h2>UrlView {id}</h2>;
}

export default App;
