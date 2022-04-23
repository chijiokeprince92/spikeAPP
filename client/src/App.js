import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import PostDetails from './components/PostDetails/PostDetails';
// import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import CreatorOrTag from './components/CreatorOrTag/CreatorOrTag';
import TestNav from './components/Test/TestNav';
import Form from './components/Form/Form';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <BrowserRouter>
      <div style={{width: '100%'}}>
        <TestNav />
        {/* <Navbar /> */}
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/posts" />} />
          <Route path="/posts" exact component={Home} />
          <Route path="/posts/form" exact component={() => (user ? <Form /> : <Auth/>)} />
          <Route path="/posts/search" exact component={Home} />
          <Route path="/posts/:id" exact component={PostDetails} />
          <Route path={['/creators/:name', '/tags/:name']} component={CreatorOrTag} />
          <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/posts" />)} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;