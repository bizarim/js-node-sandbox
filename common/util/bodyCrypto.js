var crypto = require('crypto');

// 예제 링크
// https://github.com/yeyintkoko/encrypt-decrypt-c--nodejs
// 암/복호화 Triple DES
const alg = 'des-ede3-cbc';
const Iv = Buffer.from("test", "ascii");
const Key = Buffer.from("test", "ascii");

exports.decrypt = function (enc_data) {
	enc_data = Buffer.from(enc_data, 'base64');
	var decipher = crypto.createDecipheriv(alg, Key, Iv);
	var decoded = decipher.update(enc_data, 'utf8', 'ascii');
	decoded += decipher.final('ascii');
	return decoded;
};

exports.encrypt = function (data) {
	var cipher = crypto.createCipheriv(alg, Key, Iv);
	var encoded = cipher.update(data, 'utf8', 'base64');
	encoded += cipher.final('base64');
	return encoded;
};