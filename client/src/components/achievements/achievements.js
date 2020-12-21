import React, {Component} from 'react';
import * as Request from "../../Helpers/Request";
import sovService from "../../services/sovService";
import AchievementsForm from "../achievements-form/achievements-form";
import AchievementsTable from "../achievements-table/achievements-table";



export default class Achievements extends Component{
	constructor(props) {
		super(props);
		this.state = {
			selected_item_list_1: [],
			selected_item_list_2: [],
			selected_item_list_3: [],
			selected_item_list_4: [],
			subscriber_item_list_1: [],
			subscriber_item_list_2: [],
			subscriber_item_list_3: [],
			subscriber_item_list_4: [],
		}
	}

	sovService = new sovService();


	getSelectedItemList() {
		let getListByCategory = (category) =>{
			return this.props.item_list
				.filter((item) => item.type_of_category === category)
				.map(item => {
					return {
							value: item.id,
							label: item.item_name
						}
				});
		}


		// let array_item_1 = getListByCategory('1'),
		// 	array_item_2 = getListByCategory('2'),
		// 	array_item_3 = getListByCategory('3'),
		// 	array_item_4 = getListByCategory('4');

		this.setState({
			selected_item_list_1 : getListByCategory('1'),
			selected_item_list_2: getListByCategory('2'),
			selected_item_list_3: getListByCategory('3'),
			selected_item_list_4: getListByCategory('4'),
		});
	}

	getItemListBySubscriber ()  {

		let getItemTableByCategory = (category, item_list) => {
			return item_list
				.filter((item) => item.type_of_category === category);
		}

		this.sovService.getItemListBySubscriber(this.props.paramsId)
			.then((result) => {
				if (result['error'] === '0') {
					let array_item_1 = getItemTableByCategory('1', result['data']),
						array_item_2 = getItemTableByCategory('2', result['data']),
						array_item_3 = getItemTableByCategory('3', result['data']),
						array_item_4 = getItemTableByCategory('4', result['data']);

					this.setState({subscriber_item_list_1: array_item_1});
					this.setState({subscriber_item_list_2: array_item_2});
					this.setState({subscriber_item_list_3: array_item_3});
					this.setState({subscriber_item_list_4: array_item_4});
				}
			}
			)


	}

	// not working
	addItemForSubscriber = (item_id) => {
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
		// console.log(`--- selected_item_list`, this.state.selected_item_list);
		this.props.item_list.map((item) => {
			if (item.id === item_id) {
				data.append('item', JSON.stringify(item));
			}
			data.append('id', this.props.user_id);
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
		this.getSelectedItemList();
		this.getItemListBySubscriber();
		this.props.countSubscriber(this.props.paramsId);
	}

	render() {
		const {selected_item_list_1,selected_item_list_2,
			selected_item_list_3, selected_item_list_4,
			subscriber_item_list_1,subscriber_item_list_2,
			subscriber_item_list_3,subscriber_item_list_4, } = this.state;

		//при оновлені губиться selected_item_list
		console.log(`--- selected_item_list_1`,selected_item_list_1);
		console.log(`--- selected_item_list_2`,selected_item_list_2);
		console.log(`--- selected_item_list_3`,selected_item_list_3);
		console.log(`--- selected_item_list_4`,selected_item_list_4);

		return(
			<div>
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
		)
	}



}