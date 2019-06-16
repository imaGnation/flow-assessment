import React from 'react';
import { Route } from 'react-router-dom';
import Home from './components/Home';
import './App.scss';
import Layout from './components/Layout';

export default () => (
  <Layout>
    <Route exact path='/' component={Home} />
  </Layout>
);