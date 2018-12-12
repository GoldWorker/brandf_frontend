import React from 'react'
import Markdown from 'react-markdown'

const Slucky = (props) => {
    let mdButton = `
> 
	<button class="btn btn-s">Button-s</button>
    <button class="btn btn-m">Button-m</button>
    <button class="btn btn-l">Button-l</button>
    <button class="btn btn-tp">Button-l</button>
    <button class="btn btn-m btn-hollow ">btn-hollow</button>
    <button class="btn-round-s">
		<svg class="icon icon-test">
            <use xlink:href="#icon-test"></use>
        </svg>
    </button>
    <button class="btn-round-m">
        <svg class="icon icon-test">
            <use xlink:href="#icon-test"></use>
        </svg>
    </button>
    <div class="d-il w144">
        <button class="btn btn-full">btn-full</button>
    </div>
    <button class="btn btn-m btn-gif-wait">购买</button>
    <button class="btn btn-m btn-gif-bingo"></button>
	<div class="btn-group">
	<button class="btn btn-m">1</button>
        <button class="btn btn-m">2</button>
        <button class="btn btn-m">3</button>
        <button class="btn btn-m">...</button>
        <button class="btn btn-m">></button>
    </div>
	`
    let mdToast = `
>	
	<div class="toastlists-normalize-box">
        <div class="toastlist">
            <div class="shadow">
                <div class="bg-blue">Hint:how your are so petty</div>
            </div>
        </div>
        <div class="toastlist">
            <div class="shadow">
                <div class="bg-blue">Hint:how your are so</div>
            </div>
        </div>
        <div class="toastlist">
            <div class="shadow">
                <div class="bg-blue">Hint:how your are so petty</div>
            </div>
        </div>
    </div>
	`
    let mdImg = `
>	
	<div>
		<img src={require("../../images/bg_test.jpg")} alt="" class="img-rounded bg-tran"/>
		<img src={require("../../images/bg_test.jpg")} alt="" class="img-circle bg-tran"/>
		<img src={require("../../images/bg_test.jpg")} alt="" class="img-thumbnail"/>
	</div>
	`
    let mdInput = `
>
	<div class="checkbox-box-normalize">
        <input id="checkbox_normalize" type="checkbox" name="c_n">
        <span class="checkbox-hook ta-c"><span class="checkbox-hook-in fs12 op0 lh0">✓</span></span>
        <label for="checkbox_normalize" class="p-r z10">复选框A</label>
    </div>
    <div class="checkbox-box-normalize">
        <input id="checkbox_normalize1" type="checkbox" name="c_n1">
        <span class="checkbox-hook ta-c"><span class="checkbox-hook-in fs12 op0 lh0">✓</span></span>
        <label for="checkbox_normalize1" class="p-r z10">B</label>
    </div>
    <!-- imgstyle -->
    <p>imgstyle</p>
    <div class="checkbox-box-imgstyle mt16">
        <input id="c_i" type="checkbox" name="c_i" class="d-n">
        <label for="c_i" class="checkbox-imgstyle">
            <img src="./images/bg_test.jpg" alt="">
            <p class="m0">Title</p>
            <div class="checkbox-mark"><span>✓</span></div>
        </label>
    </div>
    <div className="checkbox-box-papertoggle w288 shadow">
		<input id="isSelectPackage" type="checkbox" className="d-n"/>
		<label htmlFor="isSelectPackage" className="checkbox-papertoggle flex-box">
		    <div className="checkbox-imgbox">
		        <img src={require("../../images/bg_test.jpg")} alt=""/>
		    </div>
		    <div className="flex1 lh16 pl16">
		        <p className="bor-b b-divider-b pb8 mb8">
		            TEST
		            <svg className="icon f-r">
		                <use xlinkHref="#icon-arrow-right"></use>
		            </svg>
		        </p>
		        <span className="c-hint-b fs12">亲子实惠，难得一夏。</span>
		    </div>
		    <div className="checkbox-mark">
		        <span>✓</span>
		        <p>已选择</p>
		    </div>
		</label>
	</div>

	<div className="switch-box-normalize">
	    <label htmlFor="switch-input" className="switch-mark-click"></label>
	    <input type="checkbox" defaultValue="1" id="switch-input"/>
	    <div>
	        <i className="switch-move"></i>
	        <span className="switch-horizon"></span>
	    </div>
	</div>

	<div className="radio-box-normalize">
	    <input id="isManagerPlant1" type="radio" name="managerPlant" className="d-n"/>
	    <div className="radio-out">
	        <i className="radio-in"></i>
	    </div>
	    <label htmlFor="isManagerPlant1">next</label>
	</div>
	<div className="radio-box-normalize">
	    <input id="isManagerPlant2" type="radio" name="managerPlant" className="d-n"/>
	    <div className="radio-out">
	        <i className="radio-in"></i>
	    </div>
	    <label htmlFor="isManagerPlant2">cancel</label>
	</div>

	<div className="input-count">
	    <div className="reduce c-cyan b-cyan">
	        <button>-</button>
	    </div>
	    <input type="text" defaultValue="0" id="adult" className="man-num"/>
	    <div className="plus c-cyan b-cyan">
	        <button>+</button>
	    </div>
	</div>

	<div className="select-box-normalize">
	    <i className="select-tri-t tri-t"></i>
	    <i className="select-tri-b tri-b"></i>
	    <label htmlFor="select" className="select-in"></label>
	    <select name="" id="select">
	        <option value="">qasd</option>
	        <option value="">qasd</option>
	    </select>
	</div>

	<textarea name="" id="" cols="30" rows="10" className="textarea"></textarea>

	<div className="range-box-mater">
	    <input type="range" className="w144" defaultValue="0" max="2" />
	</div>
	<div className="range-box-ios">
	    <input type="range" className="w144" defaultValue="0" max="2" />
	</div>
	`
    let mdForm = `
>
	<input type="text" name="user_name" id="user_name" class="input input-normal" maxlength="15" placeholder="输入你的姓名" autofocus required oninvalid="setCustomValidity('不能为空喔')" oninput="setCustomValidity('')">
	<input type="text" name="user_name" id="user_name" class="input-s input-normal" maxlength="15" placeholder="输入你的姓名" autofocus required oninvalid="setCustomValidity('不能为空喔')" oninput="setCustomValidity('')">
	<div class="input pt8">
		<label for="" class="fs12 c-grey">Name:</label>
		<br/>
		<input type="text" class="input-down" placeholder="Input your name" maxlength="15" required oninvalid="setCustomValidity('不能为空喔')" oninput="setCustomValidity('')">
		<br/>
		<span class="input-ps fs12">hint!</span>
	</div>

	<div class="fileup-container">
		<div class="fileup">
			<label for="input-file" class="fileup-in btn btn-m c-text-w bg-orange">点击选择</label>
			<input type="file" id="input-file">
        </div>
		<img src="" alt="">
	</div>

	<div class="search-box-normalize">
		<input type="text" class="input input-normal">
		<button class="btn btn-m bg-blue c-text-w">搜索</button>
	</div>
	`
    let mdMenu = `
>
	<nav class="nav shadow bg-blue c-text-w">
        <li class="nav-flag">
            <a href="#">asd</a>
            <svg class="icon icon-test">
                <use xlink:href="#icon-test"></use>
            </svg>
            <ul class="paper menu">
                <li><a href="#">1</a></li>
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
            </ul>
        </li>
        <li class="nav-flag">
            <a href="#">dddddd</a>
            <svg class="icon icon-test">
                <use xlink:href="#icon-test"></use>
            </svg>
            <ul class="paper menu">
                <li class="menu-flag">
                    <a href="#">zxcxzc</a>
                    <ul class="paper menu">
                        <li class="menu-flag">
                            <a href="#">zxcxzc</a>
                            <ul class="paper menu">
                                <li><a href="#">1</a></li>
                                <li><a href="#">2</a></li>
                                <li><a href="#">3</a></li>
                            </ul>
                        </li>
                        <li><a href="#">qwf</a></li>
                        <li><a href="#">cvvf</a></li>
                    </ul>
                </li>
                <li><a href="#">qwf</a></li>
                <li><a href="#">cvvf</a></li>
            </ul>
        </li>
        <li><a href="#">zxcxzc</a></li>
        <li><a href="#">qwf</a></li>
        <li class="nav-flag">
            <a href="#">cvvf</a>
            <svg class="icon icon-test">
                <use xlink:href="#icon-test"></use>
            </svg>
            <ul class="paper menu">
                <li><a href="#">1</a></li>
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
            </ul>
        </li>
        <li class="nav-flag">
            <a href="#">关于</a>
            <svg class="icon icon-test">
                <use xlink:href="#icon-test"></use>
            </svg>
            <ul class="paper menu">
                <li class="menu-flag">
                    <a href="#">联系方式</a>
                    <ul class="paper menu">
                        <li class="menu-flag">
                            <a href="#">啊发顺丰cxzc</a>
                            <ul class="paper menu">
                                <li><a href="#">发挥</a></li>
                                <li><a href="#">其味无穷</a></li>
                                <li><a href="#">阿斯顿法国</a></li>
                            </ul>
                        </li>
                        <li><a href="#">自行车</a></li>
                        <li><a href="#">初步</a></li>
                    </ul>
                </li>
                <li><a href="#">qwf</a></li>
                <li><a href="#">cvvf</a></li>
            </ul>
        </li>
    </nav>
    <!-- menu -->
    <div>
        <ul class="paper menu m16">
            <li class="menu-flag">
                <a href="#">安徽</a>
                <ul class="paper menu">
                    <li><a href="#">1</a></li>
                    <li><a href="#">2</a></li>
                    <li><a href="#">3</a></li>
                </ul>
            </li>
            <li class="menu-flag">
                <a href="#">秦莞尔</a>
                <ul class="paper menu">
                    <li class="menu-flag">
                        <a href="#">春风十里</a>
                        <ul class="paper menu">
                            <li class="menu-flag">
                                <a href="#">十里桃花</a>
                                <ul class="paper menu">
                                    <li><a href="#">1</a></li>
                                    <li><a href="#">2</a></li>
                                    <li><a href="#">3</a></li>
                                </ul>
                            </li>
                            <li><a href="#">暗色</a></li>
                            <li><a href="#">朝歌</a></li>
                        </ul>
                    </li>
                    <li><a href="#">长安城</a></li>
                    <li><a href="#">南海郡</a></li>
                </ul>
            </li>
            <li><a href="#">让他有意义</a></li>
            <li><a href="#">培养台湾</a></li>
            <li class="menu-flag">
                <a href="#">大富大贵</a>
                <ul class="paper menu">
                    <li><a href="#">1</a></li>
                    <li><a href="#">2</a></li>
                    <li><a href="#">3</a></li>
                </ul>
            </li>
        </ul>
    </div>
	`
    let mdSlideBar = `
>
	<div class="slidebar-box-normalize">
        <input type="checkbox" id="slidebar-switch" class="d-n">
        <div class="slidebar bg-purple">
            <label for="slidebar-switch" class="slidebar-tool lh56 plr16">
                <span class="mr16">返回</span>
                <svg class="icon icon16" id="slidebar_in">
                    <use xlink:href="#icon-test"></use>
                </svg>
                <div id="slidebar_out">
                    <svg class="icon icon16" id="slidebar_out">
                        <use xlink:href="#icon-test"></use>
                    </svg>
                </div>
            </label>
            <details class="slide-down">
                <summary class="pl16 c-text-w">农场管理员</summary>
                <ul class="menu">
                    <li><a>发布土地</a></li>
                    <li><a>发布种子方案</a></li>
                    <li><a>发布服务包</a></li>
                </ul>
            </details>
            <ul class="menu">
                <li><a>发布土地</a></li>
                <li><a>发布种子方案</a></li>
                <li><a>发布服务包</a></li>
            </ul>
        </div>
        <div class="mark-b"></div>
    </div>
	`
    let mdTab = `
>
	<div>
        <div class="tab-box-normalize shadow w288 h198">
            <div class="tab-contrl">
                <label for="tab_1">
                    <div class="tab-container">
                        <input type="radio" id="tab_1" name="tab" checked>
                        <div class="tab-toggle">
                            <div class="tab-decoration"><span>1</span></div>
                            <div class="tab-content w288">1</div>
                        </div>
                    </div>
                </label>
                <label for="tab_2">
                    <div class="tab-container">
                        <input type="radio" id="tab_2" name="tab">
                        <div class="tab-toggle">
                            <div class="tab-decoration"><span>2</span></div>
                            <div class="tab-content w288">2</div>
                        </div>
                    </div>
                </label>
                <label for="tab_3">
                    <div class="tab-container">
                        <input type="radio" id="tab_3" name="tab">
                        <div class="tab-toggle">
                            <div class="tab-decoration"><span>3</span></div>
                            <div class="tab-content w288">3</div>
                        </div>
                    </div>
                </label>
            </div>
        </div>
    </div>
	`
    let md3d = `
>
	<section class="t3d-container">
        <input type="radio" id="card_front" name="card-ctrl" checked>
        <div class="card-select-box">
            <label class="card-select" for="card_front">front</label>
            <label class="card-select" for="card_back">back</label>
        </div>
        <input type="radio" id="card_back" name="card-ctrl" class="card-ischecked">
        <div id="card">
            <figure class="front" id="front"><img src="./images/bg_test.jpg" alt=""></figure>
            <figure class="back" id="back"><img src="./images/bg_test.jpg" alt=""></figure>
        </div>
    </section>
	`
    let mdHint = `
>
	<div class="hint-box-nor b-blue m16">
        <strong class="c-blue">BOX</strong>
        <p>在 HTML5 中可以放心使用</p>
    </div>
	`
    let mdColor = `
>
	<div class="ta-c lh56">
        <div class="circle-l bg-blue">
            <span>#3498db</span>
        </div>
        <div class="circle-l bg-blue-d">
            <span>#2980b9</span>
        </div>
        <div class="circle-l bg-cyan">
            <span>#1abc9c</span>
        </div>
        <div class="circle-l bg-cyan-d">
            <span>#16a085</span>
        </div>
        <div class="circle-l bg-green">
            <span>#1fcc7b</span>
        </div>
        <div class="circle-l bg-green-d">
            <span>#27ae60</span>
        </div>
        <div class="circle-l bg-purple">
            <span>#9b59b6</span>
        </div>
        <div class="circle-l bg-purple-d">
            <span>#8e44ad</span>
        </div>
        <div class="circle-l bg-black">
            <span>#34495e</span>
        </div>
        <div class="circle-l bg-black-d">
            <span>#2c3e50</span>
        </div>
        <div class="circle-l bg-yellow">
            <span>#f1c40f</span>
        </div>
        <div class="circle-l bg-yellow-d">
            <span>#f39c12</span>
        </div>
        <div class="circle-l bg-orange">
            <span>#ffa404</span>
        </div>
        <div class="circle-l bg-orange-d">
            <span>#d35400</span>
        </div>
        <div class="circle-l bg-red">
            <span>#e74c3c</span>
        </div>
        <div class="circle-l bg-red-d">
            <span>#c0392b</span>
        </div>
        <div class="circle-l bg-pink">
            <span>#e91e63</span>
        </div>
        <div class="circle-l bg-white">
            <span>#ecf0f1</span>
        </div>
        <div class="circle-l bg-white-d">
            <span>#bdc3c7</span>
        </div>
        <div class="circle-l bg-grey">
            <span>#95a5a6</span>
        </div>
        <div class="circle-l bg-grey-d">
            <span>#7f8c8d</span>
        </div>
        <div class="circle-l bg-base">
            <span>#f1f1f1</span>
        </div>
        <div class="circle-l bg-tran">
            <span>#dddddd</span>
        </div>
        <div class="circle-l bg-tp">
            <span>transparespant</span>
        </div>
        <div class="circle-l bg-w">
            <span>#fff</span>
        </div>
    </div>
	`
    return (
        <div>
			<button className="btn btn-s">Button-s</button>
		    <button className="btn btn-m">Button-m</button>
		    <button className="btn btn-l">Button-l</button>
		    <button className="btn btn-tp">Button-l</button>
		    <button className="btn btn-m btn-hollow ">btn-hollow</button>
		    <button className="btn-round-s">
				<svg className="icon icon-test">
		            <use xlinkHref="#icon-test"></use>
		        </svg>
		    </button>
		    <button className="btn-round-m">
		        <svg className="icon icon-test">
		            <use xlinkHref="#icon-test"></use>
		        </svg>
		    </button>
		    <div className="d-il w144">
		        <button className="btn btn-full">btn-full</button>
		    </div>
		    <button className="btn btn-m btn-gif-wait">购买</button>
		    <button className="btn btn-m btn-gif-bingo"></button>
			<div className="btn-group">
			<button className="btn btn-m">1</button>
		        <button className="btn btn-m">2</button>
		        <button className="btn btn-m">3</button>
		        <button className="btn btn-m">...</button>
		        <button className="btn btn-m">></button>
		    </div>
			<Markdown source={mdButton} escapeHtml={true} />
			<div className="toastlists-normalize-box">
		        <div className="toastlist">
		            <div className="shadow">
		                <div className="bg-blue">Hint:how your are so petty</div>
		            </div>
		        </div>
		        <div className="toastlist">
		            <div className="shadow">
		                <div className="bg-blue">Hint:how your are so</div>
		            </div>
		        </div>
		        <div className="toastlist">
		            <div className="shadow">
		                <div className="bg-blue">Hint:how your are so petty</div>
		            </div>
		        </div>
		    </div>
			<Markdown source={mdToast} escapeHtml={true} />
			<div>
		        <img src={require("../../images/bg_test.jpg")} alt="" className="img-rounded bg-tran"/>
		        <img src={require("../../images/bg_test.jpg")} alt="" className="img-circle bg-tran"/>
		        <img src={require("../../images/bg_test.jpg")} alt="" className="img-thumbnail"/>
		    </div>
		    <Markdown source={mdImg} escapeHtml={true} />
		    <div className="checkbox-box-normalize">
	            <input id="checkbox_normalize" type="checkbox" name="c_n"/>
	            <span className="checkbox-hook ta-c"><span className="checkbox-hook-in fs12 op0 lh0">✓</span></span>
	            <label htmlFor="checkbox_normalize" className="p-r z10">复选框A</label>
	        </div>
	        <div className="checkbox-box-normalize">
	            <input id="checkbox_normalize1" type="checkbox" name="c_n1"/>
	            <span className="checkbox-hook ta-c"><span className="checkbox-hook-in fs12 op0 lh0">✓</span></span>
	            <label htmlFor="checkbox_normalize1" className="p-r z10">B</label>
	        </div>
	        <div className="checkbox-box-imgstyle mt16">
	            <input id="c_i" type="checkbox" name="c_i" className="d-n"/>
	            <label htmlFor="c_i" className="checkbox-imgstyle">
	                <img src={require("../../images/bg_test.jpg")} alt=""/>
	                <p className="m0">Title</p>
	                <div className="checkbox-mark"><span>✓</span></div>
	            </label>
	        </div>

	        <div className="checkbox-box-papertoggle w288 shadow">
	            <input id="isSelectPackage" type="checkbox" className="d-n"/>
	            <label htmlFor="isSelectPackage" className="checkbox-papertoggle flex-box">
	                <div className="checkbox-imgbox">
	                    <img src={require("../../images/bg_test.jpg")} alt=""/>
	                </div>
	                <div className="flex1 lh16 pl16">
	                    <p className="bor-b b-divider-b pb8 mb8">
	                        TEST
	                        <svg className="icon f-r">
	                            <use xlinkHref="#icon-arrow-right"></use>
	                        </svg>
	                    </p>
	                    <span className="c-hint-b fs12">亲子实惠，难得一夏。</span>
	                </div>
	                <div className="checkbox-mark">
	                    <span>✓</span>
	                    <p>已选择</p>
	                </div>
	            </label>
        	</div>
        	<div className="switch-box-normalize">
	            <label htmlFor="switch-input" className="switch-mark-click"></label>
	            <input type="checkbox" defaultValue="1" id="switch-input"/>
	            <div>
	                <i className="switch-move"></i>
	                <span className="switch-horizon"></span>
	            </div>
	        </div>

	        <div className="radio-box-normalize">
	            <input id="isManagerPlant1" type="radio" name="managerPlant" className="d-n"/>
	            <div className="radio-out">
	                <i className="radio-in"></i>
	            </div>
	            <label htmlFor="isManagerPlant1">next</label>
	        </div>
	        <div className="radio-box-normalize">
	            <input id="isManagerPlant2" type="radio" name="managerPlant" className="d-n"/>
	            <div className="radio-out">
	                <i className="radio-in"></i>
	            </div>
	            <label htmlFor="isManagerPlant2">cancel</label>
	        </div>

	        <div className="input-count">
	            <div className="reduce c-cyan b-cyan">
	                <button>-</button>
	            </div>
	            <input type="text" defaultValue="0" id="adult" className="man-num"/>
	            <div className="plus c-cyan b-cyan">
	                <button>+</button>
	            </div>
	        </div>

	        <div className="select-box-normalize">
	            <i className="select-tri-t tri-t"></i>
	            <i className="select-tri-b tri-b"></i>
	            <label htmlFor="select" className="select-in"></label>
	            <select name="" id="select">
	                <option value="">qasd</option>
	                <option value="">qasd</option>
	            </select>
	        </div>

	        <textarea name="" id="" cols="30" rows="10" className="textarea"></textarea>

	        <div className="range-box-mater">
	            <input type="range" className="w144" defaultValue="0" max="2" />
	        </div>
	        <div className="range-box-ios">
	            <input type="range" className="w144" defaultValue="0" max="2" />
	        </div>

	        <Markdown source={mdInput} escapeHtml={true} />

	        <input type="text" name="user_name" id="user_name" className="input input-normal" maxLength="15" placeholder="输入你的姓名" required/>
	        <input type="text" name="user_name" id="user_name" className="input-s input-normal" maxLength="15" placeholder="输入你的姓名" required/>
	        <div className="input pt8">
	            <label htmlFor="" className="fs12 c-grey">Name:</label>
	            <br/>
	            <input type="text" className="input-down" placeholder="Input your name" maxLength="15" required/>
	            <br/>
	            <span className="input-ps fs12">hint!</span>
	        </div>
	        <div className="fileup-container">
	            <div className="fileup">
	                <label htmlFor="input-file" className="fileup-in btn btn-m c-text-w bg-orange">点击选择</label>
	                <input type="file" id="input-file"/>
	            </div>
	            <img src="" alt=""/>
	        </div>
	        <div className="search-box-normalize">
	            <input type="text" className="input input-normal"/>
	            <button className="btn btn-m bg-blue c-text-w">搜索</button>
	        </div>

	        <Markdown source={mdForm} escapeHtml={true} />

	        <nav className="nav shadow bg-blue c-text-w">
		        <li className="nav-flag">
		            <a href="#">asd</a>
		            <svg className="icon icon-test">
		                <use xlinkHref="#icon-test"></use>
		            </svg>
		            <ul className="paper menu">
		                <li><a href="#">1</a></li>
		                <li><a href="#">2</a></li>
		                <li><a href="#">3</a></li>
		            </ul>
		        </li>
		        <li className="nav-flag">
		            <a href="#">dddddd</a>
		            <svg className="icon icon-test">
		                <use xlinkHref="#icon-test"></use>
		            </svg>
		            <ul className="paper menu">
		                <li className="menu-flag">
		                    <a href="#">zxcxzc</a>
		                    <ul className="paper menu">
		                        <li className="menu-flag">
		                            <a href="#">zxcxzc</a>
		                            <ul className="paper menu">
		                                <li><a href="#">1</a></li>
		                                <li><a href="#">2</a></li>
		                                <li><a href="#">3</a></li>
		                            </ul>
		                        </li>
		                        <li><a href="#">qwf</a></li>
		                        <li><a href="#">cvvf</a></li>
		                    </ul>
		                </li>
		                <li><a href="#">qwf</a></li>
		                <li><a href="#">cvvf</a></li>
		            </ul>
		        </li>
		        <li><a href="#">zxcxzc</a></li>
		        <li><a href="#">qwf</a></li>
		        <li className="nav-flag">
		            <a href="#">cvvf</a>
		            <svg className="icon icon-test">
		                <use xlinkHref="#icon-test"></use>
		            </svg>
		            <ul className="paper menu">
		                <li><a href="#">1</a></li>
		                <li><a href="#">2</a></li>
		                <li><a href="#">3</a></li>
		            </ul>
		        </li>
		        <li className="nav-flag">
		            <a href="#">关于</a>
		            <svg className="icon icon-test">
		                <use xlinkHref="#icon-test"></use>
		            </svg>
		            <ul className="paper menu">
		                <li className="menu-flag">
		                    <a href="#">联系方式</a>
		                    <ul className="paper menu">
		                        <li className="menu-flag">
		                            <a href="#">啊发顺丰cxzc</a>
		                            <ul className="paper menu">
		                                <li><a href="#">发挥</a></li>
		                                <li><a href="#">其味无穷</a></li>
		                                <li><a href="#">阿斯顿法国</a></li>
		                            </ul>
		                        </li>
		                        <li><a href="#">自行车</a></li>
		                        <li><a href="#">初步</a></li>
		                    </ul>
		                </li>
		                <li><a href="#">qwf</a></li>
		                <li><a href="#">cvvf</a></li>
		            </ul>
		        </li>
		    </nav>

		    <div>
		        <ul className="paper menu m16">
		            <li className="menu-flag">
		                <a href="#">安徽</a>
		                <ul className="paper menu">
		                    <li><a href="#">1</a></li>
		                    <li><a href="#">2</a></li>
		                    <li><a href="#">3</a></li>
		                </ul>
		            </li>
		            <li className="menu-flag">
		                <a href="#">秦莞尔</a>
		                <ul className="paper menu">
		                    <li className="menu-flag">
		                        <a href="#">春风十里</a>
		                        <ul className="paper menu">
		                            <li className="menu-flag">
		                                <a href="#">十里桃花</a>
		                                <ul className="paper menu">
		                                    <li><a href="#">1</a></li>
		                                    <li><a href="#">2</a></li>
		                                    <li><a href="#">3</a></li>
		                                </ul>
		                            </li>
		                            <li><a href="#">暗色</a></li>
		                            <li><a href="#">朝歌</a></li>
		                        </ul>
		                    </li>
		                    <li><a href="#">长安城</a></li>
		                    <li><a href="#">南海郡</a></li>
		                </ul>
		            </li>
		            <li><a href="#">让他有意义</a></li>
		            <li><a href="#">培养台湾</a></li>
		            <li className="menu-flag">
		                <a href="#">大富大贵</a>
		                <ul className="paper menu">
		                    <li><a href="#">1</a></li>
		                    <li><a href="#">2</a></li>
		                    <li><a href="#">3</a></li>
		                </ul>
		            </li>
		        </ul>
		    </div>
		    <Markdown source={mdMenu} escapeHtml={true} />
		    <Markdown source={mdSlideBar} escapeHtml={true} />
		    <div>
		        <div className="tab-box-normalize shadow w288 h198">
		            <div className="tab-contrl">
		                <label htmlFor="tab_1">
		                    <div className="tab-container">
		                        <input type="radio" id="tab_1" name="tab" defaultChecked/>
		                        <div className="tab-toggle">
		                            <div className="tab-decoration"><span>1</span></div>
		                            <div className="tab-content w288">1</div>
		                        </div>
		                    </div>
		                </label>
		                <label htmlFor="tab_2">
		                    <div className="tab-container">
		                        <input type="radio" id="tab_2" name="tab"/>
		                        <div className="tab-toggle">
		                            <div className="tab-decoration"><span>2</span></div>
		                            <div className="tab-content w288">2</div>
		                        </div>
		                    </div>
		                </label>
		                <label htmlFor="tab_3">
		                    <div className="tab-container">
		                        <input type="radio" id="tab_3" name="tab"/>
		                        <div className="tab-toggle">
		                            <div className="tab-decoration"><span>3</span></div>
		                            <div className="tab-content w288">3</div>
		                        </div>
		                    </div>
		                </label>
		            </div>
		        </div>
		    </div>
		    <Markdown source={mdTab} escapeHtml={true} />

		    <section className="t3d-container">
		        <input type="radio" id="card_front" name="card-ctrl" defaultChecked/>
		        <div className="card-select-box">
		            <label className="card-select" htmlFor="card_front">front</label>
		            <label className="card-select" htmlFor="card_back">back</label>
		        </div>
		        <input type="radio" id="card_back" name="card-ctrl" className="card-ischecked"/>
		        <div id="card">
		            <figure className="front" id="front">FRONT</figure>
		            <figure className="back" id="back">BACK</figure>
		        </div>
		    </section>
		    <Markdown source={md3d} escapeHtml={true} />

		    <div className="hint-box-nor b-blue m16">
		        <strong className="c-blue">BOX</strong>
		        <p>在 HTML5 中可以放心使用</p>
		    </div>
		    <Markdown source={mdHint} escapeHtml={true} />

		    <div className="ta-c lh56">
		        <div className="circle-l bg-blue">
		            <span>#3498db</span>
		        </div>
		        <div className="circle-l bg-blue-d">
		            <span>#2980b9</span>
		        </div>
		        <div className="circle-l bg-cyan">
		            <span>#1abc9c</span>
		        </div>
		        <div className="circle-l bg-cyan-d">
		            <span>#16a085</span>
		        </div>
		        <div className="circle-l bg-green">
		            <span>#1fcc7b</span>
		        </div>
		        <div className="circle-l bg-green-d">
		            <span>#27ae60</span>
		        </div>
		        <div className="circle-l bg-purple">
		            <span>#9b59b6</span>
		        </div>
		        <div className="circle-l bg-purple-d">
		            <span>#8e44ad</span>
		        </div>
		        <div className="circle-l bg-black">
		            <span>#34495e</span>
		        </div>
		        <div className="circle-l bg-black-d">
		            <span>#2c3e50</span>
		        </div>
		        <div className="circle-l bg-yellow">
		            <span>#f1c40f</span>
		        </div>
		        <div className="circle-l bg-yellow-d">
		            <span>#f39c12</span>
		        </div>
		        <div className="circle-l bg-orange">
		            <span>#ffa404</span>
		        </div>
		        <div className="circle-l bg-orange-d">
		            <span>#d35400</span>
		        </div>
		        <div className="circle-l bg-red">
		            <span>#e74c3c</span>
		        </div>
		        <div className="circle-l bg-red-d">
		            <span>#c0392b</span>
		        </div>
		        <div className="circle-l bg-pink">
		            <span>#e91e63</span>
		        </div>
		        <div className="circle-l bg-white">
		            <span>#ecf0f1</span>
		        </div>
		        <div className="circle-l bg-white-d">
		            <span>#bdc3c7</span>
		        </div>
		        <div className="circle-l bg-grey">
		            <span>#95a5a6</span>
		        </div>
		        <div className="circle-l bg-grey-d">
		            <span>#7f8c8d</span>
		        </div>
		        <div className="circle-l bg-base">
		            <span>#f1f1f1</span>
		        </div>
		        <div className="circle-l bg-tran">
		            <span>#dddddd</span>
		        </div>
		        <div className="circle-l bg-tp">
		            <span>transparespant</span>
		        </div>
		        <div className="circle-l bg-w">
		            <span>#fff</span>
		        </div>
		    </div>

		</div>
    )
}

export default Slucky