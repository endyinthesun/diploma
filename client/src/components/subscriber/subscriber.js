// import {useParams} from "react-router";
import React, {Component} from 'react';
import * as Request from "../../Helpers/Request";

import Achievements from "../achievements/achievements";
import Rating from "../rating/rating";
import SignUp from "../signup/signup";

import sovService from "../../services/sovService";
import Header from "../header/header"
import { ReactComponent as Logo } from '../../logo.svg'

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

	getAchievementList = () => {
		this.setState({type_of_page: '1'});
	}
	getRating = () => {
		this.setState({type_of_page: '2'});
	}

	getSignUp = () => {
		this.setState({type_of_page: '3'});
	}

	render() {
		const {paramsId, id, item_list, full_name, faculty_id, cafedra_id, premision,
			selected_item_list_1,selected_item_list_2,selected_item_list_3,selected_item_list_4 } = this.state;
		return([
			// <div key={'pages'}>
			// 	<div key={'achievements'} onClick={() => this.getAchievementList()}><p>Досягнення</p></div>
			// 	<div key={'rating'} onClick={() => this.getRating()}><p>Рейтинг</p></div>
			// </div>,
			<Header
				userName= {full_name}
				className='Home-Header'
				renderIcon={() => (
					<Logo className='Header-Icon'/>
				)}
				rating = {this.getRating}
				achievements = {this.getAchievementList}
				premision = {premision}
				signup = {this.getSignUp}
			/>,
			this.state.type_of_page === '1' && (premision === '1' || premision === '2') && this.state.type_of_page !== null ?
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


			this.state.type_of_page === '3' && premision === '1' && this.state.type_of_page !== null ?
				<SignUp
					faculty_id = {faculty_id}
					cafedra_id  = {cafedra_id}
				/> : ''

		]);


	}

}

