var jwt = require('jwt-simple');
var validateUser = require('./auth.js').validateUser;

module.exports = function(req, res, next) {
	var token = req.body.token || req.params.token || req.headers['x-access-token'];
	if(token) {
		try{
			var decoded = jwt.decode(token, require('./secret-key.js').key);
			if(decoded.exp <= Date.now()) {
				res.status(400);
				res.json({
					"status": 400,
					"message": "Token Expired"
				});
				return;
			} 
			
			var userAuth = validateUser(decoded.user.userName);	
			if(userAuth) {
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