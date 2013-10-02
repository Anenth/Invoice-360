'use strict';
var http = require('http'),
url = require('url'),
path = require('path'),
fs = require('fs'),
httpPort = process.argv[2] || 8888;
http.createServer(function(request, response) {
	var uri = url.parse(request.url).pathname, 
	filename = path.join(process.cwd(), uri);
	path.exists(filename, function(exists) {
		if(!exists) {
			response.writeHead(404, {'Content-Type': 'text/plain'});
			response.write('404 Not Found\n');
			response.end();
			return;
		}

		if (fs.statSync(filename).isDirectory()) filename += 'index.html';

		fs.readFile(filename, 'binary', function(err, file) {
			if(err) {
				response.writeHead(500, {'Content-Type': 'text/plain'});
				response.write(err + '\n');
				response.end();
				return;
			}
			response.writeHead(200);
			response.write(file, 'binary');
			response.end();
		});
	});
}).listen(parseInt(httpPort, 10));
console.log('  File   server running at => Port : ' + httpPort );


// ### MONGO SERVER 
var mongoose = require('mongoose/');
var config 	 = require('./config');
mongoose.connect(config.creds.uri);
var autoinc = require('mongoose-pureautoinc');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	console.log('        Connected to MongoDB');
});
autoinc.init(db);
//##  Schemas
var Schema = mongoose.Schema;
var ProductSchema = new Schema({
	name: String,
	qty: Number,
	price: Number
});
ProductSchema.plugin(autoinc.plugin, {
	model:'Product',
	field:'productCode'
});
var InvoiceSchema = new Schema({
	amount: Number,
	date: Date
});
InvoiceSchema.plugin(autoinc.plugin, {
	model:'Invoice',
	field:'invoiceNumber'
});

//##  Models
mongoose.model('Product', ProductSchema);
mongoose.model('Invoice', InvoiceSchema);
var Product = mongoose.model('Product'),
Invoice = mongoose.model('Invoice');

function getProduct(req, res, next){
	Product.findOne( { 'productCode' : req.params.id },
		function(err, product){
			if(err){
				res.send({'message':'Some error in fetching product from mongodb'});
			}else{
				if(product){
					res.send(product);
				}else{
					res.send({'message':'Not found'});
				}
			}
			return next();
		});
}
function updateProduct(req, res, next){
	Product.update( {'productCode' : req.params.id },
		{	name : req.params.name,
			qty : req.params.qty,
			price : req.params.price },
			function(err){
				if(err){
					res.send({'message':'Some error while updating product in MongoDB'});
				}else{
					res.send({'message':'producted updated'});
				}
			});
	return next();
}
function deleteProduct(req, res, next){
	Product.findOneAndRemove({'productCode' : req.params.id },
		function(err){
			if(err){
				res.send({'message':'Some error while deleting product to mongoDB'});
			}else{
				res.send({'message':'product deleted'});
			}
		});
	return next();
}

function addNewProduct(req, res, next){
	var product = new Product();
	product.name = req.params.name;
	product.qty = req.params.qty;
	product.price = req.params.price;
	product.save(function(err, data){
		if(err){
			res.send({'message':'Some error while saving product to mongoDB'});
		}else{
			res.send(data);
		}
		return next();
	});
}
function getProducts(req, res, next){
	Product.find(function (err, data) {
		if (err){
			res.send({'message':'Some error in fetching products from mongodb'});
		}else{
			res.send(data);
		}
		return next();
	});
}
function addNewInvoice(req, res, next){
	var invoice = new Invoice();
	invoice.amount = req.params.amount;
	invoice.date = req.params.date;
	invoice.save(function(err, data){
		if(err){
			res.send({'message':'Some error while saving invoice to mongoDB'});
		}else{
			res.send(data);
		}
		return next();
	});
}
function getInvoices(req, res, next){
	Invoice.find(function (err, data) {
		if (err){
			res.send({'message':'Some error in fetching invoices from mongodb'});
		}else{
			res.send(data);
		}
		return next();

	});
}

// ### RESTIFY SERVER
var restify = require('restify'),
server = restify.createServer({
	name:'Invoice 360'
}),
restPort = process.env.PORT || 8889;

server.use(restify.fullResponse()); //CROS
server.use(restify.bodyParser()); //JSON RESPONSE

// Routes
server.get('/product/:id',	getProduct );
server.put('/product/:id',	updateProduct );
server.del('/product/:id',	deleteProduct );
server.post('/product',		addNewProduct );
server.get('/product',		getProducts );


server.post('/invoice', addNewInvoice);
server.get('/invoice',  getInvoices);


server.listen(restPort, function() {
	console.log(' Restigy server running at => Port : ' + restPort );
});