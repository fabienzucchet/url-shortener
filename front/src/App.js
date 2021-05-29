import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";

import Navbar from './components/base/Navbar';

import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="main-page">
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/url/list">
            <UrlList />
          </Route>
          <Route path="/url/create">
            <UrlCreate />
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
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function Dashboard(props) {
  return <h2>Dashboard</h2>;
}

function UrlList() {
  return <h2>UrlList</h2>;
}

function UrlCreate() {
  return <h2>UrlCreate</h2>;
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
