// import {useParams} from "react-router";
import React, {Component} from 'react';
import * as Request from "../../Helpers/Request";
import Achievements from "../achievements/achievements";
import Rating from "../rating/rating";
import sovService from "../../services/sovService";

export default class Subscriber extends Component {

	constructor(props) {
		super(props);
		this.state = {
			paramsId: this.props.match.params.id,
			id: '',
			full_name: '',
			premision: '',
			value: '',
			faculty_id: '',
			cafedra_id: '',
			rating_list: '',
			type_of_page: '1',
			userItems: '',
			item_list: [],
			selected_item_list_1: [],
			selected_item_list_2: [],
			selected_item_list_3: [],
			selected_item_list_4: []

		}
	}


	sovService = new sovService();

	getUser() {
		this.sovService.getUser(this.props.match.params.id)
			.then((user) => {
				if (user !== undefined && user['error'] === '0') {
					this.setState({
						'id': user['data']['id'],
						'full_name': user['data']['full_name'],
						'premision': user['data']['premision'],
						'value': user['data']['value'],
						'faculty_id': user['data']['faculty_id'],
						'cafedra_id': user['data']['cafedra_id'],
						'userItems': user['data']['items'],
					});
				}
			});
	}
	getItemList() {
		this.sovService.getItemList()
			.then((result) => {
					if (result !== undefined && result['error'] === '0') {
						this.setState({
							item_list: result['data'],
						});
					}
				}
			) ;
	}


	countSubscriber = (id) => {
		this.sovService.countSubscriber(id)
			.then((result) => {
				if (result !== undefined && result['error'] === '0') {
					this.setState(
						{
							value: result['data']['value']
						}
					);
				}
			});
	}
	getSelectedItemList() {
		this.sovService.getItemList()
			.then((result) => {
				let getListByCategory = (category) =>{
					return result['data']
						.filter((item) => item.type_of_category === category)
						.map(item => {
							return {
								value: item.id,
								label: item.item_name
							}
						});
				}
					if (result !== undefined && result['error'] === '0') {
						this.setState({
							selected_item_list_1 : getListByCategory('1'),
							selected_item_list_2: getListByCategory('2'),
							selected_item_list_3: getListByCategory('3'),
							selected_item_list_4: getListByCategory('4'),
						});
					}
				}
			) ;



	}
	componentDidMount() {
		this.getUser();
		this.getItemList();
		this.getSelectedItemList();
		this.countSubscriber(this.props.match.params.id)
	}

	getAchievementList() {
		this.setState({type_of_page: '1'});
	}
	getRating() {
		this.setState({type_of_page: '2'});
	}

	render() {
		const {paramsId, id, item_list, full_name, faculty_id, cafedra_id,
			selected_item_list_1,selected_item_list_2,selected_item_list_3,selected_item_list_4 } = this.state;
		return([
			<div key={'pages'}>
				<div key={'achievements'} onClick={() => this.getAchievementList()}><p>Досягнення</p></div>
				<div key={'institute'} onClick={() => this.getRating()}><p>Рейтинг</p></div>
			</div>,
			this.state.type_of_page === '1' && this.state.type_of_page !== null ?
				<Achievements
					user_id={id}
					paramsId = {paramsId}
					countSubscriber={this.countSubscriber}
					item_list = {item_list}
					selected_item_list_1 = {selected_item_list_1}
					selected_item_list_2 = {selected_item_list_2}
					selected_item_list_3 = {selected_item_list_3}
					selected_item_list_4 = {selected_item_list_4}
				/> : '',

			this.state.type_of_page === '2' && this.state.type_of_page !== null ?
				<Rating
					user_id = {id}
					full_name = {full_name}
					faculty_id = {faculty_id}
					cafedra_id  = {cafedra_id}
					countSubscriber={this.countSubscriber}
				/> : '',

		]);


	}

	/*	render() {
			return ([
					<div key={'pages'}>
						<div key={'achievements'} onClick={() => this.getAchievementList()}><p>Досягнення</p></div>
						<div key={'institute'} onClick={() => this.getRatingUniversityList()}><p>Рейтинг Інституту</p></div>
						<div key={'cafedra'} onClick={() => this.getRatingCafedraList()}><p>Рейтинг Кафедри</p></div>
						<div key={'faculty'} onClick={() => this.getRatingFacultyList()}><p>Рейтинг Факультету</p>
						</div>
					</div>,
					this.state.type_of_page == '1' && this.state.type_of_page !== null ?
						[	<achievements
								user_id={this.state.id}
								countSubscriber={this.countSubscriber}
								paramsId = {this.state.paramsId}
							/>
						] : '',

						this.state.type_of_page == '2' && this.state.type_of_page !== null ?
							[
								<table key={'table'}>
									<tr>
										<th key={'subscriber_name'}>Науково-педагогічний працівник</th>
										<th key={'subscriber_mark'}>Оцінка</th>
									</tr>
								{this.state.rating_list.map((subscriber) =>
									<tr>
										<td value={subscriber.id}
											key={'subscriber_name_' + subscriber.id}>{subscriber.full_name}</td>
										<td value={subscriber.id}
											key={'subscriber_coefficient_' + subscriber.id}>{subscriber.value}</td>
									</tr>
								)}
							</table>
								] : ''
				]
			)
		}*/

}

/*	<ul>
				<li>paramsId: {paramsId}</li>
				<li>id: {id}</li>
				<li>full_name: {full_name}</li>
				<li>premision: {premision}</li>
				<li>value: {value}</li>
				<li>faculty_id: {faculty_id}</li>
				<li>cafedra_id: {cafedra_id}</li>
				<li>rating_list: {rating_list}</li>
				<li>items: {items}</li>
			</ul>*/