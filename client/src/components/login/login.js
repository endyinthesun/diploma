import React, {Component} from 'react'
// import * as Request from "../../Helpers/Request";
import sovService from "../../services/sovService";
import {ReactComponent as Logo} from '../../logo.svg'
import './Login.scss'
export default class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            'login':'',
            'password': ''
        }
    }
    sovService = new sovService();
    handleChange = (data)=> {
        const {name, value} = data.target
        this.setState({
                [name]: value
            }
        )
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.signIn()
    }

    signIn() {
        this.sovService.signIn(this.state.login, this.state.password)
                .then((result) => {
            let state = {};
            if (result !== undefined && result['error'] === '0') {
                this.props.history.push('/subscriber/' + result['data']['id']);

                state['full_name'] = result['data']['full_name'];
                state['items'] = result['data']['items'];
                state['value'] = result['data']['value'];
                state['premision'] = result['data']['premision'];
                state['cafedra_id'] = result['data']['cafedra_id'];
                state['faculty_id'] = result['data']['faculty_id'];
            }
            this.setState(state);

        });
    }

    render() {
        return (
            [<div className= 'Auth-Header'>
                <Logo className="Auth-Icon" />
                <h1>Система <br/> оцінювання <br/> викладачів</h1>
            </div>,
<div className="Auth-Form">
                <form onSubmit={this.handleSubmit} >
                <input className="Auth-input" name='login' placeholder="Логін" onChange={data => this.handleChange(data)}/><br/>
                <input className="Auth-input" name='password' placeholder="Пароль" onChange={data => this.handleChange(data)}/><br/>
                <input type="submit" value="Увійти" className = 'Auth-input btn-primary'/>
             </form>
</div>
            ]
        )
    }

}
