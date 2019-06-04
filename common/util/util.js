/*
*	util.js
*	유틸성 함수들 모음
*/

// from ~ to 사이 랜덤한 숫자
exports.randomInt = function (from, to) {
	return Math.floor((Math.random() * (to - from + 1)) + from);
}

exports.randomFloat = function (from, to) {
	return Math.random() * (to - from) + from;
}



// object나 array의 크기
exports.getLength = function (object) {
	if (Array.isArray(object)) return object.length;
	return Object.keys(object).length;
}

exports.objectCopy = function (obj) {
	return JSON.parse(JSON.stringify(obj));
}

// sKey 생성
exports.sKeyGen = function (accIdx) {
	const sKey = accIdx + '@nb@' + guid12();
	return Buffer.from(sKey).toString('base64');
}

// rKey 생성
exports.rKeyGen = function (accIdx, sMCode) {
	const rKey = accIdx + `@${sMCode}@` + Date.now();
	return Buffer.from(rKey).toString('base64');
}

exports.uniqueArray = function (arr) {
	var uniqueArr = this.objectCopy(arr);
	uniqueArr = uniqueArr.filter((v, i) => uniqueArr.indexOf(v) === i);
	return uniqueArr;
}

function guid12() {
	function s4() { return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1); }
	return s4() + s4() + s4();
}

// float 
exports.floatSum = function (x, y) {
	var sum = ((x * 10) + (y * 10)) / 10;
	return sum;
}

String.prototype.byteLen = function () {
	var s = this;
	var b = 0, i = 0, c = 0;
	for (b = i = 0; c = s.charCodeAt(i++); b += c >> 7 ? 2 : 1);
	return b;
};

function twoDigits(d) {
	if (0 <= d && d < 10) return '0' + d.toString();
	if (-10 < d && d < 0) return '-0' + (-1 * d).toString();
	return d.toString();
}

Date.prototype.toMysqlDateTime = function () {
	return this.getFullYear()
		+ '-' + twoDigits(1 + this.getMonth())
		+ '-' + twoDigits(this.getDate())
		+ ' ' + twoDigits(this.getHours())
		+ ':' + twoDigits(this.getMinutes())
		+ ':' + twoDigits(this.getSeconds());
};

Date.prototype.toMysqlDate = function () {
	return this.getFullYear()
		+ '-' + twoDigits(1 + this.getMonth())
		+ '-' + twoDigits(this.getDate())
		+ ' 00:00:00';
};