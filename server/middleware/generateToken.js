var jwt  = require('jwt-simple');
var key = require('./secret-key.js');

module.exports = function(user) {
	var expires = expiresIn(1);
	var token = jwt.encode({
		exp: expires,
		user: user
	}, key.key);

	return {
		token: token,
		expires: expires,	
		user: user,
		success: true	
	};
};


function expiresIn(minutes) {
	var dateObj = new Date();
	return dateObj.setMinutes(dateObj.getMinutes() + minutes);
}