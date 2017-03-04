(function() {
	var recentChatters = { };	// { "user" : [ last_word, previous_word ] }
	var active = false;

	// Logging who said what and when.  And also previously when.
	function receivedChatMessage (who)
	{
		who = who.toLowerCase();
		time = new Date().getTime();

		if (recentChatters[who] != undefined)
		{
			recentChatters[who][1] = recentChatters[who][0];
			recentChatters[who][0] = time;
		}
		else
		{
			recentChatters[who] = [ time, 0 ];
		}
	}

	// Return the timestamp that the specified person last talked at.
	function mostRecentChatMessage(who)
	{
		return (recentChatters[who.toLowerCase()] != undefined ? recentChatters[who.toLowerCase()][0] : -1);
	}

	function previousChatMessage(who)
	{
		return (recentChatters[who.toLowerCase()] != undefined ? recentChatters[who.toLowerCase()][1] : -1);
	}

	function getRecentChatters(duration)
	{
		var ret = [ ];
		var time = new Date().getTime();

		if (!duration)
		{
			duration = time;
		}

		for (var name in recentChatters)
		{
			if (time - duration < recentChatters[name][0])
			{
				ret.push(name);
			}
		}

		return ret;
	}

	function idleUpdate ()
	{
		active = $.inidb.get('idleSettings', 'idle_toggle') == "true";
	}

	$.bind('ircChannelMessage', function (event)
	{
		if (active)
		{
			$.say ("Active is currently " + active + ".");
			receivedChatMessage (event.getSender().toLowerCase());
		}
	});

    $.reloadIdle = idleUpdate;
	$.receivedChatMessage = receivedChatMessage;
	$.mostRecentChatMessage = mostRecentChatMessage;
	$.previousChatMessage = previousChatMessage;
	$.getRecentChatters = getRecentChatters;

})();
