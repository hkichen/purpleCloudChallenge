import axios from 'axios';

export default {
	search: function(username) {
		const url = 'https://api.github.com/users/'+ username + '/events';
		return axios.get(url)
	}
};

