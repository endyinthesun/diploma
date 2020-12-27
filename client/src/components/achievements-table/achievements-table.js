import React from 'react';
import { isEmpty } from "lodash";
import '../Table.scss'

 const AchievementsTable = (props) => {
	const {subscriber_item_list, dropItemsFromSubscriber} = props;

	let rowsTable = (!isEmpty(subscriber_item_list)) ?
		subscriber_item_list.map((item) =>{
			return(
				<tbody>
				<tr>
				<td key={'sub_item_name_' + item.id}>{item.item_name}</td>
				<td key={'sub_item_coefficient_' + item.id}>{item.coefficient}</td>
				<td key={'sub_item_value_' + item.id}>{item.item_value}</td>
				<td key={'item_button' + item.id}>
					<button value={item.id} onClick={(data) => {
						dropItemsFromSubscriber(data.target.value);
					}}>
						Видалити
					</button>
				</td>
				</tr>
				</tbody>
			);
		})
	 : <tbody>
		<tr>
		Введіть свої дані
		</tr>
	</tbody>



	 return(
			<table key={'subscriber_item_list'}
			       className={'table table-striped Table'}
			>
				<thead>
				<tr
					className={'Table-Header'}
				>
					<th key={'sub_item_name'}>Показник</th>
					<th key={'sub_coefficient'}>Множник на одиницю</th>
					<th key={'sub_item_value'}>Бал за одиницю</th>
					<th key={'sub_item_value'}></th>
				</tr>
				</thead>
				{rowsTable}
			</table>
		)
}

export default AchievementsTable;