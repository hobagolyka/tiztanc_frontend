import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom"

import './App.css';

import Login from './pages/App';
import Main from './pages/MainPage';

class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/' exact component={Login}/>
                    <Route path='/newEvent' exact component={Main} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
