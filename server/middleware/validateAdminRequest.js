
var jwt = require('jwt-simple');
var validateAdmin = require('./auth.js').validateAdmin;

module.exports = function(req, res, next) {
	var token = req.body.token || req.params.token || req.headers['x-access-token'];
	if(token) {
		try{
			var decoded = jwt.decode(token, require('./secret-key.js').key);
			console.log("decoded" + decoded);
			if(decoded.exp <= Date.now()) {
				res.status(400);
				res.json({
					"status": 400,
					"message": "Token Expired"
				});
				return;
			} 
			var user = validateAdmin(decoded.user.userName, decoded.user.role);
			if(user) {
				next();
			} else {
				res.status(403);
				res.json({
					"status": 403,
					"message": "Not Authorized"
				});
				return;
			}
		} catch(err) {
			console.log("Error : " + err);
			res.status(500);
			res.json({
				"status": 500,
				"message": "Oops something went wrong"
			})
		}
	} else {
		res.status(401);
		res.json({
			"status": 401,
			"message": "Invalid token"
		});
	}
	return;
};