import React, {Component} from 'react'
// import * as Request from "../../Helpers/Request";
import sovService from "../../services/sovService";

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
        console.log(`--- login`, this.state.login);
        console.log(`--- password`, this.state.password);
        this.sovService.signIn(this.state.login, this.state.password)
                .then((result) => {
            let state = {};
            if (result !== undefined && result['error'] === '0') {
                console.log(result)
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
            <form onSubmit={this.handleSubmit}>
                <input name='login' placeholder="Логін" onChange={data => this.handleChange(data)}/><br/>
                <input name='password' placeholder="Пароль" onChange={data => this.handleChange(data)}/><br/>
                <input type="submit" value="Надіслати" />
            </form>
        )
    }

}
