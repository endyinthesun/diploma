import logo from '../../logo.svg';
import './App.css';
import React, {Component} from "react"
import * as Request from '../../Helpers/Request';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Subscriber from "../subscriber/subscriber";
import Login from "../login/login";
import AddItem from "../Items/AddItem";

export default class App extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <main>
                <Router>
                    <Switch>
                        <Route path="/subscriber/:id" component={Subscriber}/>
                        <Route path="/login/" component={Login}/>
                        <Route path="/item/" component={AddItem}/>
                    </Switch>
                </Router>
            </main>

        )
    }
}
