var friend = require('../data/friends.js');

module.exports = function(app){
	app.get('/api/friends', function(req, res){
	res.json(friend);
});

app.post('/api/friends', function(req, res){
	var bestMatch = {
			name: "",
			photo: "",
			friendDifference: 100
	};

	var userData = req.body;
	var userName = userData.name;
	var userPhoto = userData.photo;
	var userScores = userData.scores;

	var totalDifference = 0;

	for  (var i=0; i< friend.length; i++) {
		console.log(friend[i].name);
		totalDifference = 0;
		for (var j=0; j< friend[i].scores[j]; j++){
			totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friend[i].scores[j]));
			if (totalDifference <= bestMatch.friendDifference){
				bestMatch.name = friend[i].name;
				bestMatch.photo = friend[i].photo;
				bestMatch.friendDifference = totalDifference;
			}
		}
	}

	friend.push(userData);
	res.json(bestMatch);

	});

}