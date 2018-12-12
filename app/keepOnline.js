import fetch from 'isomorphic-fetch'
import cookie from 'react-cookie'

const keepOnline = () => {
	if (cookie.load('token')) {
		fetch(__API__.keepOnline, {
			method: 'GET',
			credentials: 'include'
		}).then(data => data.json()).then(data => {
			if (data.error) {
				cookie.remove('token', {
					path: '/'
				})
				location.reload()
			}
		}).catch(err => {
			console.log(err)
		})
	}
}

export default keepOnline