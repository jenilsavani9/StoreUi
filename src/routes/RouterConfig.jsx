import React, { Fragment } from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from '../components/layout/Navbar';
import EmailValidation from '../pages/EmailValidation';
import Login from '../pages/Login';
import Services from '../pages/Services';
import Store from '../pages/Store';
import Users from '../pages/Users';
import PageNotFound from '../pages/PageNotFound';

function RouterConfig() {
  return (
    <div>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/verify" element={<EmailValidation />} />
        <Route exact path="/" element={
          <Fragment>
            <Navbar />
            <Store />
          </Fragment>
        } />
        <Route exact path="/features" element={
          <Fragment>
            <Navbar />
            <Services />
          </Fragment>
        } />
        <Route exact path="/Users" element={
          <Fragment>
            <Navbar />
            <Users />
          </Fragment>
        } />
        <Route path="/404" element={<PageNotFound />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </div>
  )
}

export default RouterConfig