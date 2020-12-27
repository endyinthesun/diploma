import React, {Component} from 'react';
import sovService from "../../services/sovService";
import Select from 'react-select';

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rank_option: [
                {value: '2', label: 'Професор'},
                {value: '3', label: 'Доцент'},
                {value: '4', label: 'Старший викладач'},
                {value: '5', label: 'Викладач'},
                {value: '6', label: 'Асистент'},
            ],
        }
    }

    sovService = new sovService();

    signUp() {
        console.log(this.state.signIn)
        let data = new FormData();

        data.append('login', this.state.login);
        data.append('password', this.state.password);
        data.append('full_name', this.state.full_name);
        data.append('permission', '2');
        data.append('faculty_id', this.props.faculty_id);
        data.append('cafedra_id', this.props.cafedra_id);
        data.append('rank', this.state.rang_data);

        this.sovService.signUp(data)
            .then((result) => {
                console.log(result)
                if (result !== undefined && result['error'] === '0') {
                    this.setState({
                            login: '',
                            password: ''
                        }
                    )
                    alert('Користувач був доданий')
                    // this.getItemListBySubscriber()
                    // this.setState({item_list: result['data']});
                }
            });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.signUp()
    }
    handleChange = (data) => {
        const {name, value} = data.target
        this.setState({
                [name]: value
            }
        )
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input name='login' placeholder="Логін" onChange={data => this.handleChange(data)}/><br/>
                    <input name='password' placeholder="Пароль" onChange={data => this.handleChange(data)}/><br/>
                    <input name='full_name' placeholder="ПІБ" onChange={data => this.handleChange(data)}/><br/>
                    <Select name='rank' options={this.state.rank_option}
                            onChange={(data) => this.setState({rang_data: data.value})}/>
                    <input type="submit" value="Надіслати"/>
                </form>
            </div>
        )
    }

}