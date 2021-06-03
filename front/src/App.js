import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";

import Navbar from './components/base/Navbar';
import HomePage from './components/home/HomePage';
import DashboardPage from './components/dashboard/DashboardPage';
import UrlCreatePage from './components/url/create/UrlCreatePage';
import Unshorten from './components/url/unshorten/Unshorten';

import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="main-page">
        <Switch>
          <Route exact path="/dashboard">
            <DashboardPage />
          </Route>
          <Route exact path="/url/list">
            <UrlList />
          </Route>
          <Route exact path="/url/create">
            <UrlCreatePage />
          </Route>
          <Route exact path="/url/edit/:id">
            <UrlEdit />
          </Route>
          <Route exact path="/url/view/:id">
            <UrlView />
          </Route>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/:shortUrl" >
            <Unshorten />
          </Route>
        </Switch>
      </div>
    </Router>
  );
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
