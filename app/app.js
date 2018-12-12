import React, {
	Component,
	PropTypes
} from 'react'
import {
	connect
} from 'react-redux';
// import Nav from './components/nav/display-navNormalize'
import MessageLists from './components/message/highorder-message.js'
import LoginWindow from './components/login/highorder-loginWindow.js'
import Slibebar from './components/nav/display-slidebar.js'
import Mark from './components/mark/highorder-mark.js'
import {
	toggleMark
} from './components/mark/data-mark.js'

class App extends Component {
	componentDidMount() {
		this.props.didMount()
	}
	componentDidUpdate() {
		console.log("component has load")
		this.props.didMount()
	}
	render() {
		return (
			<div>
				{/* <Nav/>  */}
				<Mark/>
				<Slibebar/>
				<MessageLists/>
				<LoginWindow/>
				{this.props.children}
			</div>
		)
	}
}



const mapStateToProps = (state) => {
	return {}
}

const mapDispatchToProps = (dispatch) => {
	return {
		didMount: () => dispatch(toggleMark(false))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)