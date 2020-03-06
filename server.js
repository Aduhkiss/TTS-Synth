const express = require('express');
const app = express();
const say = require('say');
const path = require('path');
const uuid = require('uuid');

app.get('/', (req, res) => {
	res.send("OK");
});

app.get('/api/get/:id', (req, res) => {
	res.sendFile(__dirname + "/public/" + req.params.id);
});

app.get('/api/save/:message', (req, res) => {
	var message = req.params.message;
	// TODO: Generate a random filename from a UUID
	var filename = uuid.v4() + ".wav";
	var place = path.join(__dirname + "/public/", filename);
	say.export(message, 'Microsoft David Desktop', 0.75, place, (err) => {
	  if (err) {
		res.send(err);
		return console.error(err)
	  }

	  console.log('Text has been saved to: ' + place);
	  res.send(filename);
	});
});

app.get('/api/voices', (req, res) => {
	say.getInstalledVoices(() => {
		
	});
});

app.listen(80, () => {
	console.log("App Running.");
});