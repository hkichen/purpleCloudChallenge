import axios from 'axios';

export default {
	search: function(username) {
		const url = 'https://api.github.com/users/'+ username + '/events';
		console.log("this was hit!")
		return axios.get(url).then(console.log("we got the info!"))
	}
};

