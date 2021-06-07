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
import ListUrlsPage from './components/listing/ListUrlsPage'
import UrlCreatePage from './components/url/create/UrlCreatePage';
import Unshorten from './components/url/unshorten/Unshorten';
import ViewPage from './components/url/view/ViewPage';

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
            <ListUrlsPage />
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


function UrlEdit() {
  const { id } = useParams();

  return <h2>UrlEdit {id}</h2>;
}

function UrlView() {
  const { id } = useParams();

  return <ViewPage id={id} />;
}

export default App;
