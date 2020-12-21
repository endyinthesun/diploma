import React, {Component} from 'react'
import * as Request from "../../Helpers/Request";

class Registration extends Component {

    constructor(props) {
        super(props)
        this.state = {
            'login':'',
            'password': ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(data) {
        const {name, value} = data.target
        this.setState({
                [name]: value
            }
        )
    }

    handleSubmit(event) {
        // alert('Ім\'я, що було надіслано: ' + this.state.login);
        this.signIn()

        event.preventDefault();
    }

    signIn() {

        Request.sendGetQuery(`http://diploma/api/Teachers.php?controller=sign&login=${this.state.login}&password=${this.state.password}`).then((result) => {
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
                <input name='login' placeholder="First Name" onChange={data => this.handleChange(data)}/><br/>
                <input name='password' placeholder="Last Name" onChange={data => this.handleChange(data)}/><br/>
                <input type="submit" value="Надіслати" />
            </form>
        )
    }

}

export default Registration;