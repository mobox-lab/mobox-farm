import Vue from 'vue'
export default () => {
	Vue.directive('int', {
		bind: function (input) {
			input.onkeyup = function () {
				let max = input.getAttribute("data-max");
				let min = input.getAttribute("data-min");
				if (input.value.length === 1) {
					input.value = input.value.replace(/[^1-9]/g, '')
				} else {
					input.value = input.value.replace(/[^\d]/g, '')
				}
				if (max != null && Number(input.value) > Number(max) && input.value != "") {
					input.value = max;
				}
				if (min != null && Number(input.value) < Number(min) && input.value != "") {
					input.value = min;
				}
				trigger(input, 'input')
			}
			input.onblur = function () {
				let max = input.getAttribute("data-max");
				let min = input.getAttribute("data-min");
				if (input.value.length === 1) {
					input.value = input.value.replace(/[^1-9]/g, '')
				} else {
					input.value = input.value.replace(/[^\d]/g, '')
				}
				if (max != null && Number(input.value) > Number(max)  && input.value != "") {
					input.value = max;
				}
				if (min != null && Number(input.value) < Number(min)  && input.value != "") {
					input.value = min;
				}
				trigger(input, 'input')
			}
		}
	});
	Vue.directive('number', {
		bind: function (input) {
			input.onkeyup = function () {
				let max = input.getAttribute("data-max");
				let min = input.getAttribute("data-min");
				input.value = numberCheck(input.value);
				if (max != null && Number(input.value) > Number(max) && input.value != "") {
					input.value = max;
				}
				if (min != null && Number(input.value) < Number(min) && input.value != "") {
					input.value = min;
				}
				trigger(input, 'input');
			}
			input.onblur = function () {
				let max = input.getAttribute("data-max");
				let min = input.getAttribute("data-min");
				input.value = numberCheck(input.value);
				if (max != null && Number(input.value) > Number(max) && input.value != "") {
					input.value = max;
				}
				if (min != null && Number(input.value) < Number(min) && input.value != "") {
					input.value = min;
				}
				trigger(input, 'input');
			}
		}
	});
	
	Vue.directive("popMsg", {
		bind: function (ele) {
			let popMsgNode = ele.querySelector('.popMsg');
			ele.onmouseenter = function(){
				popMsgNode.style.display="block";
			}
			ele.onmouseleave = function(){
				popMsgNode.style.display="none";
			}
			ele.touchstart = function(){
				popMsgNode.style.display="block";
			}
			ele.touchend = function(){
				popMsgNode.style.display="none";
			}
		}
	})

}

const numberCheck = (num)=>{
	let str = num;
	let len1 = str.substr(0, 1);
	let len2 = str.substr(1, 1);
	//如果第一位是0，第二位不是点，就用数字把点替换掉
	if (str.length > 1 && len1 == 0 && len2 != ".") {
		str = str.substr(1, 1);
	}
	//第一位不能是.
	if (len1 == ".") {
		str = "";
	}
	//限制只能输入一个小数点
	if (str.indexOf(".") != -1) {
		let str_ = str.substr(str.indexOf(".") + 1);
		if (str_.indexOf(".") != -1) {
			str = str.substr(0, str.indexOf(".") + str_.indexOf(".") + 1);
		}
	}
	//正则替换，保留数字和小数点
	str = str.replace(/[^\d^\\.]+/g,'');
	//如果需要保留小数点后两位，则用下面公式
	// str = str.replace(/\\.\d\d$/,'');
	console.log(str);
	return str;
}

const trigger = (el, type) => {
	const e = document.createEvent('HTMLEvents')
	e.initEvent(type, true, true)
	el.dispatchEvent(e)
}