import React, { Fragment } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import Login from '../pages/Login';
import EmailValidation from '../pages/EmailValidation';
import Store from '../pages/Store';
import Services from '../pages/Services';
import Users from '../pages/Users';
import PageNotFound from './PageNotFound';
import Navbar from '../components/layout/Navbar';

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