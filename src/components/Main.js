
import '../App.css';

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import NavigationBar from './NavigationBar';
import HipsPage from '../pages/HipsPage';
import WelcomePage from '../pages/WelcomePage';
import FetchData from '../services/FetchData';

export default function Main() {

    FetchData()

    return (
        <Router basename="">
            <div>
                <NavigationBar/>

                <Switch>
                    <Route exact path="/">
                        <WelcomePage />
                    </Route>
                    <Route exact path="/hips">
                        <HipsPage />
                    </Route>
                </Switch>
            </div>
            <footer>
                <small> (C) 2021 - ASTRON - version 1.0.0 - 30 april 2021</small>
            </footer>
        </Router>

    );
}
