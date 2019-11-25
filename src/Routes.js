import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom"

/**
 * Import all page components here
 */
import App from './pages/App';
import MainPage from './pages/MainPage';

/**
 * All routes go here.
 * Don't forget to import the components above after adding new route.
 */
export default (
    <Route path="/" component={App}>
        <Route path="/newEvent" component={MainPage} />
    </Route>
);