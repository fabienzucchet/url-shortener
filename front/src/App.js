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

import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="main-page">
        <Switch>
          <Route path="/dashboard">
            <DashboardPage />
          </Route>
          <Route path="/url/list">
            <UrlList />
          </Route>
          <Route path="/url/create">
            <UrlCreatePage />
          </Route>
          <Route path="/url/edit/:id">
            <UrlEdit />
          </Route>
          <Route path="/url/view/:id">
            <UrlView />
          </Route>
          <Route path="/">
            <HomePage />
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
