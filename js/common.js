
var remoteUrl = "https://ygj.gduf.edu.cn/";
function goTo(url) {
	window.location.href = url;
}

//读取cookie
function getCookie(name) {
	return window.localStorage[name];
}
//写cookies 
function setCookie(name, value) {
	window.localStorage.setItem(name, value);
}


//删除cookies 
function delCookie(name) {
	window.localStorage.setItem(name, "");
}
//清除所有cookie函数
function clearAllCookie() {
	window.localStorage.clear();
}

//扩展mui.showLoading  
(function($, window) {
	//显示加载框  
	$.showLoading = function(message, type) {
		if($.os.plus && type !== 'div') {
			$.plusReady(function() {
				plus.nativeUI.showWaiting(message);
			});
		} else {
			var html = '';
			html += '<i class="mui-spinner mui-spinner-white"></i>';
			html += '<p class="text">' + (message || "数据加载中") + '</p>';

			//遮罩层  
			var mask = document.getElementsByClassName("mui-show-loading-mask");
			if(mask.length == 0) {
				mask = document.createElement('div');
				mask.classList.add("mui-show-loading-mask");
				document.body.appendChild(mask);
				mask.addEventListener("touchmove", function(e) {
					e.stopPropagation();
					e.preventDefault();
				});
			} else {
				mask[0].classList.remove("mui-show-loading-mask-hidden");
			}
			//加载框  
			var toast = document.getElementsByClassName("mui-show-loading");
			if(toast.length == 0) {
				toast = document.createElement('div');
				toast.classList.add("mui-show-loading");
				toast.classList.add('loading-visible');
				document.body.appendChild(toast);
				toast.innerHTML = html;
				toast.addEventListener("touchmove", function(e) {
					e.stopPropagation();
					e.preventDefault();
				});
			} else {
				toast[0].innerHTML = html;
				toast[0].classList.add("loading-visible");
			}
		}
	};

	//隐藏加载框  
	$.hideLoading = function(callback) {
		if($.os.plus) {
			$.plusReady(function() {
				plus.nativeUI.closeWaiting();
			});
		}
		var mask = document.getElementsByClassName("mui-show-loading-mask");
		var toast = document.getElementsByClassName("mui-show-loading");
		if(mask.length > 0) {
			mask[0].classList.add("mui-show-loading-mask-hidden");
		}
		if(toast.length > 0) {
			toast[0].classList.remove("loading-visible");
			callback && callback();
		}
	}
})(mui, window);

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function(fmt) { //author: meizz 
	var o = {
		"M+": this.getMonth() + 1, //月份 
		"d+": this.getDate(), //日 
		"h+": this.getHours(), //小时 
		"m+": this.getMinutes(), //分 
		"s+": this.getSeconds(), //秒 
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
		"S": this.getMilliseconds() //毫秒 
	};
	if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for(var k in o)
		if(new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}
String.prototype.replaceAll = function(s1, s2) {
	return this.replace(new RegExp(s1, "gm"), s2);
}
//获取URL参数
function getRequest() {
	var url = location.search; //获取url中?后的字符串
	var theRequest = new Object();
	if(url.indexOf("?") != -1) {
		var str = url.substr(1);
		var strs = str.split("&");
		for(var i = 0; i < strs.length; i++) {
			theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
		}
	}
	return theRequest;
}

/**
 * 将以base64的图片url数据转换为Blob
 * @param urlData
 * 用url方式表示的base64图片数据
 */
function convertBase64UrlToBlob(urlData) {
	var bytes = window.atob(urlData.split(',')[1]); //去掉url的头，并转换为byte
	//处理异常,将ascii码小于0的转换为大于0
	var ab = new ArrayBuffer(bytes.length);
	var ia = new Uint8Array(ab);
	for(var i = 0; i < bytes.length; i++) {
		ia[i] = bytes.charCodeAt(i);
	}
	return new Blob([ab], {
		type: 'image/jpeg'
	});
}

function addUrlPara(name, value) {
	var currentUrl = window.location.href.split('#')[0];
	if(/\?/g.test(currentUrl)) {
		if(/name=[-\w]{4,25}/g.test(currentUrl)) {
			currentUrl = currentUrl.replace(/name=[-\w]{4,25}/g, name + "=" + value);
		} else {
			currentUrl += "&" + name + "=" + value;
		}
	} else {
		currentUrl += "?" + name + "=" + value;
	}
	if(window.location.href.split('#')[1]) {
		window.location.href = currentUrl + '#' + window.location.href.split('#')[1];
	} else {
		window.location.href = currentUrl;
	}
}

setTimeout(function() {
	if((getCookie("teacherID") == "" && window.location.href.indexOf("teacher") > -1) || (getCookie("studentID") == "" && window.location.href.indexOf("student") > -1)) {
		alert("无效的授权");
		window.location.href = remoteUrl + "/index.aspx";
	}
}, 2000);

function formatLessonType(t) {
	if(t == 2)
		return "每天重复请假";
	return "常规请假";
}