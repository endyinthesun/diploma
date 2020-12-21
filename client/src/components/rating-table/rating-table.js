import React, {Component} from 'react';
import { isEmpty } from "lodash";
import SearchPanel from "../search-panel/search-panel";

export default class RatingTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			term: ''
		}
	}

	searchPost = (items, term) => {
		if (term.length === 0) return items;

		return items.filter((item) => {
			return item.full_name.includes(term);
		})
	}

	onUpdateSearch = (term) => {
		this.setState({term})
	}

	render() {
		const {rating_list} = this.props;
		const {term} = this.state;
		const visibleRating = this.searchPost(rating_list, term);
		let rowsTable = (!isEmpty(visibleRating)) ?
			visibleRating.map((item) => {

				return (
					<tbody>
					<td key={'sub_full_name' + item.id}>{item.full_name}</td>
					<td key={'sub_faculty' + item.id}>{item.faculty_name}</td>
					<td key={'sub_cafedra' + item.id}>{item.cafedra_name}</td>
					<td key={'sub_value' + item.id}> {item.value} </td>
					</tbody>
				);
			})
			: <tbody> Список порожній </tbody>;

		return (
			<div>
				{
					(!isEmpty(rating_list)) ?
						<SearchPanel
							onUpdateSearch = {this.onUpdateSearch}
						/> : ''
				}
				<table key={'rating_list'}>
					<thead>
					<th key={'sub_full_name'}>Науково-педагогічний працівник</th>
					<th key={'sub_faculty'}>Факультет</th>
					<th key={'sub_cafedra'}>Кафедра</th>
					<th key={'sub_value'}>Оцінка</th>
					</thead>
					{rowsTable}
				</table>
			</div>
		)
	}
}
