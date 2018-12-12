// import TodoList from './components/todoList/highorder-todoList.js'
// // import LoginWindow from './components/login/highorder-loginWindow.js'
// import LoginInfo from './components/login/highorder-loginInfo.js'
// // import MessageLists from './components/message/highorder-message.js'
// import WeiboHotList from './components/spider/highorder-weiboHotList.js'
// import ArticleLists from './components/article/highorder-article.js'
// import CommentInput from './components/comment/highorder-commentInput.js'
// import CommentShow from './components/comment/highorder-commentShow.js'
// import ArticleDetail from './components/articleDetail/highorder-articleDetail.js'
// import ArticlePublish from './components/articlePublish/highorder-articlePublish.js'
// import Register from './components/register/highorder-register.js'
import App from './app.js'
import keepOnline from './keepOnline.js'
import {
	toggleMark
} from './components/mark/data-mark.js'

const creatRouterConfig = (store) => {
	return {
		path: "/",
		component: App,
		indexRoute: {
			getComponent(nextState, cb) {
				require.ensure([], (require) => {
					// var indexCover = require('./components/indexCover.js').default
					var renderPage = require('./components/dnd/highorder-renderPage').default
					var page = renderPage('index');
					var updateReducer = require('./components/store.js').updateReducer
					updateReducer(store)
					cb(null, page)
				})
			},
			onEnter: () => {
				console.log(store)
				keepOnline()
				store.dispatch(toggleMark(true))
			}
		},
		childRoutes: [{
			path: '/article',
			getComponent(nextState, cb) {
				require.ensure([], (require) => {
					// var article = require('./components/article/highorder-article.js').default
					var renderPage = require('./components/dnd/highorder-renderPage').default
					var page = renderPage('article');
					var updateReducer = require('./components/store.js').updateReducer
					updateReducer(store)
					cb(null, page)
				})
			},
			onEnter: () => {
				keepOnline()
				store.dispatch(toggleMark(true))
			}
		}, {
			path: '/register',
			getComponent(nextState, cb) {
				require.ensure([], (require) => {
					var register = require('./components/register/highorder-register.js').default
					var updateReducer = require('./components/store.js').updateReducer
					updateReducer(store)
					cb(null, register)
				})
			},
			onEnter: () => {
				keepOnline()
				store.dispatch(toggleMark(true))
			}
		}, {
			path: '/about',
			getComponent(nextState, cb) {
				require.ensure([], (require) => {
					var about = require('./components/about/display-about.js').default
					cb(null, about)
				})
			},
			onEnter: () => {
				keepOnline()
				store.dispatch(toggleMark(true))
			}
		}, {
			path: '/edit',
			getComponent(nextState, cb) {
				require.ensure([], (require) => {
					var edit = require('./components/articlePublish/highorder-articlePublish.js').default
					var updateReducer = require('./components/store.js').updateReducer
					updateReducer(store)
					cb(null, edit)
				})
			},
			onEnter: () => {
				keepOnline()
				store.dispatch(toggleMark(true))
			}
		}, {
			path: '/slucky',
			getComponent(nextState, cb) {
				require.ensure([], (require) => {
					var slucky = require('./components/sluckyDoc/display-slucky.js').default
					cb(null, slucky)
				})
			},
			onEnter: () => {
				keepOnline()
				store.dispatch(toggleMark(true))
			}
		}, {
			path: '/dnd',
			getComponent(nextState, cb) {
				require.ensure([], (require) => {
					var dnd = require('./components/dnd/highorder-dnd.js').default
					var updateReducer = require('./components/store.js').updateReducer
					updateReducer(store)
					cb(null, dnd)
				})
			},
			onEnter: () => {
				keepOnline()
				store.dispatch(toggleMark(true))
			},
		},{
			path: '/:id',
			getComponent(nextState, cb) {
				require.ensure([], (require) => {
					var articleDetail = require('./components/articleDetail/highorder-articleDetail.js').default
					var updateReducer = require('./components/store.js').updateReducer
					updateReducer(store)
					cb(null, articleDetail)
				})
			},
			onEnter: () => {
				keepOnline()
				store.dispatch(toggleMark(true))
			},
		},]
	}
}

export default creatRouterConfig