const jwt = require('jsonwebtoken');
const user = { id: 1, username: 'admin', password: 'admin' };

const secret = "akZF9QL2W5JpYuX";
const token = jwt.sign(user, secret);

// console.log(token);

const output =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInBhc3N3b3JkIjoiYWRtaW4iLCJpYXQiOjE3NDE1MTIxOTN9.ugIl9gWSHtTffsnptYb_D3raSLBwCWQPmj6YDkYLfv0";

console.log(jwt.decode(output, secret));
