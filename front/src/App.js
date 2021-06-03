import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";
import axios from "axios";

import Navbar from './components/base/Navbar';
import HomePage from './components/home/HomePage';
import DashboardPage from './components/dashboard/DashboardPage';
import UrlCreatePage from './components/url/create/UrlCreatePage';
import ShortUrlNotFound from './components/url/unshorten/ShortUrlNotFound';

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
            <UnshortenRedirect />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function UnshortenRedirect() {
  const { shortUrl } = useParams();

  axios.get(`http://localhost:8000/?short_url=http://localhost:3000/${shortUrl}`)
    .then(res => {
      if (res.status === 200) {
        window.location.href= res.data.original_url;
        return null;
      }
    });

  return <ShortUrlNotFound shortUrl={shortUrl}/>
  // console.log(shortUrl);
  // window.location.href=`http://localhost:8000/?short_url=http://localhost:3000/${shortUrl}`;
  // return null;

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
