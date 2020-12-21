import logo from '../../logo.svg';
import './App.css';
import React, {Component} from "react"
import * as Request from '../../Helpers/Request';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Subscriber from "../subscriber/subscriber";
import Registration from "../Registration/Registration";
import AddItem from "../Items/AddItem";

class App extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
    }

    render() {
        return (
            <main>
                <Router>
                    <Switch>
                        <Route path="/subscriber/:id" component={Subscriber}/>
                        <Route path="/registration/" component={Registration}/>
                        <Route path="/item/" component={AddItem}/>
                    </Switch>
                </Router>
            </main>

        )
    }
}

export default App;
