
const restify = require('restify');
const mongoose = require('mongoose');



const server = restify.createServer({
	name: 'CarpathianTrail_server',
	version: '1.0.0'
});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://root:trails123@ds017896.mlab.com:17896/db_carpatian_trails');

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

const Rating =  mongoose.model('Rating', mongoose.Schema({
	rating: Number,
	trailId: String,
	count: Number
}));

const Trail = mongoose.model('Trail', mongoose.Schema ({
	header: String,
	image: String,
	description: String,
	map: Object,
	region: String,
	duration: String,
	type: String
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

server.get('tracks/:regionId', (req, res) => {
	var regionId = req.params.regionId;
	Trail.find({'region': regionId == 'all' ? {$ne : null} : regionId}, function (err, trails) {
		if (err) return console.error(err);
		res.send(200, trails);
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

server.post('rating/:trailId', (req, res) => {
	var trailId = req.params.trailId;
	var rating = req.params.rating;

	Rating.findOne({'trailId': trailId}, function (err, ratingModel) {
		if (!ratingModel) {
			ratingModel = new Rating (
				{rating: 0, trailId: trailId, count: 0}
			);
		}

		ratingModel.rating = (ratingModel.rating * ratingModel.count + parseInt(rating))/(++(ratingModel.count));
		ratingModel.save();
		res.send (200, Math.round(ratingModel.rating));
	})

});

server.get('rating/:trailId', (req, res) => {
	var trailId = req.params.trailId; 	

	Rating.findOne({'trailId': trailId}, function (err, ratingModel) {
		res.send (200, ratingModel ? Math.round(ratingModel.rating) : 0);		
	})

});