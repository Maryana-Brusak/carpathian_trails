
const restify = require('restify');
const mongoose = require('mongoose');



const server = restify.createServer({
	name: 'CarpathianTrail_server',
	version: '1.0.0'
});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://Mary:erl13111986@ds017896.mlab.com:17896/db_carpatian_trails');/*mongodb://<dbuser>:<dbpassword>@ds017896.mlab.com:17896/db_carpatian_trails*/

const Order = mongoose.model('Order', mongoose.Schema({
 trek_name: String,
 name: String,
 surname: String,
 phone_number: Number,
 email_address: String,
 date: Number,
 num: Number,
 comment: String 
}));

const Comment = mongoose.model('Comment', mongoose.Schema({
 name: String,
 email: String,
 comment: String, 
 page: String
}));

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.listen(80, () => {
	console.log(`${server.name} listening at ${server.url}`);
});

server.post('comment', (req, res) => {	
	console.log('Post comment started');
	var comment = new Comment(req.body);
	comment.save();
	res.send(201);
});

server.get('comments/:pageId', (req, res) => {
	var pageId = req.params.pageId;
	Comment.find({'page': pageId}, function (err, comments) {
		if (err) return console.error(err);
		console.log(comments);
		res.send(200, comments);
	})

});

server.post('order', (req, res) => {
	console.log('Post order started');
	var order = new Order(req.body);
	order.save();
	res.send(201);
});

server.get(/\/trails\/?.*/, restify.serveStatic({
    directory: __dirname
}));