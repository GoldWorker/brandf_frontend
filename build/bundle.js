webpackJsonp([7],{

/***/ 111:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



module.exports = __webpack_require__(610);


/***/ }),

/***/ 112:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.load = load;
exports.select = select;
exports.save = save;
exports.remove = remove;
exports.setRawCookie = setRawCookie;
exports.plugToRequest = plugToRequest;

var _cookie = __webpack_require__(281);

var _cookie2 = _interopRequireDefault(_cookie);

var _objectAssign = __webpack_require__(10);

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _isNode = __webpack_require__(509);

var _isNode2 = _interopRequireDefault(_isNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _rawCookie = {};
var _res = undefined;

function _isResWritable() {
  return _res && !_res.headersSent;
}

function load(name, doNotParse, opt) {
  var cookies = _isNode2.default ? _rawCookie : _cookie2.default.parse(document.cookie, opt);
  var cookieVal = cookies && cookies[name];

  if (typeof doNotParse === 'undefined') {
    doNotParse = !cookieVal || cookieVal[0] !== '{' && cookieVal[0] !== '[';
  }

  if (!doNotParse) {
    try {
      cookieVal = JSON.parse(cookieVal);
    } catch (e) {
      // Not serialized object
    }
  }

  return cookieVal;
}

function select(regex) {
  var cookies = _isNode2.default ? _rawCookie : _cookie2.default.parse(document.cookie);

  if (!cookies) {
    return {};
  }

  if (!regex) {
    return cookies;
  }

  return Object.keys(cookies).reduce(function (accumulator, name) {
    if (!regex.test(name)) {
      return accumulator;
    }

    var newCookie = {};
    newCookie[name] = cookies[name];
    return (0, _objectAssign2.default)({}, accumulator, newCookie);
  }, {});
}

function save(name, val, opt) {
  _rawCookie[name] = val;

  // allow you to work with cookies as objects.
  if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object') {
    _rawCookie[name] = JSON.stringify(val);
  }

  // Cookies only work in the browser
  if (!_isNode2.default) {
    document.cookie = _cookie2.default.serialize(name, _rawCookie[name], opt);
  }

  if (_isResWritable() && _res.cookie) {
    var expressOpt = _extends({}, opt);
    if (expressOpt.maxAge) {
      // the standard for maxAge is seconds but express uses milliseconds
      expressOpt.maxAge = opt.maxAge * 1000;
    }

    _res.cookie(name, val, opt);
  }
}

function remove(name, opt) {
  delete _rawCookie[name];

  if (typeof opt === 'undefined') {
    opt = {};
  } else if (typeof opt === 'string') {
    // Will be deprecated in future versions
    opt = { path: opt };
  } else {
    // Prevent mutation of opt below
    opt = (0, _objectAssign2.default)({}, opt);
  }

  if (typeof document !== 'undefined') {
    opt.expires = new Date(1970, 1, 1, 0, 0, 1);
    opt.maxAge = 0;
    document.cookie = _cookie2.default.serialize(name, '', opt);
  }

  if (_isResWritable() && _res.clearCookie) {
    _res.clearCookie(name, opt);
  }
}

function setRawCookie(rawCookie) {
  if (rawCookie) {
    _rawCookie = _cookie2.default.parse(rawCookie);
  } else {
    _rawCookie = {};
  }
}

function plugToRequest(req, res) {
  if (req.cookie) {
    _rawCookie = req.cookie;
  } else if (req.cookies) {
    _rawCookie = req.cookies;
  } else if (req.headers && req.headers.cookie) {
    setRawCookie(req.headers.cookie);
  } else {
    _rawCookie = {};
  }

  _res = res;

  return function unplug() {
    _res = null;
    _rawCookie = {};
  };
}

exports.default = {
  setRawCookie: setRawCookie,
  load: load,
  select: select,
  save: save,
  remove: remove,
  plugToRequest: plugToRequest
};

/***/ }),

/***/ 113:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.toggleMark = undefined;

var _store = __webpack_require__(32);

var toggleMark = exports.toggleMark = function toggleMark(bool) {
	return {
		type: "TOGGLE_MARK",
		isToggle: bool
	};
};

var markReducer = function markReducer() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
		isToggle: false
	};
	var action = arguments[1];

	switch (action.type) {
		case "TOGGLE_MARK":
			return Object.assign({}, state, {
				isToggle: action.isToggle
			});
		default:
			return state;
	}
};

(0, _store.addReducer)(markReducer);

/***/ }),

/***/ 172:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.logout = exports.login = exports.loginWindowToggle = exports.logoutSuccess = undefined;

var _isomorphicFetch = __webpack_require__(85);

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _reactCookie = __webpack_require__(112);

var _reactCookie2 = _interopRequireDefault(_reactCookie);

var _dataMessage = __webpack_require__(263);

var _store = __webpack_require__(32);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// state = {
// 	isLogined: bool,
// 	isToggle:bool,
// 	loginError:{},
// 	userInfo: {
// 		name: "Keven",
// 		portrait: "url"
// 	}
// }
var loginError = function loginError(err) {
	return {
		type: "LOGIN_ERROR",
		loginError: err
	};
};

var loginSuccess = function loginSuccess(data) {
	return {
		type: "LOGIN_SUCCESS",
		userInfo: data
	};
};

var logoutSuccess = exports.logoutSuccess = function logoutSuccess(data) {
	return function (dispatch) {
		dispatch({
			type: "LOGOUT_SUCCESS",
			userInfo: data
		});
	};
};

var loginWindowToggle = exports.loginWindowToggle = function loginWindowToggle() {
	return {
		type: "LOGIN_WINDOW_TOGGLE"
	};
};
var login = exports.login = function login() {
	var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
	var pw = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

	return function (dispatch) {
		return (0, _isomorphicFetch2.default)(__API__.login, {
			credentials: 'include',
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: name,
				password: pw
			})
		}).then(function (data) {
			return data.json();
		}).then(function (data) {
			if (data.error) {
				dispatch(loginError(data));
				dispatch((0, _dataMessage.pushInQueue)({
					info: "请确认邮箱或密码正确",
					flag: "warning"
				}));
			} else {
				dispatch(loginSuccess(data));
				dispatch((0, _dataMessage.pushInQueue)({
					info: "登录成功",
					flag: "success"
				}));
				dispatch(loginWindowToggle());
				localStorage.setItem("userInfo", JSON.stringify(data)); // save login msg
				// location.reload()
			}
		}).catch(function (err) {
			console.log("login err");
			dispatch(loginError(err));
			dispatch((0, _dataMessage.pushInQueue)({
				info: "网络无法连接，请稍后再尝试",
				flag: "warning"
			}));
		});
	};
};

var logout = exports.logout = function logout() {
	return function (dispatch) {
		return (0, _isomorphicFetch2.default)(__API__.logout, {
			credentials: 'include', //to send with cookie
			method: "GET"
		}).then(function (data) {
			return data.json();
		}).then(function (data) {
			console.log("logout");
			dispatch(logoutSuccess(data));
			dispatch((0, _dataMessage.pushInQueue)({
				info: "注销成功",
				flag: "success"
			}));
			_reactCookie2.default.remove('token', {
				path: '/'
			});
		});
	};
};

var loginReducer = function loginReducer() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
		isLogined: _reactCookie2.default.load('token') ? true : false,
		isToggle: false,
		userInfo: {
			msg: _reactCookie2.default.load('token') ? "您好，" + JSON.parse(localStorage.getItem("userInfo")).name : "未登录"
		}
	};
	var action = arguments[1];

	switch (action.type) {
		case "LOGIN_ERROR":
			return Object.assign({}, state, {
				isLogined: false,
				loginError: action.loginError
			});
		case "LOGIN_SUCCESS":
			return Object.assign({}, state, {
				isLogined: true,
				loginError: {},
				userInfo: action.userInfo
			});
		case "LOGIN_WINDOW_TOGGLE":
			return Object.assign({}, state, {
				isToggle: !state.isToggle
			});
		case "LOGOUT_SUCCESS":
			return Object.assign({}, state, {
				isLogined: false,
				loginError: {},
				userInfo: {
					msg: "未登录"
				}
			});
		default:
			return state;
	}
};

(0, _store.addReducer)(loginReducer);

/***/ }),

/***/ 173:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _displayLoginForm = __webpack_require__(268);

var _displayLoginForm2 = _interopRequireDefault(_displayLoginForm);

var _reactAddonsCssTransitionGroup = __webpack_require__(111);

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoginWindow = function (_Component) {
	_inherits(LoginWindow, _Component);

	function LoginWindow(props) {
		_classCallCheck(this, LoginWindow);

		return _possibleConstructorReturn(this, (LoginWindow.__proto__ || Object.getPrototypeOf(LoginWindow)).call(this, props));
	}

	_createClass(LoginWindow, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    handleConfirmClick = _props.handleConfirmClick,
			    handleCancelClick = _props.handleCancelClick,
			    isToggle = _props.isToggle;

			var toggleClass = isToggle ? {
				display: "block"
			} : {
				display: "none"
			};
			if (isToggle) {
				return _react2.default.createElement(
					_reactAddonsCssTransitionGroup2.default,
					{
						transitionName: 'example',
						transitionAppear: true,
						transitionAppearTimeout: 500,
						transitionEnter: false,
						transitionLeave: false },
					_react2.default.createElement(
						'div',
						{ key: 'loginWindow' },
						_react2.default.createElement('div', { className: 'dialog-mark' }),
						_react2.default.createElement(
							'div',
							{ className: 'dialog-box' },
							_react2.default.createElement(
								_reactAddonsCssTransitionGroup2.default,
								{
									transitionName: 'example',
									transitionAppear: true,
									transitionAppearTimeout: 500,
									transitionEnter: false,
									transitionLeave: false },
								_react2.default.createElement(
									'div',
									{ className: 'dialog paper' },
									_react2.default.createElement(
										'div',
										{ className: 'ta-r' },
										_react2.default.createElement(
											'button',
											{ type: 'button', className: 'btn btn-s btn-tp c-blue mt4 mr4', onClick: handleCancelClick.bind(this) },
											'X'
										)
									),
									_react2.default.createElement(_displayLoginForm2.default, { handleSubmitClick: handleConfirmClick })
								)
							)
						)
					)
				);
			} else return _react2.default.createElement('div', null);
		}
	}]);

	return LoginWindow;
}(_react.Component);

LoginWindow.defaultProps = {
	isToggle: true
};

exports.default = LoginWindow;

/***/ }),

/***/ 209:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
module.exports = exports['default'];

/***/ }),

/***/ 253:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.nameShape = undefined;
exports.transitionTimeout = transitionTimeout;

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(16);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function transitionTimeout(transitionType) {
  var timeoutPropName = 'transition' + transitionType + 'Timeout';
  var enabledPropName = 'transition' + transitionType;

  return function (props) {
    // If the transition is enabled
    if (props[enabledPropName]) {
      // If no timeout duration is provided
      if (props[timeoutPropName] == null) {
        return new Error(timeoutPropName + ' wasn\'t supplied to CSSTransitionGroup: ' + 'this can cause unreliable animations and won\'t be supported in ' + 'a future version of React. See ' + 'https://fb.me/react-animation-transition-group-timeout for more ' + 'information.');

        // If the duration isn't a number
      } else if (typeof props[timeoutPropName] !== 'number') {
        return new Error(timeoutPropName + ' must be a number (in milliseconds)');
      }
    }

    return null;
  };
}

var nameShape = exports.nameShape = _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.shape({
  enter: _propTypes2.default.string,
  leave: _propTypes2.default.string,
  active: _propTypes2.default.string
}), _propTypes2.default.shape({
  enter: _propTypes2.default.string,
  enterActive: _propTypes2.default.string,
  leave: _propTypes2.default.string,
  leaveActive: _propTypes2.default.string,
  appear: _propTypes2.default.string,
  appearActive: _propTypes2.default.string
})]);

/***/ }),

/***/ 262:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(169);

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(109);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = __webpack_require__(46);

var _reactRouter = __webpack_require__(86);

var _store = __webpack_require__(32);

var _routerConfig = __webpack_require__(278);

var _routerConfig2 = _interopRequireDefault(_routerConfig);

var _config = __webpack_require__(276);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// fetch polyfill 假设你已经使用了 Promise 的 polyfill。
// 确保你使用 Promise polyfill 的一个最简单的办法是在所有应用代码前启用 Babel 的 ES6 polyfill
__webpack_require__(490);
__webpack_require__(487);
__webpack_require__(489);
__webpack_require__(488);

// 管理api接口

window.__API__ = _config2.default;

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
var store = (0, _store.getStore)();

_reactDom2.default.render(_react2.default.createElement(
	_reactRedux.Provider,
	{ store: store },
	_react2.default.createElement(_reactRouter.Router, { history: _reactRouter.hashHistory, routes: (0, _routerConfig2.default)(store) })
), document.getElementById('root'));

/***/ }),

/***/ 263:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.pushInQueue = undefined;

var _store = __webpack_require__(32);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } // ex:
// let state = {
// 	lists: [{
// 		flag: "hint/text/warning"
// 		info: ""
// 	}, {
// 		info: ""
// 	}, {
// 		info: ""
// 	}]
// }


var shiftMsg = function shiftMsg(msgQueue) {
	return {
		type: "SHIFT_MSG",
		msgQueue: msgQueue //最新的消息队列
	};
};

var pushMsg = function pushMsg(msg) {
	return {
		type: "PUSH_MSG",
		msg: msg.info,
		flag: msg.flag
	};
};

var _timer;
var nextMsgId = 0;
var _message = [];

var pushInQueue = exports.pushInQueue = function pushInQueue(msg) {
	return function (dispatch) {
		if (_message.length == 0) {
			// 生成定时器
			console.log("timer seted");
			_timer = setInterval(function () {
				popToQueue(dispatch);
			}, 3000);
		}
		_message.push(msg);
		dispatch(pushMsg(msg));
	};
};

var popToQueue = function popToQueue(dispatch) {
	_message.shift();
	if (_message.length == 0) {
		clearInterval(_timer); //清空队列
		console.log("timer cleared");
	}
	dispatch(shiftMsg(_message));
};

var messageReducer = function messageReducer() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	var action = arguments[1];

	switch (action.type) {
		case "PUSH_MSG":
			return [].concat(_toConsumableArray(state), [{
				info: action.msg,
				id: action.id,
				flag: action.flag
			}]);
		case "SHIFT_MSG":
			return [].concat(_toConsumableArray(action.msgQueue));
		default:
			return state;
	}
};

(0, _store.addReducer)(messageReducer);

/***/ }),

/***/ 264:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _reactRedux = __webpack_require__(46);

var _displayLoginInfo = __webpack_require__(269);

var _displayLoginInfo2 = _interopRequireDefault(_displayLoginInfo);

var _dataLogin = __webpack_require__(172);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state) {
	return {
		userInfo: state.loginReducer.userInfo,
		isLogined: state.loginReducer.isLogined
	};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	return {
		handleLoginClick: function handleLoginClick() {
			return dispatch((0, _dataLogin.loginWindowToggle)());
		},
		handleLogoutClick: function handleLogoutClick() {
			return dispatch((0, _dataLogin.logout)());
		}
	};
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_displayLoginInfo2.default);

/***/ }),

/***/ 266:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(46);

var _highorderMessage = __webpack_require__(274);

var _highorderMessage2 = _interopRequireDefault(_highorderMessage);

var _highorderLoginWindow = __webpack_require__(270);

var _highorderLoginWindow2 = _interopRequireDefault(_highorderLoginWindow);

var _displaySlidebar = __webpack_require__(275);

var _displaySlidebar2 = _interopRequireDefault(_displaySlidebar);

var _highorderMark = __webpack_require__(272);

var _highorderMark2 = _interopRequireDefault(_highorderMark);

var _dataMark = __webpack_require__(113);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import Nav from './components/nav/display-navNormalize'


var App = function (_Component) {
	_inherits(App, _Component);

	function App() {
		_classCallCheck(this, App);

		return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
	}

	_createClass(App, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.props.didMount();
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			console.log("component has load");
			this.props.didMount();
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(_highorderMark2.default, null),
				_react2.default.createElement(_displaySlidebar2.default, null),
				_react2.default.createElement(_highorderMessage2.default, null),
				_react2.default.createElement(_highorderLoginWindow2.default, null),
				this.props.children
			);
		}
	}]);

	return App;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
	return {};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	return {
		didMount: function didMount() {
			return dispatch((0, _dataMark.toggleMark)(false));
		}
	};
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(App);

/***/ }),

/***/ 267:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _reactAddonsCssTransitionGroup = __webpack_require__(111);

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// 可配置组件
// const dialog = {
// 	handleConfirm: handleLogoutClick.bind(this),
// 	content: "Are you sure logout?",
// 	btnText: "注销",
// 	btnClassName: "btn btn-s btn-hollow b-w c-text-w mr8"
// }

var DialogWindow = function (_Component) {
	_inherits(DialogWindow, _Component);

	function DialogWindow(props) {
		_classCallCheck(this, DialogWindow);

		var _this = _possibleConstructorReturn(this, (DialogWindow.__proto__ || Object.getPrototypeOf(DialogWindow)).call(this, props));

		_this.state = {
			isToggle: false
		};
		console.log(_this.state);
		return _this;
	}

	// 维护组件display状态


	_createClass(DialogWindow, [{
		key: 'handleToggleClick',
		value: function handleToggleClick() {
			var _self = this;
			this.setState({
				isToggle: !_self.state.isToggle
			});
		}
	}, {
		key: 'handleConfirmClick',
		value: function handleConfirmClick() {
			var handleConfirm = this.props.dialog.handleConfirm;

			this.setState({
				isToggle: false
			});
			handleConfirm();
		}
	}, {
		key: 'render',
		value: function render() {
			var _props$dialog = this.props.dialog,
			    content = _props$dialog.content,
			    btnText = _props$dialog.btnText,
			    title = _props$dialog.title,
			    btnClassName = _props$dialog.btnClassName;

			return _react2.default.createElement(
				'div',
				{ className: 'd-il' },
				_react2.default.createElement(
					'button',
					{ type: 'button', className: btnClassName, onClick: this.handleToggleClick.bind(this) },
					btnText
				),
				this.state.isToggle ? _react2.default.createElement(
					_reactAddonsCssTransitionGroup2.default,
					{
						transitionName: 'example',
						transitionAppear: true,
						transitionAppearTimeout: 500,
						transitionEnter: false,
						transitionLeave: false },
					_react2.default.createElement(
						'div',
						null,
						_react2.default.createElement('div', { className: 'dialog-mark' }),
						_react2.default.createElement(
							'div',
							{ className: 'dialog-box' },
							_react2.default.createElement(
								_reactAddonsCssTransitionGroup2.default,
								{
									transitionName: 'example',
									transitionAppear: true,
									transitionAppearTimeout: 500,
									transitionEnter: false,
									transitionLeave: false },
								_react2.default.createElement(
									'div',
									{ className: 'dialog paper' },
									_react2.default.createElement(
										'div',
										{ className: 'dialog-content c-text-b' },
										_react2.default.createElement(
											'p',
											{ className: 'c-text-b mt0' },
											_react2.default.createElement(
												'strong',
												null,
												title
											)
										),
										content
									),
									_react2.default.createElement(
										'div',
										{ className: 'ta-c pb8' },
										_react2.default.createElement(
											'button',
											{ type: 'button', className: 'btn btn-s btn-tp c-blue mr8', onClick: this.handleConfirmClick.bind(this) },
											'\u786E\u8BA4'
										),
										_react2.default.createElement(
											'button',
											{ type: 'button', className: 'btn btn-s btn-tp c-blue', onClick: this.handleToggleClick.bind(this) },
											'\u5173\u95ED'
										)
									)
								)
							)
						)
					)
				) : ""
			);
		}
	}]);

	return DialogWindow;
}(_react.Component);

DialogWindow.defaultProps = {
	dialog: {
		content: "Are you sure?",
		btnText: "TEXT",
		title: "警告",
		btnClassName: "btn btn-s btn-hollow b-w c-text-w mr8"
	}
};

exports.default = DialogWindow;

/***/ }),

/***/ 268:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var loginForm = function (_Component) {
	_inherits(loginForm, _Component);

	function loginForm(props) {
		_classCallCheck(this, loginForm);

		var _this = _possibleConstructorReturn(this, (loginForm.__proto__ || Object.getPrototypeOf(loginForm)).call(this, props));

		_this.state = {
			nameValue: "",
			pwValue: ""
		};
		return _this;
	}

	_createClass(loginForm, [{
		key: "handleNameChange",
		value: function handleNameChange(e) {
			this.setState({
				nameValue: e.target.value
			});
		}
	}, {
		key: "handlePwChange",
		value: function handlePwChange(e) {
			this.setState({
				pwValue: e.target.value
			});
		}
	}, {
		key: "render",
		value: function render() {
			var handleSubmitClick = this.props.handleSubmitClick;

			return _react2.default.createElement(
				"div",
				null,
				_react2.default.createElement(
					"div",
					{ className: "dialog-content" },
					_react2.default.createElement(
						"p",
						{ className: "mt0 mb4 ta-c" },
						_react2.default.createElement(
							"strong",
							null,
							"\u767B\u5F55"
						)
					),
					_react2.default.createElement(
						"div",
						{ className: "input pt8" },
						_react2.default.createElement(
							"label",
							{ htmlFor: "userNameInput", className: "fs12 c-grey" },
							"\u90AE\u7BB1\uFF1A"
						),
						_react2.default.createElement("br", null),
						_react2.default.createElement("input", { onChange: this.handleNameChange.bind(this), id: "userNameInput", type: "text", className: "input-down", placeholder: "\u4EC5\u9650\u90AE\u7BB1\u767B\u5F55", maxLength: "24", autoFocus: true, required: true })
					),
					_react2.default.createElement("br", null),
					_react2.default.createElement(
						"div",
						{ className: "input pt8" },
						_react2.default.createElement(
							"label",
							{ htmlFor: "userPwInput", className: "fs12 c-grey" },
							"\u5BC6\u7801\uFF1A"
						),
						_react2.default.createElement("br", null),
						_react2.default.createElement("input", { onChange: this.handlePwChange.bind(this), id: "userPwInput", type: "password", className: "input-down", placeholder: "\u4F60\u4F1A\u5FD8\u8BB0\u7684", maxLength: "24", required: true })
					)
				),
				_react2.default.createElement(
					"div",
					{ className: "ta-c pb8" },
					_react2.default.createElement(
						"button",
						{ type: "button", className: "btn btn-s btn-tp c-blue", onClick: handleSubmitClick.bind(this, this.state.nameValue, this.state.pwValue) },
						"\u786E\u8BA4"
					)
				)
			);
		}
	}]);

	return loginForm;
}(_react.Component);

exports.default = loginForm;

/***/ }),

/***/ 269:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _reactCookie = __webpack_require__(112);

var _reactCookie2 = _interopRequireDefault(_reactCookie);

var _displayLoginWindow = __webpack_require__(173);

var _displayLoginWindow2 = _interopRequireDefault(_displayLoginWindow);

var _displayDialogWindow = __webpack_require__(267);

var _displayDialogWindow2 = _interopRequireDefault(_displayDialogWindow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoginInfo = function (_Component) {
	_inherits(LoginInfo, _Component);

	function LoginInfo() {
		_classCallCheck(this, LoginInfo);

		return _possibleConstructorReturn(this, (LoginInfo.__proto__ || Object.getPrototypeOf(LoginInfo)).apply(this, arguments));
	}

	_createClass(LoginInfo, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    userInfo = _props.userInfo,
			    isLogined = _props.isLogined,
			    handleLoginClick = _props.handleLoginClick,
			    handleLogoutClick = _props.handleLogoutClick;

			// config dialog

			var dialog = {
				handleConfirm: handleLogoutClick.bind(this),
				content: "需要立即注销吗？",
				btnText: "注销",
				title: "警告",
				btnClassName: "btn btn-s btn-hollow b-w c-text-w mr8"

				// console.log(JSON.parse(localStorage.getItem("userInfo")))
			};return _react2.default.createElement(
				'div',
				{ className: 'login-info' },
				isLogined ? _react2.default.createElement(_displayDialogWindow2.default, { dialog: dialog }) : _react2.default.createElement(
					'button',
					{ className: 'btn btn-s btn-hollow b-w c-text-w mr8', onClick: handleLoginClick.bind(this) },
					'\u767B\u5F55'
				),
				_react2.default.createElement(
					'span',
					null,
					userInfo.msg
				)
			);
		}
	}]);

	return LoginInfo;
}(_react.Component);
// LoginInfo.defaultProps = {
// 	userInfo: cookie.load('token') ? JSON.parse(localStorage.getItem("userInfo")) : {
// 		msg: "",
// 		name: ""
// 	}
// }

exports.default = LoginInfo;

/***/ }),

/***/ 270:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _reactRedux = __webpack_require__(46);

var _displayLoginWindow = __webpack_require__(173);

var _displayLoginWindow2 = _interopRequireDefault(_displayLoginWindow);

var _dataLogin = __webpack_require__(172);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state) {
	return {
		isToggle: state.loginReducer.isToggle
	};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	return {
		handleConfirmClick: function handleConfirmClick(name, pw) {
			// e.preventDefault()
			dispatch((0, _dataLogin.login)(name, pw));
		},
		handleCancelClick: function handleCancelClick() {
			return dispatch((0, _dataLogin.loginWindowToggle)());
		}
	};
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_displayLoginWindow2.default);

/***/ }),

/***/ 271:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Mark = function Mark(props) {
	return _react2.default.createElement(
		'div',
		{ className: 'dialog-mark-w', style: props.isToggle ? { display: 'block' } : { display: 'none' } },
		_react2.default.createElement(
			'div',
			{ className: 'icon-box' },
			_react2.default.createElement(
				'div',
				{ className: 'yu-icon' },
				_react2.default.createElement(
					'div',
					{ className: 'spinner' },
					_react2.default.createElement('div', { className: 'double-bounce1' }),
					_react2.default.createElement('div', { className: 'double-bounce2' })
				)
			)
		)
	);
};

exports.default = Mark;

/***/ }),

/***/ 272:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _reactRedux = __webpack_require__(46);

var _displayMark = __webpack_require__(271);

var _displayMark2 = _interopRequireDefault(_displayMark);

var _dataMark = __webpack_require__(113);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state) {
	return {
		isToggle: state.markReducer.isToggle
	};
};

var MarkComponent = (0, _reactRedux.connect)(mapStateToProps)(_displayMark2.default);

exports.default = MarkComponent;

/***/ }),

/***/ 273:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _reactAddonsCssTransitionGroup = __webpack_require__(111);

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MessageLists = function MessageLists(props) {
	// 过滤flag
	var getBgColor = function getBgColor(flag) {
		// console.log(flag)
		switch (flag) {
			case "hint":
				return "bg-grey";
			case "success":
				return "bg-green";
			case "warning":
				return "bg-red";
			default:
				return "bg-grey";
		}
	};
	return _react2.default.createElement(
		'div',
		{ className: 'toastlists-normalize-box' },
		props.lists.map(function (elem, index) {
			return _react2.default.createElement(
				_reactAddonsCssTransitionGroup2.default,
				{
					transitionName: 'example',
					transitionAppear: true,
					transitionAppearTimeout: 500,
					transitionEnter: false,
					transitionLeave: false },
				_react2.default.createElement(
					'div',
					{ className: 'toastlist', key: index },
					_react2.default.createElement(
						'div',
						{ className: 'shadow' },
						_react2.default.createElement(
							'div',
							{ className: function () {
									return getBgColor(elem.flag);
								}() },
							elem.info
						)
					)
				)
			);
		})
	);
};

MessageLists.defaultProps = {
	lists: [{
		info: "Msg Loading"
	}]
};

exports.default = MessageLists;

/***/ }),

/***/ 274:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _reactRedux = __webpack_require__(46);

var _displayMessage = __webpack_require__(273);

var _displayMessage2 = _interopRequireDefault(_displayMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state) {
	return {
		lists: state.messageReducer
	};
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(_displayMessage2.default);

/***/ }),

/***/ 275:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _reactRouter = __webpack_require__(86);

var _highorderLoginInfo = __webpack_require__(264);

var _highorderLoginInfo2 = _interopRequireDefault(_highorderLoginInfo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SlideBar = function SlideBar(props) {
	return _react2.default.createElement(
		'div',
		{ className: 'slidebar-box-normalize' },
		_react2.default.createElement('input', { type: 'checkbox', id: 'slidebar-switch', className: 'd-n' }),
		_react2.default.createElement(
			'div',
			{ className: 'slidebar bg-purple' },
			_react2.default.createElement(
				'label',
				{ htmlFor: 'slidebar-switch', className: 'slidebar-tool lh56 plr16' },
				_react2.default.createElement(
					'span',
					{ className: 'mr16' },
					'Back'
				),
				_react2.default.createElement(
					'svg',
					{ className: 'icon icon16', id: 'slidebar_in' },
					_react2.default.createElement('use', { xlinkHref: '#icon-test' })
				),
				_react2.default.createElement(
					'div',
					{ id: 'slidebar_out' },
					_react2.default.createElement(
						'svg',
						{ className: 'icon icon16', id: 'slidebar_out' },
						_react2.default.createElement('use', { xlinkHref: '#icon-test' })
					)
				)
			),
			_react2.default.createElement(
				'ul',
				{ className: 'menu slidebar-menu' },
				_react2.default.createElement(
					'li',
					null,
					_react2.default.createElement(
						_reactRouter.IndexLink,
						{ activeStyle: { color: "rgba(0, 0, 0, 0.87)" }, activeClassName: 'bg-w', to: '/' },
						'\u9996\u9875'
					)
				),
				_react2.default.createElement(
					'li',
					null,
					_react2.default.createElement(
						_reactRouter.Link,
						{ activeStyle: { color: "rgba(0, 0, 0, 0.87)" }, activeClassName: 'bg-w', to: '/article' },
						'\u6587\u7AE0'
					)
				),
				_react2.default.createElement(
					'li',
					null,
					_react2.default.createElement(
						_reactRouter.Link,
						{ activeStyle: { color: "rgba(0, 0, 0, 0.87)" }, activeClassName: 'bg-w', to: '/register' },
						'\u540C\u9053'
					)
				),
				_react2.default.createElement(
					'li',
					null,
					_react2.default.createElement(
						_reactRouter.Link,
						{ activeStyle: { color: "rgba(0, 0, 0, 0.87)" }, activeClassName: 'bg-w', to: '/about' },
						'\u5173\u4E8E'
					)
				),
				_react2.default.createElement(
					'li',
					null,
					_react2.default.createElement(
						_reactRouter.Link,
						{ activeStyle: { color: "rgba(0, 0, 0, 0.87)" }, activeClassName: 'bg-w', to: '/slucky' },
						'Slucky \u8F7B\u91CF\u7EA7\u6837\u5F0F\u5E93\u6587\u6863'
					)
				)
			),
			_react2.default.createElement(
				'div',
				{ className: 'slidebar-login-box' },
				_react2.default.createElement(_highorderLoginInfo2.default, null)
			)
		),
		_react2.default.createElement('div', { className: 'mark-b' })
	);
}; /**
    * slidebar
    * @authors Your Name (you@example.org)
    * @date    2017-02-15 13:42:48
    * @version $Id$
    */

exports.default = SlideBar;

/***/ }),

/***/ 276:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var __PORT__ = "801";
var __PATH__ = "http://www.brandf.cn:" + __PORT__;

var __API__ = {
	weiboHostList: __PATH__ + "/crawler/weibo",
	articleAll: __PATH__ + "/article/all",
	articleOnce: __PATH__ + "/article/once/",
	articleEdit: __PATH__ + "/article",
	articlePage: __PATH__ + "/article/page/",
	login: __PATH__ + "/users/login",
	logout: __PATH__ + "/users/logout",
	getArtComment: __PATH__ + "/comment/normal/",
	postArtComment: __PATH__ + "/comment/normal",
	postCommentReply: __PATH__ + "/comment/reply",
	postVerifyEmail: __PATH__ + "/users/emailVerify",
	postRegister: __PATH__ + "/users/register",
	keepOnline: __PATH__ + "/users/keepOnline",
	comConf: __PATH__ + "/component/conf",
	comConfUpdate: __PATH__ + "/component/conf",
	comConfInit: __PATH__ + "/component/conf"
};

exports.default = __API__;

/***/ }),

/***/ 277:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _isomorphicFetch = __webpack_require__(85);

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _reactCookie = __webpack_require__(112);

var _reactCookie2 = _interopRequireDefault(_reactCookie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var keepOnline = function keepOnline() {
	if (_reactCookie2.default.load('token')) {
		(0, _isomorphicFetch2.default)(__API__.keepOnline, {
			method: 'GET',
			credentials: 'include'
		}).then(function (data) {
			return data.json();
		}).then(function (data) {
			if (data.error) {
				_reactCookie2.default.remove('token', {
					path: '/'
				});
				location.reload();
			}
		}).catch(function (err) {
			console.log(err);
		});
	}
};

exports.default = keepOnline;

/***/ }),

/***/ 278:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _app = __webpack_require__(266);

var _app2 = _interopRequireDefault(_app);

var _keepOnline = __webpack_require__(277);

var _keepOnline2 = _interopRequireDefault(_keepOnline);

var _dataMark = __webpack_require__(113);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var creatRouterConfig = function creatRouterConfig(store) {
	return {
		path: "/",
		component: _app2.default,
		indexRoute: {
			getComponent: function getComponent(nextState, cb) {
				__webpack_require__.e/* require.ensure */(0).then((function (require) {
					// var indexCover = require('./components/indexCover.js').default
					var renderPage = __webpack_require__(265).default;
					var page = renderPage('index');
					var updateReducer = __webpack_require__(32).updateReducer;
					updateReducer(store);
					cb(null, page);
				}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
			},

			onEnter: function onEnter() {
				console.log(store);
				(0, _keepOnline2.default)();
				store.dispatch((0, _dataMark.toggleMark)(true));
			}
		},
		childRoutes: [{
			path: '/article',
			getComponent: function getComponent(nextState, cb) {
				__webpack_require__.e/* require.ensure */(0/* duplicate */).then((function (require) {
					// var article = require('./components/article/highorder-article.js').default
					var renderPage = __webpack_require__(265).default;
					var page = renderPage('article');
					var updateReducer = __webpack_require__(32).updateReducer;
					updateReducer(store);
					cb(null, page);
				}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
			},

			onEnter: function onEnter() {
				(0, _keepOnline2.default)();
				store.dispatch((0, _dataMark.toggleMark)(true));
			}
		}, {
			path: '/register',
			getComponent: function getComponent(nextState, cb) {
				__webpack_require__.e/* require.ensure */(6).then((function (require) {
					var register = __webpack_require__(640).default;
					var updateReducer = __webpack_require__(32).updateReducer;
					updateReducer(store);
					cb(null, register);
				}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
			},

			onEnter: function onEnter() {
				(0, _keepOnline2.default)();
				store.dispatch((0, _dataMark.toggleMark)(true));
			}
		}, {
			path: '/about',
			getComponent: function getComponent(nextState, cb) {
				__webpack_require__.e/* require.ensure */(5).then((function (require) {
					var about = __webpack_require__(636).default;
					cb(null, about);
				}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
			},

			onEnter: function onEnter() {
				(0, _keepOnline2.default)();
				store.dispatch((0, _dataMark.toggleMark)(true));
			}
		}, {
			path: '/edit',
			getComponent: function getComponent(nextState, cb) {
				__webpack_require__.e/* require.ensure */(3).then((function (require) {
					var edit = __webpack_require__(638).default;
					var updateReducer = __webpack_require__(32).updateReducer;
					updateReducer(store);
					cb(null, edit);
				}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
			},

			onEnter: function onEnter() {
				(0, _keepOnline2.default)();
				store.dispatch((0, _dataMark.toggleMark)(true));
			}
		}, {
			path: '/slucky',
			getComponent: function getComponent(nextState, cb) {
				__webpack_require__.e/* require.ensure */(4).then((function (require) {
					var slucky = __webpack_require__(641).default;
					cb(null, slucky);
				}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
			},

			onEnter: function onEnter() {
				(0, _keepOnline2.default)();
				store.dispatch((0, _dataMark.toggleMark)(true));
			}
		}, {
			path: '/dnd',
			getComponent: function getComponent(nextState, cb) {
				__webpack_require__.e/* require.ensure */(1).then((function (require) {
					var dnd = __webpack_require__(639).default;
					var updateReducer = __webpack_require__(32).updateReducer;
					updateReducer(store);
					cb(null, dnd);
				}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
			},

			onEnter: function onEnter() {
				(0, _keepOnline2.default)();
				store.dispatch((0, _dataMark.toggleMark)(true));
			}
		}, {
			path: '/:id',
			getComponent: function getComponent(nextState, cb) {
				__webpack_require__.e/* require.ensure */(2).then((function (require) {
					var articleDetail = __webpack_require__(637).default;
					var updateReducer = __webpack_require__(32).updateReducer;
					updateReducer(store);
					cb(null, articleDetail);
				}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
			},

			onEnter: function onEnter() {
				(0, _keepOnline2.default)();
				store.dispatch((0, _dataMark.toggleMark)(true));
			}
		}]
	};
}; // import TodoList from './components/todoList/highorder-todoList.js'
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
exports.default = creatRouterConfig;

/***/ }),

/***/ 280:
/***/ (function(module, exports) {


module.exports = function chain(){
  var len = arguments.length
  var args = [];

  for (var i = 0; i < len; i++)
    args[i] = arguments[i]

  args = args.filter(function(fn){ return fn != null })

  if (args.length === 0) return undefined
  if (args.length === 1) return args[0]

  return args.reduce(function(current, next){
    return function chainedFunction() {
      current.apply(this, arguments);
      next.apply(this, arguments);
    };
  })
}


/***/ }),

/***/ 281:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module exports.
 * @public
 */

exports.parse = parse;
exports.serialize = serialize;

/**
 * Module variables.
 * @private
 */

var decode = decodeURIComponent;
var encode = encodeURIComponent;
var pairSplitRegExp = /; */;

/**
 * RegExp to match field-content in RFC 7230 sec 3.2
 *
 * field-content = field-vchar [ 1*( SP / HTAB ) field-vchar ]
 * field-vchar   = VCHAR / obs-text
 * obs-text      = %x80-FF
 */

var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;

/**
 * Parse a cookie header.
 *
 * Parse the given cookie header string into an object
 * The object has the various cookies as keys(names) => values
 *
 * @param {string} str
 * @param {object} [options]
 * @return {object}
 * @public
 */

function parse(str, options) {
  if (typeof str !== 'string') {
    throw new TypeError('argument str must be a string');
  }

  var obj = {}
  var opt = options || {};
  var pairs = str.split(pairSplitRegExp);
  var dec = opt.decode || decode;

  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i];
    var eq_idx = pair.indexOf('=');

    // skip things that don't look like key=value
    if (eq_idx < 0) {
      continue;
    }

    var key = pair.substr(0, eq_idx).trim()
    var val = pair.substr(++eq_idx, pair.length).trim();

    // quoted values
    if ('"' == val[0]) {
      val = val.slice(1, -1);
    }

    // only assign once
    if (undefined == obj[key]) {
      obj[key] = tryDecode(val, dec);
    }
  }

  return obj;
}

/**
 * Serialize data into a cookie header.
 *
 * Serialize the a name value pair into a cookie string suitable for
 * http headers. An optional options object specified cookie parameters.
 *
 * serialize('foo', 'bar', { httpOnly: true })
 *   => "foo=bar; httpOnly"
 *
 * @param {string} name
 * @param {string} val
 * @param {object} [options]
 * @return {string}
 * @public
 */

function serialize(name, val, options) {
  var opt = options || {};
  var enc = opt.encode || encode;

  if (typeof enc !== 'function') {
    throw new TypeError('option encode is invalid');
  }

  if (!fieldContentRegExp.test(name)) {
    throw new TypeError('argument name is invalid');
  }

  var value = enc(val);

  if (value && !fieldContentRegExp.test(value)) {
    throw new TypeError('argument val is invalid');
  }

  var str = name + '=' + value;

  if (null != opt.maxAge) {
    var maxAge = opt.maxAge - 0;
    if (isNaN(maxAge)) throw new Error('maxAge should be a Number');
    str += '; Max-Age=' + Math.floor(maxAge);
  }

  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError('option domain is invalid');
    }

    str += '; Domain=' + opt.domain;
  }

  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError('option path is invalid');
    }

    str += '; Path=' + opt.path;
  }

  if (opt.expires) {
    if (typeof opt.expires.toUTCString !== 'function') {
      throw new TypeError('option expires is invalid');
    }

    str += '; Expires=' + opt.expires.toUTCString();
  }

  if (opt.httpOnly) {
    str += '; HttpOnly';
  }

  if (opt.secure) {
    str += '; Secure';
  }

  if (opt.sameSite) {
    var sameSite = typeof opt.sameSite === 'string'
      ? opt.sameSite.toLowerCase() : opt.sameSite;

    switch (sameSite) {
      case true:
        str += '; SameSite=Strict';
        break;
      case 'lax':
        str += '; SameSite=Lax';
        break;
      case 'strict':
        str += '; SameSite=Strict';
        break;
      default:
        throw new TypeError('option sameSite is invalid');
    }
  }

  return str;
}

/**
 * Try decoding a string using a decoding function.
 *
 * @param {string} str
 * @param {function} decode
 * @private
 */

function tryDecode(str, decode) {
  try {
    return decode(str);
  } catch (e) {
    return str;
  }
}


/***/ }),

/***/ 32:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.updateReducer = exports.getStore = exports.addReducer = undefined;

var _redux = __webpack_require__(110);

var _reduxThunk = __webpack_require__(171);

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reduxLogger = __webpack_require__(170);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reducers = {}; // export default todos


var addReducer = function addReducer(reducer) {
	reducers[reducer.name] = reducer;
	console.log(reducers);
};

var updateReducer = function updateReducer(store) {
	// console.log("RED")
	store.replaceReducer((0, _redux.combineReducers)(reducers));
};

var getStore = function getStore() {
	var reducerCollection = (0, _redux.combineReducers)(reducers);
	var loggerMiddleware = (0, _reduxLogger.createLogger)();
	var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || _redux.compose;
	return (0, _redux.createStore)(reducerCollection, /* preloadedState, */composeEnhancers((0, _redux.applyMiddleware)(_reduxThunk2.default, loggerMiddleware)));
};

exports.addReducer = addReducer;
exports.getStore = getStore;
exports.updateReducer = updateReducer;

/***/ }),

/***/ 482:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addClass;

var _hasClass = __webpack_require__(483);

var _hasClass2 = _interopRequireDefault(_hasClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addClass(element, className) {
  if (element.classList) element.classList.add(className);else if (!(0, _hasClass2.default)(element, className)) if (typeof element.className === 'string') element.className = element.className + ' ' + className;else element.setAttribute('class', (element.className && element.className.baseVal || '') + ' ' + className);
}
module.exports = exports['default'];

/***/ }),

/***/ 483:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hasClass;
function hasClass(element, className) {
  if (element.classList) return !!className && element.classList.contains(className);else return (" " + (element.className.baseVal || element.className) + " ").indexOf(" " + className + " ") !== -1;
}
module.exports = exports["default"];

/***/ }),

/***/ 484:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function replaceClassName(origClass, classToRemove) {
  return origClass.replace(new RegExp('(^|\\s)' + classToRemove + '(?:\\s|$)', 'g'), '$1').replace(/\s+/g, ' ').replace(/^\s*|\s*$/g, '');
}

module.exports = function removeClass(element, className) {
  if (element.classList) element.classList.remove(className);else if (typeof element.className === 'string') element.className = replaceClassName(element.className, className);else element.setAttribute('class', replaceClassName(element.className && element.className.baseVal || '', className));
};

/***/ }),

/***/ 485:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.animationEnd = exports.animationDelay = exports.animationTiming = exports.animationDuration = exports.animationName = exports.transitionEnd = exports.transitionDuration = exports.transitionDelay = exports.transitionTiming = exports.transitionProperty = exports.transform = undefined;

var _inDOM = __webpack_require__(209);

var _inDOM2 = _interopRequireDefault(_inDOM);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var transform = 'transform';
var prefix = void 0,
    transitionEnd = void 0,
    animationEnd = void 0;
var transitionProperty = void 0,
    transitionDuration = void 0,
    transitionTiming = void 0,
    transitionDelay = void 0;
var animationName = void 0,
    animationDuration = void 0,
    animationTiming = void 0,
    animationDelay = void 0;

if (_inDOM2.default) {
  var _getTransitionPropert = getTransitionProperties();

  prefix = _getTransitionPropert.prefix;
  exports.transitionEnd = transitionEnd = _getTransitionPropert.transitionEnd;
  exports.animationEnd = animationEnd = _getTransitionPropert.animationEnd;


  exports.transform = transform = prefix + '-' + transform;
  exports.transitionProperty = transitionProperty = prefix + '-transition-property';
  exports.transitionDuration = transitionDuration = prefix + '-transition-duration';
  exports.transitionDelay = transitionDelay = prefix + '-transition-delay';
  exports.transitionTiming = transitionTiming = prefix + '-transition-timing-function';

  exports.animationName = animationName = prefix + '-animation-name';
  exports.animationDuration = animationDuration = prefix + '-animation-duration';
  exports.animationTiming = animationTiming = prefix + '-animation-delay';
  exports.animationDelay = animationDelay = prefix + '-animation-timing-function';
}

exports.transform = transform;
exports.transitionProperty = transitionProperty;
exports.transitionTiming = transitionTiming;
exports.transitionDelay = transitionDelay;
exports.transitionDuration = transitionDuration;
exports.transitionEnd = transitionEnd;
exports.animationName = animationName;
exports.animationDuration = animationDuration;
exports.animationTiming = animationTiming;
exports.animationDelay = animationDelay;
exports.animationEnd = animationEnd;
exports.default = {
  transform: transform,
  end: transitionEnd,
  property: transitionProperty,
  timing: transitionTiming,
  delay: transitionDelay,
  duration: transitionDuration
};


function getTransitionProperties() {
  var style = document.createElement('div').style;

  var vendorMap = {
    O: function O(e) {
      return 'o' + e.toLowerCase();
    },
    Moz: function Moz(e) {
      return e.toLowerCase();
    },
    Webkit: function Webkit(e) {
      return 'webkit' + e;
    },
    ms: function ms(e) {
      return 'MS' + e;
    }
  };

  var vendors = Object.keys(vendorMap);

  var transitionEnd = void 0,
      animationEnd = void 0;
  var prefix = '';

  for (var i = 0; i < vendors.length; i++) {
    var vendor = vendors[i];

    if (vendor + 'TransitionProperty' in style) {
      prefix = '-' + vendor.toLowerCase();
      transitionEnd = vendorMap[vendor]('TransitionEnd');
      animationEnd = vendorMap[vendor]('AnimationEnd');
      break;
    }
  }

  if (!transitionEnd && 'transitionProperty' in style) transitionEnd = 'transitionend';

  if (!animationEnd && 'animationName' in style) animationEnd = 'animationend';

  style = null;

  return { animationEnd: animationEnd, transitionEnd: transitionEnd, prefix: prefix };
}

/***/ }),

/***/ 486:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _inDOM = __webpack_require__(209);

var _inDOM2 = _interopRequireDefault(_inDOM);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var vendors = ['', 'webkit', 'moz', 'o', 'ms'];
var cancel = 'clearTimeout';
var raf = fallback;
var compatRaf = void 0;

var getKey = function getKey(vendor, k) {
  return vendor + (!vendor ? k : k[0].toUpperCase() + k.substr(1)) + 'AnimationFrame';
};

if (_inDOM2.default) {
  vendors.some(function (vendor) {
    var rafKey = getKey(vendor, 'request');

    if (rafKey in window) {
      cancel = getKey(vendor, 'cancel');
      return raf = function raf(cb) {
        return window[rafKey](cb);
      };
    }
  });
}

/* https://github.com/component/raf */
var prev = new Date().getTime();
function fallback(fn) {
  var curr = new Date().getTime(),
      ms = Math.max(0, 16 - (curr - prev)),
      req = setTimeout(fn, ms);

  prev = curr;
  return req;
}

compatRaf = function compatRaf(cb) {
  return raf(cb);
};
compatRaf.cancel = function (id) {
  window[cancel] && typeof window[cancel] === 'function' && window[cancel](id);
};
exports.default = compatRaf;
module.exports = exports['default'];

/***/ }),

/***/ 487:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 488:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 489:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 490:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 509:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {// Coding standard for this project defined @ https://github.com/MatthewSH/standards/blob/master/JavaScript.md


exports = module.exports = !!(typeof process !== 'undefined' && process.versions && process.versions.node);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(147)))

/***/ }),

/***/ 610:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(16);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _TransitionGroup = __webpack_require__(612);

var _TransitionGroup2 = _interopRequireDefault(_TransitionGroup);

var _CSSTransitionGroupChild = __webpack_require__(611);

var _CSSTransitionGroupChild2 = _interopRequireDefault(_CSSTransitionGroupChild);

var _PropTypes = __webpack_require__(253);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  transitionName: _PropTypes.nameShape.isRequired,

  transitionAppear: _propTypes2.default.bool,
  transitionEnter: _propTypes2.default.bool,
  transitionLeave: _propTypes2.default.bool,
  transitionAppearTimeout: (0, _PropTypes.transitionTimeout)('Appear'),
  transitionEnterTimeout: (0, _PropTypes.transitionTimeout)('Enter'),
  transitionLeaveTimeout: (0, _PropTypes.transitionTimeout)('Leave')
};

var defaultProps = {
  transitionAppear: false,
  transitionEnter: true,
  transitionLeave: true
};

var CSSTransitionGroup = function (_React$Component) {
  _inherits(CSSTransitionGroup, _React$Component);

  function CSSTransitionGroup() {
    var _temp, _this, _ret;

    _classCallCheck(this, CSSTransitionGroup);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this._wrapChild = function (child) {
      return _react2.default.createElement(_CSSTransitionGroupChild2.default, {
        name: _this.props.transitionName,
        appear: _this.props.transitionAppear,
        enter: _this.props.transitionEnter,
        leave: _this.props.transitionLeave,
        appearTimeout: _this.props.transitionAppearTimeout,
        enterTimeout: _this.props.transitionEnterTimeout,
        leaveTimeout: _this.props.transitionLeaveTimeout
      }, child);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  // We need to provide this childFactory so that
  // ReactCSSTransitionGroupChild can receive updates to name, enter, and
  // leave while it is leaving.


  CSSTransitionGroup.prototype.render = function render() {
    return _react2.default.createElement(_TransitionGroup2.default, _extends({}, this.props, { childFactory: this._wrapChild }));
  };

  return CSSTransitionGroup;
}(_react2.default.Component);

CSSTransitionGroup.displayName = 'CSSTransitionGroup';


CSSTransitionGroup.propTypes =  false ? propTypes : {};
CSSTransitionGroup.defaultProps = defaultProps;

exports.default = CSSTransitionGroup;
module.exports = exports['default'];

/***/ }),

/***/ 611:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _addClass = __webpack_require__(482);

var _addClass2 = _interopRequireDefault(_addClass);

var _removeClass = __webpack_require__(484);

var _removeClass2 = _interopRequireDefault(_removeClass);

var _requestAnimationFrame = __webpack_require__(486);

var _requestAnimationFrame2 = _interopRequireDefault(_requestAnimationFrame);

var _properties = __webpack_require__(485);

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(16);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = __webpack_require__(109);

var _PropTypes = __webpack_require__(253);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var events = [];
if (_properties.transitionEnd) events.push(_properties.transitionEnd);
if (_properties.animationEnd) events.push(_properties.animationEnd);

function addEndListener(node, listener) {
  if (events.length) {
    events.forEach(function (e) {
      return node.addEventListener(e, listener, false);
    });
  } else {
    setTimeout(listener, 0);
  }

  return function () {
    if (!events.length) return;
    events.forEach(function (e) {
      return node.removeEventListener(e, listener, false);
    });
  };
}

var propTypes = {
  children: _propTypes2.default.node,
  name: _PropTypes.nameShape.isRequired,

  // Once we require timeouts to be specified, we can remove the
  // boolean flags (appear etc.) and just accept a number
  // or a bool for the timeout flags (appearTimeout etc.)
  appear: _propTypes2.default.bool,
  enter: _propTypes2.default.bool,
  leave: _propTypes2.default.bool,
  appearTimeout: _propTypes2.default.number,
  enterTimeout: _propTypes2.default.number,
  leaveTimeout: _propTypes2.default.number
};

var CSSTransitionGroupChild = function (_React$Component) {
  _inherits(CSSTransitionGroupChild, _React$Component);

  function CSSTransitionGroupChild() {
    var _temp, _this, _ret;

    _classCallCheck(this, CSSTransitionGroupChild);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.componentWillAppear = function (done) {
      if (_this.props.appear) {
        _this.transition('appear', done, _this.props.appearTimeout);
      } else {
        done();
      }
    }, _this.componentWillEnter = function (done) {
      if (_this.props.enter) {
        _this.transition('enter', done, _this.props.enterTimeout);
      } else {
        done();
      }
    }, _this.componentWillLeave = function (done) {
      if (_this.props.leave) {
        _this.transition('leave', done, _this.props.leaveTimeout);
      } else {
        done();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  CSSTransitionGroupChild.prototype.componentWillMount = function componentWillMount() {
    this.classNameAndNodeQueue = [];
    this.transitionTimeouts = [];
  };

  CSSTransitionGroupChild.prototype.componentWillUnmount = function componentWillUnmount() {
    this.unmounted = true;

    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.transitionTimeouts.forEach(function (timeout) {
      clearTimeout(timeout);
    });

    this.classNameAndNodeQueue.length = 0;
  };

  CSSTransitionGroupChild.prototype.transition = function transition(animationType, finishCallback, timeout) {
    var node = (0, _reactDom.findDOMNode)(this);

    if (!node) {
      if (finishCallback) {
        finishCallback();
      }
      return;
    }

    var className = this.props.name[animationType] || this.props.name + '-' + animationType;
    var activeClassName = this.props.name[animationType + 'Active'] || className + '-active';
    var timer = null;
    var removeListeners = void 0;

    (0, _addClass2.default)(node, className);

    // Need to do this to actually trigger a transition.
    this.queueClassAndNode(activeClassName, node);

    // Clean-up the animation after the specified delay
    var finish = function finish(e) {
      if (e && e.target !== node) {
        return;
      }

      clearTimeout(timer);
      if (removeListeners) removeListeners();

      (0, _removeClass2.default)(node, className);
      (0, _removeClass2.default)(node, activeClassName);

      if (removeListeners) removeListeners();

      // Usually this optional callback is used for informing an owner of
      // a leave animation and telling it to remove the child.
      if (finishCallback) {
        finishCallback();
      }
    };

    if (timeout) {
      timer = setTimeout(finish, timeout);
      this.transitionTimeouts.push(timer);
    } else if (_properties.transitionEnd) {
      removeListeners = addEndListener(node, finish);
    }
  };

  CSSTransitionGroupChild.prototype.queueClassAndNode = function queueClassAndNode(className, node) {
    var _this2 = this;

    this.classNameAndNodeQueue.push({
      className: className,
      node: node
    });

    if (!this.rafHandle) {
      this.rafHandle = (0, _requestAnimationFrame2.default)(function () {
        return _this2.flushClassNameAndNodeQueue();
      });
    }
  };

  CSSTransitionGroupChild.prototype.flushClassNameAndNodeQueue = function flushClassNameAndNodeQueue() {
    if (!this.unmounted) {
      this.classNameAndNodeQueue.forEach(function (obj) {
        // This is for to force a repaint,
        // which is necessary in order to transition styles when adding a class name.
        /* eslint-disable no-unused-expressions */
        obj.node.scrollTop;
        /* eslint-enable no-unused-expressions */
        (0, _addClass2.default)(obj.node, obj.className);
      });
    }
    this.classNameAndNodeQueue.length = 0;
    this.rafHandle = null;
  };

  CSSTransitionGroupChild.prototype.render = function render() {
    var props = _extends({}, this.props);
    delete props.name;
    delete props.appear;
    delete props.enter;
    delete props.leave;
    delete props.appearTimeout;
    delete props.enterTimeout;
    delete props.leaveTimeout;
    delete props.children;
    return _react2.default.cloneElement(_react2.default.Children.only(this.props.children), props);
  };

  return CSSTransitionGroupChild;
}(_react2.default.Component);

CSSTransitionGroupChild.displayName = 'CSSTransitionGroupChild';


CSSTransitionGroupChild.propTypes =  false ? propTypes : {};

exports.default = CSSTransitionGroupChild;
module.exports = exports['default'];

/***/ }),

/***/ 612:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _chainFunction = __webpack_require__(280);

var _chainFunction2 = _interopRequireDefault(_chainFunction);

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(16);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _warning = __webpack_require__(45);

var _warning2 = _interopRequireDefault(_warning);

var _ChildMapping = __webpack_require__(613);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  component: _propTypes2.default.any,
  childFactory: _propTypes2.default.func,
  children: _propTypes2.default.node
};

var defaultProps = {
  component: 'span',
  childFactory: function childFactory(child) {
    return child;
  }
};

var TransitionGroup = function (_React$Component) {
  _inherits(TransitionGroup, _React$Component);

  function TransitionGroup(props, context) {
    _classCallCheck(this, TransitionGroup);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

    _this.performAppear = function (key, component) {
      _this.currentlyTransitioningKeys[key] = true;

      if (component.componentWillAppear) {
        component.componentWillAppear(_this._handleDoneAppearing.bind(_this, key, component));
      } else {
        _this._handleDoneAppearing(key, component);
      }
    };

    _this._handleDoneAppearing = function (key, component) {
      if (component.componentDidAppear) {
        component.componentDidAppear();
      }

      delete _this.currentlyTransitioningKeys[key];

      var currentChildMapping = (0, _ChildMapping.getChildMapping)(_this.props.children);

      if (!currentChildMapping || !currentChildMapping.hasOwnProperty(key)) {
        // This was removed before it had fully appeared. Remove it.
        _this.performLeave(key, component);
      }
    };

    _this.performEnter = function (key, component) {
      _this.currentlyTransitioningKeys[key] = true;

      if (component.componentWillEnter) {
        component.componentWillEnter(_this._handleDoneEntering.bind(_this, key, component));
      } else {
        _this._handleDoneEntering(key, component);
      }
    };

    _this._handleDoneEntering = function (key, component) {
      if (component.componentDidEnter) {
        component.componentDidEnter();
      }

      delete _this.currentlyTransitioningKeys[key];

      var currentChildMapping = (0, _ChildMapping.getChildMapping)(_this.props.children);

      if (!currentChildMapping || !currentChildMapping.hasOwnProperty(key)) {
        // This was removed before it had fully entered. Remove it.
        _this.performLeave(key, component);
      }
    };

    _this.performLeave = function (key, component) {
      _this.currentlyTransitioningKeys[key] = true;

      if (component.componentWillLeave) {
        component.componentWillLeave(_this._handleDoneLeaving.bind(_this, key, component));
      } else {
        // Note that this is somewhat dangerous b/c it calls setState()
        // again, effectively mutating the component before all the work
        // is done.
        _this._handleDoneLeaving(key, component);
      }
    };

    _this._handleDoneLeaving = function (key, component) {
      if (component.componentDidLeave) {
        component.componentDidLeave();
      }

      delete _this.currentlyTransitioningKeys[key];

      var currentChildMapping = (0, _ChildMapping.getChildMapping)(_this.props.children);

      if (currentChildMapping && currentChildMapping.hasOwnProperty(key)) {
        // This entered again before it fully left. Add it again.
        _this.keysToEnter.push(key);
      } else {
        _this.setState(function (state) {
          var newChildren = _extends({}, state.children);
          delete newChildren[key];
          return { children: newChildren };
        });
      }
    };

    _this.childRefs = Object.create(null);

    _this.state = {
      children: (0, _ChildMapping.getChildMapping)(props.children)
    };
    return _this;
  }

  TransitionGroup.prototype.componentWillMount = function componentWillMount() {
    this.currentlyTransitioningKeys = {};
    this.keysToEnter = [];
    this.keysToLeave = [];
  };

  TransitionGroup.prototype.componentDidMount = function componentDidMount() {
    var initialChildMapping = this.state.children;
    for (var key in initialChildMapping) {
      if (initialChildMapping[key]) {
        this.performAppear(key, this.childRefs[key]);
      }
    }
  };

  TransitionGroup.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var nextChildMapping = (0, _ChildMapping.getChildMapping)(nextProps.children);
    var prevChildMapping = this.state.children;

    this.setState({
      children: (0, _ChildMapping.mergeChildMappings)(prevChildMapping, nextChildMapping)
    });

    for (var key in nextChildMapping) {
      var hasPrev = prevChildMapping && prevChildMapping.hasOwnProperty(key);
      if (nextChildMapping[key] && !hasPrev && !this.currentlyTransitioningKeys[key]) {
        this.keysToEnter.push(key);
      }
    }

    for (var _key in prevChildMapping) {
      var hasNext = nextChildMapping && nextChildMapping.hasOwnProperty(_key);
      if (prevChildMapping[_key] && !hasNext && !this.currentlyTransitioningKeys[_key]) {
        this.keysToLeave.push(_key);
      }
    }

    // If we want to someday check for reordering, we could do it here.
  };

  TransitionGroup.prototype.componentDidUpdate = function componentDidUpdate() {
    var _this2 = this;

    var keysToEnter = this.keysToEnter;
    this.keysToEnter = [];
    keysToEnter.forEach(function (key) {
      return _this2.performEnter(key, _this2.childRefs[key]);
    });

    var keysToLeave = this.keysToLeave;
    this.keysToLeave = [];
    keysToLeave.forEach(function (key) {
      return _this2.performLeave(key, _this2.childRefs[key]);
    });
  };

  TransitionGroup.prototype.render = function render() {
    var _this3 = this;

    // TODO: we could get rid of the need for the wrapper node
    // by cloning a single child
    var childrenToRender = [];

    var _loop = function _loop(key) {
      var child = _this3.state.children[key];
      if (child) {
        var isCallbackRef = typeof child.ref !== 'string';
        var factoryChild = _this3.props.childFactory(child);
        var ref = function ref(r) {
          _this3.childRefs[key] = r;
        };

         false ? (0, _warning2.default)(isCallbackRef, 'string refs are not supported on children of TransitionGroup and will be ignored. ' + 'Please use a callback ref instead: https://facebook.github.io/react/docs/refs-and-the-dom.html#the-ref-callback-attribute') : void 0;

        // Always chaining the refs leads to problems when the childFactory
        // wraps the child. The child ref callback gets called twice with the
        // wrapper and the child. So we only need to chain the ref if the
        // factoryChild is not different from child.
        if (factoryChild === child && isCallbackRef) {
          ref = (0, _chainFunction2.default)(child.ref, ref);
        }

        // You may need to apply reactive updates to a child as it is leaving.
        // The normal React way to do it won't work since the child will have
        // already been removed. In case you need this behavior you can provide
        // a childFactory function to wrap every child, even the ones that are
        // leaving.
        childrenToRender.push(_react2.default.cloneElement(factoryChild, {
          key: key,
          ref: ref
        }));
      }
    };

    for (var key in this.state.children) {
      _loop(key);
    }

    // Do not forward TransitionGroup props to primitive DOM nodes
    var props = _extends({}, this.props);
    delete props.transitionLeave;
    delete props.transitionName;
    delete props.transitionAppear;
    delete props.transitionEnter;
    delete props.childFactory;
    delete props.transitionLeaveTimeout;
    delete props.transitionEnterTimeout;
    delete props.transitionAppearTimeout;
    delete props.component;

    return _react2.default.createElement(this.props.component, props, childrenToRender);
  };

  return TransitionGroup;
}(_react2.default.Component);

TransitionGroup.displayName = 'TransitionGroup';


TransitionGroup.propTypes =  false ? propTypes : {};
TransitionGroup.defaultProps = defaultProps;

exports.default = TransitionGroup;
module.exports = exports['default'];

/***/ }),

/***/ 613:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.getChildMapping = getChildMapping;
exports.mergeChildMappings = mergeChildMappings;

var _react = __webpack_require__(8);

/**
 * Given `this.props.children`, return an object mapping key to child.
 *
 * @param {*} children `this.props.children`
 * @return {object} Mapping of key to child
 */
function getChildMapping(children) {
  if (!children) {
    return children;
  }
  var result = {};
  _react.Children.map(children, function (child) {
    return child;
  }).forEach(function (child) {
    result[child.key] = child;
  });
  return result;
}

/**
 * When you're adding or removing children some may be added or removed in the
 * same render pass. We want to show *both* since we want to simultaneously
 * animate elements in and out. This function takes a previous set of keys
 * and a new set of keys and merges them with its best guess of the correct
 * ordering. In the future we may expose some of the utilities in
 * ReactMultiChild to make this easy, but for now React itself does not
 * directly have this concept of the union of prevChildren and nextChildren
 * so we implement it here.
 *
 * @param {object} prev prev children as returned from
 * `ReactTransitionChildMapping.getChildMapping()`.
 * @param {object} next next children as returned from
 * `ReactTransitionChildMapping.getChildMapping()`.
 * @return {object} a key set that contains all keys in `prev` and all keys
 * in `next` in a reasonable order.
 */
function mergeChildMappings(prev, next) {
  prev = prev || {};
  next = next || {};

  function getValueForKey(key) {
    if (next.hasOwnProperty(key)) {
      return next[key];
    }

    return prev[key];
  }

  // For each key of `next`, the list of keys to insert before that key in
  // the combined list
  var nextKeysPending = {};

  var pendingKeys = [];
  for (var prevKey in prev) {
    if (next.hasOwnProperty(prevKey)) {
      if (pendingKeys.length) {
        nextKeysPending[prevKey] = pendingKeys;
        pendingKeys = [];
      }
    } else {
      pendingKeys.push(prevKey);
    }
  }

  var i = void 0;
  var childMapping = {};
  for (var nextKey in next) {
    if (nextKeysPending.hasOwnProperty(nextKey)) {
      for (i = 0; i < nextKeysPending[nextKey].length; i++) {
        var pendingNextKey = nextKeysPending[nextKey][i];
        childMapping[nextKeysPending[nextKey][i]] = getValueForKey(pendingNextKey);
      }
    }
    childMapping[nextKey] = getValueForKey(nextKey);
  }

  // Finally, add the keys which didn't appear before any key in `next`
  for (i = 0; i < pendingKeys.length; i++) {
    childMapping[pendingKeys[i]] = getValueForKey(pendingKeys[i]);
  }

  return childMapping;
}

/***/ }),

/***/ 634:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(262);


/***/ })

},[634]);
//# sourceMappingURL=bundle.js.map