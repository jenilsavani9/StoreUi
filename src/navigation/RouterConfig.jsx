import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import Login from '../pages/login/Login';
import EmailValidation from '../pages/verify/EmailValidation';
import Store from '../pages/store/Store';
import Services from '../pages/service/Services';
import Users from '../pages/user/Users';
import PageNotFound from './PageNotFound';

function RouterConfig() {
    return (
        <div>
            <Routes>
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/verify" element={<EmailValidation />} />
                <Route exact path="/" element={<Store />} />
                <Route exact path="/services" element={<Services />} />
                <Route exact path="/Users" element={<Users />} />
                <Route path="/404" element={<PageNotFound />} />
                <Route path="*" element={<Navigate to="/404" />} />
            </Routes>
        </div>
    )
}

export default RouterConfig