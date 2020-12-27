import React, {Component} from 'react';
import * as Request from "../../Helpers/Request";
import sovService from "../../services/sovService";
import AchievementsForm from "../achievements-form/achievements-form";
import AchievementsTable from "../achievements-table/achievements-table";
import './achivments.scss'


export default class Achievements extends Component{
	constructor(props) {
		super(props);
		this.state = {
			subscriber_item_list_1: [],
			subscriber_item_list_2: [],
			subscriber_item_list_3: [],
			subscriber_item_list_4: [],
		}
	}

	sovService = new sovService();


	getItemListBySubscriber = () =>  {
		this.sovService.getItemListBySubscriber(this.props.paramsId)
			.then((result) => {
				let getItemTableByCategory = (category, item_list) => {
					return item_list
						.filter((item) => item.type_of_category === category);
				}

				let state = {};
				if (result['error'] === '0' && result['data'] !== null) {
					state['subscriber_item_list_1'] = getItemTableByCategory('1', result['data']);
					state['subscriber_item_list_2'] = getItemTableByCategory('2', result['data']);
					state['subscriber_item_list_3'] = getItemTableByCategory('3', result['data']);
					state['subscriber_item_list_4'] = getItemTableByCategory('4', result['data']);

				}
				this.setState(state);

			})
	}

	// not working
	addItemForSubscriber = (item_id) => {
		console.log(this.props.item_list)
		let data = new FormData();
		this.props.item_list.forEach((item) => {
			if (item.id === item_id) {
				data.append('item', JSON.stringify(item));
				data.append('id', this.props.user_id);
			}
		});
		this.sovService.addItemForSubscriber(data)
			.then((result) => {
				if (result !== undefined && result['error'] === '0') {
					this.getItemListBySubscriber();
					this.props.countSubscriber(this.props.paramsId);
				}
			});
	}

	// not working
	dropItemsFromSubscriber = (item_id) => {
		let data = new FormData();
		this.props.item_list.forEach((item) => {
			if (item.id === item_id) {
				data.append('item', JSON.stringify(item));
				data.append('id', this.props.user_id);
			}
		});

		this.sovService.dropItemsFromSubscriber(data)
			.then((result) => {
				if (result !== undefined && result['error'] === '0') {
					this.getItemListBySubscriber();
					this.props.countSubscriber(this.props.paramsId);
				}
			});
	}


	componentDidMount() {
		this.getItemListBySubscriber();
	}

	render() {
		const {subscriber_item_list_1,subscriber_item_list_2,
			subscriber_item_list_3,subscriber_item_list_4 } = this.state;
		const {selected_item_list_1,selected_item_list_2,
			selected_item_list_3, selected_item_list_4 } = this.props;


		return(
			<div className="wrapper">
				<div className="wrapper-l">

				<h4>Науково-дослідна та інноваційна діяльність</h4>
				<AchievementsForm
					selected_item_list = {selected_item_list_1}
					addItemForSubscriber = {this.addItemForSubscriber}
				/>
				<AchievementsTable
					subscriber_item_list = {subscriber_item_list_1}
					dropItemsFromSubscriber = {this.dropItemsFromSubscriber}
				/>

				<h4>Навчально-методична діяльність</h4>
				<AchievementsForm
					selected_item_list = {selected_item_list_2}
					addItemForSubscriber = {this.addItemForSubscriber}
				/>
				<AchievementsTable
					subscriber_item_list = {subscriber_item_list_2}
					dropItemsFromSubscriber = {this.dropItemsFromSubscriber}
				/>

				<h4>Професійний розвиток</h4>
				<AchievementsForm
					selected_item_list = {selected_item_list_3}
					addItemForSubscriber = {this.addItemForSubscriber}
				/>
				<AchievementsTable
					subscriber_item_list = {subscriber_item_list_3}
					dropItemsFromSubscriber = {this.dropItemsFromSubscriber}
				/>

				<h4>Організаційна та виховна робота, волонтерство</h4>
				<AchievementsForm
					selected_item_list = {selected_item_list_4}
					addItemForSubscriber = {this.addItemForSubscriber}
				/>
				<AchievementsTable
					subscriber_item_list = {subscriber_item_list_4}
					dropItemsFromSubscriber = {this.dropItemsFromSubscriber}
				/>
				</div>
			</div>
		)
	}

}