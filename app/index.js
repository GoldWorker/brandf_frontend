// fetch polyfill 假设你已经使用了 Promise 的 polyfill。
// 确保你使用 Promise polyfill 的一个最简单的办法是在所有应用代码前启用 Babel 的 ES6 polyfill
require('./sass/main/slucky.scss');
require('./css/bug.css');
require('./css/styles.css');
require('./css/component.css');

import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import {
	Provider,
	connect
} from 'react-redux'
import {
	Router,
	Route,
	IndexRoute,
	hashHistory,
	browserHistory
} from 'react-router'

import {
	getStore
} from './components/store.js'
import createRouterConfig from './routerConfig.js'

// 管理api接口
import __API__ from './config.js'
window.__API__ = __API__

// const PageContainer = (props) => {
// 	return (
// 		<div>
// 			<TodoList/>
// 			<LoginWindow/>
// 			<MessageLists/>
// 			<div className="bg-black p8">
// 				<LoginInfo/>
// 			</div>
// 			<Register/>
// 		</div>
// 	)
// }

// const Root = connect(function(state) {
// 	return state;
// })(PageContainer);

// const routerConfig = createRouterConfig()
const store = getStore()

ReactDOM.render(
	<Provider store={store}>
     	<Router history={hashHistory} routes={createRouterConfig(store)}/>
  	</Provider>,
	document.getElementById('root')
)