import React, {Component} from 'react';
import Select from 'react-select';
import AchievementsTable from "../achievements-table/achievements-table";

export default class AchievementsForm extends Component {

	constructor(props) {
		super(props);
		this.state = {
			selected_item: '',
		}

	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.addItemForSubscriber(this.state.selected_item);
	}


	render() {
		return (
			<div>
				<form key = 'item_form' onSubmit = {this.handleSubmit}>
					<Select key={'item_select'} name={'select_option'} options={this.props.selected_item_list}
					        onChange={(data) => this.setState({selected_item: data.value})}
					        placeholder={"Досягнення"} className={"select-primary"}/>
					<button key={'sbj_button_form'} type="submit" value="Надіслати" className="btn-primary">
						Додати
					</button>
				</form>

			</div>
		);
	}
}
