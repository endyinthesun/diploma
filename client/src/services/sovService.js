export default class sovService {
	constructor(){
		this._apiBase = 'http://diploma/api'
	}

	async getResource(url){
		let res = await fetch(`${this._apiBase}${url}`);

		return await res.json();
	}

	async postData(url, data){
		let res = await fetch(`${this._apiBase}${url}`, {
			method: 'POST',
			mode: "no-cors",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
			// body: data
		});
		console.log(`--- data from PostData`, data);
		return await res.json();
	}


	//GET methods
	signIn(login, password){
		return this.getResource(`/Teachers.php?controller=sign&login=${login}&password=${password}`);
	}

	getRatingBy(id) {
		return this.getResource(`/Items.php?controller=getRatingBy&rank_id=${id}`);
	}

	countSubscriber(id) {
		return this.getResource(`/Teachers.php?controller=countTeacherItem&id=${id}`);
	}

	getUser(id){
		return this.getResource(`/Teachers.php?controller=getUser&id=${id}`);
	}

	getItemList () {
		return this.getResource('/Items.php?controller=getItems');
	}

	getItemListBySubscriber(id) {
		return this.getResource(`/Teachers.php?controller=getItemsBySubscriber&id=${id}`);
	}



		//POST methods

	dropItemsFromSubscriber(data){
		return this.postData('/Teachers.php?controller=dropItemsFromSubscriber', data);
	}

	addItemForSubscriber(data){
		return this.postData('/Items.php?controller=addItemsToSubscriber', data);
	}





}