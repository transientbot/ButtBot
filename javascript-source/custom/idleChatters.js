(function() {
	var recentChatters = { };	// { "user" : [ last_word, previous_word ] }

	var active = false;
	var idlePoints = 0;
	var idleTime = 0;
	var randomTime = 0;

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
		idleTime = ($.inidb.get('idleSettings', 'idlehours') * 3600 +
				    $.inidb.get('idleSettings', 'idleminutes') * 60 +
				    $.inidb.get('idleSettings', 'idleseconds')) * 1000;
		randomTime = ($.inidb.get('idleSettings', 'randomhours') * 3600 +
				      $.inidb.get('idleSettings', 'randomminutes') * 60 +
				      $.inidb.get('idleSettings', 'randomseconds')) * 1000;
	}

	function idlePoints ()
	{
		return active && idlePoints;
	}

	function idlePointsDuration ()
	{
		return active && idleTime;
	}

	function idleRandomDuration ()
	{
		return active && randomTime;
	}

	$.bind('ircChannelMessage', function (event)
	{
		if (active)
		{
			receivedChatMessage (event.getSender().toLowerCase());
		}
	});

    $.reloadIdle = idleUpdate;

	$.receivedChatMessage = receivedChatMessage;
	$.mostRecentChatMessage = mostRecentChatMessage;
	$.previousChatMessage = previousChatMessage;
	$.getRecentChatters = getRecentChatters;

	$.idlePoints = idlePoints;
	$.idlePointsDuration = idlePointsDuration;
	$.idleRandomDuration = idleRandomDuration;

})();
