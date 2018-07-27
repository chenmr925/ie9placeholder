// 判断浏览器是否支持placeholder
function isPlaceholderSupport() {
	return "placeholder" in document.createElement("input");
}

// 获取元素
function setInputPlaceholder(){
	var allInputs = [];
	if(document.querySelectorAll){
		allInputs = document.querySelectorAll("[placeholder]");
	}
	// 过滤不适用placeholder的表单元素
	for(var i=0;i<allInputs.length;i++){
		var inputElem = allInputs[i];
		var type = inputElem.type, placeholderStr = inputElem.getAttribute("placeholder");
		if(placeholderStr && (type == "text" || type == "password" || type == "textarea")){
			// 初始设置input的value为placeholder，用来模拟palceholder属性
			inputElem.defaultType = type;
			if(type == "password"){
				inputElem.type = "text";
			}
			//处理初始值
			if(inputElem.value){
				inputElem.state = "change"
			}else{
				inputElem.value = placeholderStr;
			}

			// 为每个input增加focus和blur事件，做兼容处理
			inputElem.removeEventListener("focus", handleFocus);
			inputElem.removeEventListener("blur", handleBlur);
			inputElem.removeEventListener("change", handleChange);
			inputElem.addEventListener("focus", handleFocus);
			inputElem.addEventListener("blur", handleBlur);
			inputElem.addEventListener("change", handleChange);
		}
	}
}

// focus, blur和input事件处理函数
function handleFocus(e) {
	var target = e.target || e.srcElement;
	if(target.state) return;
	if(target.defaultType == "password"){
		target.type = "password";
	}
	target.value = "";
}

function handleBlur(e) {
	var target = e.target || e.srcElement;
	if(target.state) return;
	if(target.defaultType == "password"){
		target.type = "text";
	}
	var placeholderStr = target.getAttribute("placeholder");
	target.value = placeholderStr;
}

function handleChange(e) {
	var target = e.target || e.srcElement;
	if(target.value){
		target.state = "change";
	}else{
		target.state = undefined;
	}
}

// 接口对象
function PlaceHolderPolyfill() {}

// 对象初始化方法
PlaceHolderPolyfill.prototype.init = function() {
	if(!isPlaceholderSupport()){
		setInputPlaceholder();
	}
}

// 导出接口
module.exports = new PlaceHolderPolyfill();
