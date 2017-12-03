(function() {

	var TIMEOUT = 5 * 60 * 1000;	// How much time (in milliseconds) until the user can get a new rank.

	var individualUserRanks = $.loadIndividualRanks ();

	var cachedRanks = { };

  function checkIndividualRanks (user)
	{
		var time = new Date().getTime();

		if (cachedRanks[user] != undefined && cachedRanks[user][1] > time)
		{
			return cachedRanks[user][0];
		}
		else if (individualUserRanks[user] != undefined)
		{
			var ranks = [ "Transient Gamer" ].concat(individualUserRanks[user]);  // Everyone is a Transient Gamer
			var n = Math.floor (Math.random() * ranks.length);
			cachedRanks [user] = [ ranks[n], time + TIMEOUT ];
			return cachedRanks[user][0];
		}
		else if ($.getIniDbBoolean('followed', user, false))
		{
			return "Transient Gamer";
		}
		return "Viewer";
	}

	$.checkIndividualRanks = checkIndividualRanks;
})();
