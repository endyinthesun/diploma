import React, {Component} from 'react'
import * as Request from "../../Helpers/Request";

export default class Registration extends Component {

    constructor(props) {
        super(props)
        this.state = {
            'item_name':'',
            'item_value': '',
            'coefficient': '',
            'type_of_category': '',
            'success_item': ''

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

        let data = new FormData();

        data.append('item_name',this.state.item_name);
        data.append('item_value', this.state.item_value);
        data.append('coefficient', this.state.coefficient);
        data.append('type_of_category', this.state.type_of_category);
        Request.sendPostQuery(`http://diploma/api/Items.php?controller=addItem`,data).then((result) => {
            console.log(result);
            let state = {};

            if (result !== undefined && result['error'] === '0') {
                this.state.success_item = true;
            }
            else {
                this.state.success_item = false;
            }

        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input name='item_name' placeholder="Назва діяльності" onChange={data => this.handleChange(data)}/><br/>
                <input name='item_value' placeholder="Оцінка за виконану діяльність" onChange={data => this.handleChange(data)}/><br/>
                <input name='coefficient' placeholder="Коефіцієнт" onChange={data => this.handleChange(data)}/><br/>
                <input name='type_of_category' placeholder="Тип категорії" onChange={data => this.handleChange(data)}/><br/>
                <input type="submit" value="Надіслати" />
            </form>
        )
    }

}