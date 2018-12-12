webpackJsonp([6],{

/***/ 640:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _reactRedux = __webpack_require__(46);

var _displayRegister = __webpack_require__(700);

var _displayRegister2 = _interopRequireDefault(_displayRegister);

var _dataRegister = __webpack_require__(699);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state) {
	return {};
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	return {
		handleVerifyCodeSend: function handleVerifyCodeSend(email) {
			return dispatch((0, _dataRegister.verifyEmail)({
				email: email
			}));
		},
		registerConfirm: function registerConfirm(data) {
			return dispatch((0, _dataRegister.register)(data));
		}
	};
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_displayRegister2.default);

/***/ }),

/***/ 698:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
// var data = {
// 	name: test,
// 	pw: 123,
// 	email: "asd@qq.com"
// }

// vaildator.config = {
// 	name: ['isNum'],
// 	pw: ['isPw'],
// 	email: ['isEmail']
// }

// validator.validate(data)

var validator = {
	config: {},
	types: {},
	result: {},
	data: {},
	getConfig: function getConfig() {
		return this.config;
	},
	validate: function validate(data) {
		console.log(data);
		console.log(this.config);
		this.data = data;
		this.result = {};
		for (var x in data) {
			if (data.hasOwnProperty(x)) {
				var val = data[x];
				var res = this.validateOne(x, val);
				if (res) {
					this.result[x] = res;
				}
			}
		}
		console.log(this.result);
		return this.result;
	},
	validateOne: function validateOne(x, val) {
		var checkerList = this.config[x];
		if (!checkerList) {
			return false;
		}
		var result = {
			key: x,
			isValid: true,
			message: []

			// 遍历检查器
		};checkerList.map(function (name, index) {
			var checker = this.types[name].validate;

			// 只处理非法的情况
			if (!checker.call(this, val)) {
				var instruction = this.types[name].instruction;
				result.isValid = false;
				result.message.push(instruction);
			}
		}.bind(this));
		return result;
	},
	// 最终验证
	isSubmit: function isSubmit() {
		for (var x in this.config) {
			if (this.result[x] == undefined || !this.result[x].isValid) return false;
		}
		return true;
	}
	// 检查处理器
};validator.types.isEmpty = {
	validate: function validate(value) {
		return value !== "";
	},
	instruction: "不能为空"
};

validator.types.isName = {
	validate: function validate(value) {
		return (/^[\u4E00-\u9FA5A-Za-z0-9_]{1,10}$/.test(value)
		);
	},
	instruction: "十个字以内，不能包含特殊字符"
};

validator.types.isEmail = {
	validate: function validate(value) {
		return (/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)
		);
	},
	instruction: "邮箱格式不正确"
};

validator.types.isPw = {
	validate: function validate(value) {
		return (/^[!@#$%^&*_A-Za-z0-9]{8,15}$/.test(value)
		);
	},
	instruction: "由数组，字母，_@#$等组成，不少于8位"
};

validator.types.isPwAgain = {
	validate: function validate(value) {
		console.log(this);
		if (this.data.password) return this.data.password == value;else return false;
	},
	instruction: "重复输入的密码不相同"
};

validator.types.isValidString = {
	validate: function validate(value) {
		return !isNaN(value);
	},
	instruction: "invail Number value"
};

exports.default = validator;

// {
// 	name: {
// 		key: name,
// 		isValid: true,
// 		message: []
// 	}
// }

/***/ }),

/***/ 699:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.register = exports.verifyEmail = undefined;

var _isomorphicFetch = __webpack_require__(85);

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _dataMessage = __webpack_require__(263);

var _store = __webpack_require__(32);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var verifyEmailSuccess = function verifyEmailSuccess(data) {
	return {
		type: "VERIFY_EMAIL_SUCCESS",
		info: data
	};
}; // let state = {
// 	verifyEmail: "",
// 	info: ""
// }


var registerSuccess = function registerSuccess(data) {
	return {
		type: "REGISTER_SUCCESS",
		info: data
	};
};

var verifyEmail = exports.verifyEmail = function verifyEmail(data) {
	return function (dispatch) {
		dispatch((0, _dataMessage.pushInQueue)({
			info: "邮件发送中",
			flag: "hint"
		}));
		(0, _isomorphicFetch2.default)(__API__.postVerifyEmail, {
			method: 'POST',
			credentials: "include",
			body: JSON.stringify(data)
		}).then(function (data) {
			return data.json();
		}).then(function (data) {
			console.log(data);
			if (data.error) {
				dispatch((0, _dataMessage.pushInQueue)({
					info: "请确认邮箱是否正确或请查看邮箱里的验证码",
					flag: "hint"
				}));
			} else {
				dispatch(verifyEmailSuccess(data));
				dispatch((0, _dataMessage.pushInQueue)({
					info: "发送成功，请查看邮箱里的验证码",
					flag: "success"
				}));
			}
		}).catch(function (err) {
			if (err) throw err;
			dispatch((0, _dataMessage.pushInQueue)({
				info: "请网络检查网络连接",
				flag: "warning"
			}));
		});
	};
};

var register = exports.register = function register(data) {
	console.log("REGISTER");
	console.log(data);
	return function (dispatch) {
		return (0, _isomorphicFetch2.default)(__API__.postRegister, {
			method: 'POST',
			credentials: "include",
			body: JSON.stringify(data)
		}).then(function (data) {
			return data.json();
		}).then(function (data) {
			console.log(data);
			if (data.error) {
				dispatch((0, _dataMessage.pushInQueue)({
					info: data.error,
					flag: "hint"
				}));
			} else {
				dispatch(registerSuccess(data));
				dispatch((0, _dataMessage.pushInQueue)({
					info: "恭喜，注册成功",
					flag: "success"
				}));

				// window.location.href = "http://www.brandf.cn/"
			}
		}).catch(function (err) {
			if (err) throw err;
			dispatch((0, _dataMessage.pushInQueue)({
				info: "请网络检查网络连接",
				flag: "warning"
			}));
		});
	};
};

var registerReducer = function registerReducer() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var action = arguments[1];

	switch (action.type) {
		case "VERIFY_EMAIL_SUCCESS":
			return Object.assign({}, state, {
				info: action.info
			});
		case "REGISTER_SUCCESS":
			return Object.assign({}, state, {
				info: action.info
			});
		default:
			return state;
	}
};

(0, _store.addReducer)(registerReducer);

/***/ }),

/***/ 700:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _validator = __webpack_require__(698);

var _validator2 = _interopRequireDefault(_validator);

var _displayValidInput = __webpack_require__(701);

var _displayValidInput2 = _interopRequireDefault(_displayValidInput);

var _displayValidSearchInput = __webpack_require__(702);

var _displayValidSearchInput2 = _interopRequireDefault(_displayValidSearchInput);

var _reactAddonsCssTransitionGroup = __webpack_require__(111);

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Register = function (_Component) {
	_inherits(Register, _Component);

	function Register(props) {
		_classCallCheck(this, Register);

		var _this = _possibleConstructorReturn(this, (Register.__proto__ || Object.getPrototypeOf(Register)).call(this, props));

		_this.state = {
			data: {
				email: "",
				emailVerifyCode: "",
				name: "",
				password: "",
				passwordAgain: ""
			},
			result: {}
		};
		_validator2.default.config = {
			email: ['isEmpty', 'isEmail'],
			emailVerifyCode: ['isEmpty'],
			name: ['isName', 'isEmpty'],
			password: ['isEmpty', 'isPw'],
			passwordAgain: ['isEmpty', 'isPwAgain']
		};
		_this.registerConfirm = _this.props.registerConfirm.bind(_this);
		_this.handleVerifyCodeSend = _this.props.handleVerifyCodeSend.bind(_this);
		return _this;
	}

	_createClass(Register, [{
		key: 'handleInputChange',
		value: function handleInputChange(key, e) {
			var tar = this.state.data;
			tar[key] = e.target.value;
			this.setState({
				data: tar
			});
		}
	}, {
		key: 'handleFormConfirm',
		value: function handleFormConfirm(e) {
			e.preventDefault();
			var data = this.state.data;
			var result = _validator2.default.validate(data);
			this.setState({
				result: result
			});
			console.log(this.state.result);
			if (_validator2.default.isSubmit()) {
				this.registerConfirm(this.state.data);
			}
		}
	}, {
		key: 'handleEmailSend',
		value: function handleEmailSend() {
			var email = this.state.data.email;
			var res = _validator2.default.validateOne('email', email);
			this.setState({
				result: {
					email: res
				}
			});
			if (res.isValid) {
				this.handleVerifyCodeSend(email);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				{ className: 'register-container' },
				_react2.default.createElement('div', { className: 'register-mark' }),
				_react2.default.createElement(
					_reactAddonsCssTransitionGroup2.default,
					{
						transitionName: 'example',
						transitionAppear: true,
						transitionAppearTimeout: 500,
						transitionEnter: false,
						transitionLeave: false },
					_react2.default.createElement(
						'form',
						{ className: 'paper p16 register-item', key: 'registerForm' },
						_react2.default.createElement(
							'p',
							{ className: 'ta-c mb4 mt0' },
							_react2.default.createElement(
								'strong',
								null,
								'\u6CE8\u518C'
							)
						),
						_react2.default.createElement(_displayValidSearchInput2.default, { btnText: '\u53D1\u9001', handleInputChange: this.handleInputChange.bind(this, 'email'), handleBtnClick: this.handleEmailSend.bind(this), name: '\u90AE\u7BB1', placeholder: '\r \u5E38\u7528\u90AE\u7BB1', data: this.state.result['email'] }),
						_react2.default.createElement('br', null),
						_react2.default.createElement(_displayValidInput2.default, { handleInputChange: this.handleInputChange.bind(this, 'emailVerifyCode'), name: '\u9A8C\u8BC1\u7801', placeholder: '\r \u8F93\u5165\u90AE\u7BB1\u91CC\u7684\u9A8C\u8BC1\u7801', data: this.state.result['emailVerifyCode'] }),
						_react2.default.createElement('br', null),
						_react2.default.createElement(_displayValidInput2.default, { handleInputChange: this.handleInputChange.bind(this, 'name'), name: '\u6635\u79F0', placeholder: '\r \u4E0D\u80FD\u542B\u6709\u6807\u70B9', data: this.state.result['name'] }),
						_react2.default.createElement('br', null),
						_react2.default.createElement(_displayValidInput2.default, { handleInputChange: this.handleInputChange.bind(this, 'password'), name: '\u5BC6\u7801', placeholder: '\r \u7531\u6570\u7EC4\u6216\u5B57\u6BCD\u7EC4\u6210', data: this.state.result['password'] }),
						_react2.default.createElement('br', null),
						_react2.default.createElement(_displayValidInput2.default, { handleInputChange: this.handleInputChange.bind(this, 'passwordAgain'), name: '\u518D\u6B21\u786E\u8BA4\u5BC6\u7801', placeholder: '\r \u8981\u8DDF\u697C\u4E0A\u4E00\u6837', data: this.state.result['passwordAgain'] }),
						_react2.default.createElement('br', null),
						_react2.default.createElement(
							'div',
							{ className: 'ta-c ptb8' },
							_react2.default.createElement(
								'button',
								{ type: 'submit', className: 'btn btn-s btn-tp c-blue', onClick: this.handleFormConfirm.bind(this) },
								'\u786E\u8BA4'
							)
						)
					)
				)
			);
		}
	}]);

	return Register;
}(_react.Component);

exports.default = Register;

/***/ }),

/***/ 701:
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

var ValidInput = function (_Component) {
	_inherits(ValidInput, _Component);

	function ValidInput() {
		_classCallCheck(this, ValidInput);

		return _possibleConstructorReturn(this, (ValidInput.__proto__ || Object.getPrototypeOf(ValidInput)).apply(this, arguments));
	}

	_createClass(ValidInput, [{
		key: "handleValid",
		value: function handleValid(isValid, initial, trigger) {
			if (isValid || isValid === undefined) return initial;else return trigger;
		}
	}, {
		key: "render",
		value: function render() {
			var _props = this.props,
			    handleInputChange = _props.handleInputChange,
			    data = _props.data,
			    name = _props.name,
			    placeholder = _props.placeholder;

			return _react2.default.createElement(
				"div",
				{ className: "input pt8" },
				_react2.default.createElement(
					"label",
					{ htmlFor: name + "register", className: "fs12 c-grey" },
					name
				),
				_react2.default.createElement("br", null),
				_react2.default.createElement("input", { id: name + "register", onChange: handleInputChange, type: "text", className: "input-normal w288", placeholder: placeholder, maxLength: "32", style: this.handleValid(data.isValid, { 'borderColor': 'rgba(0, 0, 0, 0.12)' }, { 'borderColor': '#e74c3c' }), required: true }),
				_react2.default.createElement("br", null),
				_react2.default.createElement(
					"span",
					{ className: "input-ps fs12", style: this.handleValid(data.isValid, { 'opacity': '0' }, { 'opacity': '1' }) },
					data.message.map(function (str) {
						return str + " ";
					})
				)
			);
		}
	}]);

	return ValidInput;
}(_react.Component);

ValidInput.defaultProps = {
	data: {
		message: []
	}
};

exports.default = ValidInput;

/***/ }),

/***/ 702:
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

var validSearchInput = function (_Component) {
	_inherits(validSearchInput, _Component);

	function validSearchInput() {
		_classCallCheck(this, validSearchInput);

		return _possibleConstructorReturn(this, (validSearchInput.__proto__ || Object.getPrototypeOf(validSearchInput)).apply(this, arguments));
	}

	_createClass(validSearchInput, [{
		key: "handleValid",
		value: function handleValid(isValid, initial, trigger) {
			if (isValid || isValid === undefined) return initial;else return trigger;
		}
	}, {
		key: "render",
		value: function render() {
			var _props = this.props,
			    handleInputChange = _props.handleInputChange,
			    data = _props.data,
			    name = _props.name,
			    placeholder = _props.placeholder,
			    btnText = _props.btnText,
			    handleBtnClick = _props.handleBtnClick;

			return _react2.default.createElement(
				"div",
				{ className: "input" },
				_react2.default.createElement(
					"label",
					{ htmlFor: name + "register", className: "fs12 c-grey" },
					name
				),
				_react2.default.createElement("br", null),
				_react2.default.createElement(
					"div",
					{ className: "search-box-normalize p-r", style: this.handleValid(data.isValid, { 'borderColor': 'rgba(0, 0, 0, 0.12)' }, { 'borderColor': '#e74c3c' }) },
					_react2.default.createElement("input", { id: name + "register", onChange: handleInputChange, type: "email", className: "input input-normal w288", placeholder: placeholder, maxLength: "24", required: true }),
					_react2.default.createElement(
						"button",
						{ type: "button", className: "btn btn-m bg-blue c-text-w search-btn", onClick: handleBtnClick },
						btnText
					)
				),
				_react2.default.createElement("br", null),
				_react2.default.createElement(
					"span",
					{ className: "input-ps fs12", style: this.handleValid(data.isValid, { 'opacity': '0' }, { 'opacity': '1' }) },
					data.message.map(function (str) {
						return str + " ";
					})
				)
			);
		}
	}]);

	return validSearchInput;
}(_react.Component);

validSearchInput.defaultProps = {
	data: {
		message: []
	}
};

exports.default = validSearchInput;

/***/ })

});
//# sourceMappingURL=6.234b0fd4.chunk.js.map