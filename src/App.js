import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom"

import './App.css';

import Login from './pages/App';
import Main from './pages/MainPage';
import Vote from './pages/VotePage';
import Event from './pages/Event';
import EventsPage from './pages/EventsPage';

class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/' exact component={Login}/>
                    <Route path='/newEvent' exact component={Main} />
                    <Route path='/votePage/:token' exact component={Vote} />
                    <Route path='/getEvent' exact component={Event} />
                    <Route path='/getEvents' exact component={EventsPage} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
