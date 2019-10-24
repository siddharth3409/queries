//JSON data
let inventaryRecords = require('./queries.json');

console.log(inventaryRecords); 

var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var path = require('path');

app.use(cookieParser());
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

const fs = require('fs');

app.delete('/delete', function(req, res) {
	var index =req.query.id;
	if(index == undefined){
		res.send("failed");
	}else{
		inventaryRecords.splice(index , 1);
		fs.writeFile('./queries.json', JSON.stringify(inventaryRecords) , (err) => {  
		if (err) {
			throw err;
			res.send("failed to update");

		}
		res.send("success");
		console.log('updated!');
	});
	}


});

app.post('/update', function(req, res) {
	console.log(req.body);
	if(req.body){
		inventaryRecords.push(req.body);
	}

	fs.writeFile('./queries.json', JSON.stringify(inventaryRecords) , (err) => {  
		if (err) {
			throw err;
			res.send("failed to update");

		}
		res.send("success");
		console.log('updated!');
	});
});
// add a line to a lyric file, using appendFile


app.get('/queries',function(req, res){
	if(req.query.id == undefined){
		res.send("failed");
	}else {
		if(req.query.id % 10 == 0 && (req.query.id-10) < inventaryRecords.length){
			res.send(inventaryRecords.slice((req.query.id -10),req.query.id));
		}else{
			res.send("Send proper count");

		}
	}
})


app.listen(3000, function(){
	console.log('server running at port 3000');
})