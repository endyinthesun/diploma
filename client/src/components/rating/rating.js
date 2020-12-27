import React, { Component} from 'react';
import sovService from "../../services/sovService";
import RatingTable from "../../components/rating-table/rating-table"
import './Rating.scss'

export default class Rating extends Component {
	constructor(props) {
		super(props);
		this.state = {
			headsOfDepartment_rating_list: [],
			professors_rating_list: [],
			docents_rating_list: [],
			seniorTeachers_rating_list: [],
			teachers_rating_list: [],
			assistants_rating_list: [],
		}
	}

	sovService = new sovService();

	getRatingByHeadsOfDepartment() {
		// this.props.countSubscriber();
		this.sovService.getRatingBy(1)
			.then((result) => {
				if (result['data'] !== null && result['error'] === '0') {
					this.setState(
						{
							headsOfDepartment_rating_list: result['data'],
						}
					);
				}
			});
	}

	getRatingByProfessors() {
	// this.props.countSubscriber();
	this.sovService.getRatingBy(2)
		.then((result) => {
			if (result['data'] !== null && result['error'] === '0') {
				this.setState(
					{
						professors_rating_list: result['data'],
					}
				);
			}
		});
}

	getRatingByDocents() {
	// this.props.countSubscriber();
	this.sovService.getRatingBy(3)
		.then((result) => {
			if (result['data'] !== null && result['error'] === '0') {
				this.setState(
					{
						docents_rating_list: result['data'],
					}
				);
			}
		});
}

	getRatingBySeniorTeachers() {
	// this.props.countSubscriber();
	this.sovService.getRatingBy(4)
		.then((result) => {
			if (result['data'] !== null && result['error'] === '0') {
				this.setState(
					{
						seniorTeachers_rating_list: result['data'],
					}
				);
			}
		});
}

	getRatingByTeachers() {
	// this.props.countSubscriber();
	this.sovService.getRatingBy(5)
		.then((result) => {
			if (result['data'] !== null && result['error'] === '0') {
				this.setState(
					{
						teachers_rating_list: result['data'],
					}
				);
			}
		});
}

	getRatingByAssistants() {
	// this.props.countSubscriber();
	this.sovService.getRatingBy(6)
		.then((result) => {
			if (result['data'] !== null && result['error'] === '0') {
				this.setState(
					{
						assistants_rating_list: result['data'],
					}
				);
			}
		});
}

	componentDidMount() {
		this.getRatingByHeadsOfDepartment();
		this.getRatingByProfessors();
		this.getRatingByDocents();
		this.getRatingBySeniorTeachers();
		this.getRatingByTeachers();
		this.getRatingByAssistants();
	}

	render() {
		const {		headsOfDepartment_rating_list, professors_rating_list, docents_rating_list,
			seniorTeachers_rating_list, teachers_rating_list, assistants_rating_list} = this.state;
		return(
			<div className="wrapper">
				<div className="wrapper-l">

				<details>
					<summary><h5 className="lol">Завідуючі кафедри</h5></summary>
					<RatingTable
						rating_list = {headsOfDepartment_rating_list}
					/>
				</details>

				<details>
					<summary><h5 className="lol">Професори</h5></summary>
					<RatingTable
						rating_list = {professors_rating_list}
					/>
				</details>

				<details>
					<summary><h5 className="lol">Доценти</h5></summary>
					<RatingTable
						rating_list = {docents_rating_list}
					/>
				</details>

				<details>
					<summary><h5 className="lol">Старші викладачі</h5></summary>
					<RatingTable
						rating_list = {seniorTeachers_rating_list}
					/>
				</details>

				<details>
					<summary><h5 className="lol">Викладачі</h5></summary>
					<RatingTable
						rating_list = {teachers_rating_list}
					/>
				</details>

				<details>
					<summary><h5 className="lol">Асистенти</h5></summary>
					<RatingTable
						rating_list = {assistants_rating_list}
					/>
				</details>

			</div>
			</div>
		);
	}
}