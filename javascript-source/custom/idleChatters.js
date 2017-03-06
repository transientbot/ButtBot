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
		idlePoints = $.inidb.get('idleSettings', 'pointsReceived');
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

	function convertMilliseconds (duration)
	{
		var ret = "";
		var n = Math.floor (duration / 3600000);
		if (n > 0)
		{
			ret += (n < 10 ? "0" : "") + n + ":";
			duration -= n * 3600000;
		}

		n = Math.floor (duration / 60000);
		if (ret != "" || n > 0)
		{
			ret += (n < 10 ? "0" : "") + n + ":";
			duration -= n * 60000;
		}

		n = Math.floor (duration / 1000);
		if (ret != "" || n > 0)
		{
			ret += (n < 10 ? "0" : "") + n + ".";
			duration -= n * 1000;
		}

		n = duration;
		ret += (n < 10 ? "0" : "") + (n < 100 ? "0" : "") + n;

		return ret;
	}

    $.bind('command', function(event) {
        var sender = event.getSender().toLowerCase(),
            command = event.getCommand(),
            args = event.getArgs(),
            random;

        if (command.equalsIgnoreCase('reportidletimes'))
        {
        	if (!args[0])
        	{
        		if (active)
        		{
        			$.say ($.whisperPrefix(sender, true) + "Points idle duration: " + convertMilliseconds ($.idlePointsDuration ()) + " and random idle duration: " + convertMilliseconds ($.idleRandomDuration()) + ".");
        		}
        		else
        		{
        			$.say ($.whisperPrefix(sender, true) + "Idle timers are not active, but they would be points: " + convertMilliseconds(idleTime) + " and random: " + convertMilliseconds(randomTime) + ".");
        		}
        	}
        }
        else if (command.equalsIgnoreCase('reportactiveusers'))
        {
        	if (!args[0] || (args[0] != "points" && args[0] != "random"))
        	{
        		$.say ($.whisperPrefix(sender, true) + "Usage:  !reportactiveusers [points | random]");
        	}
        	else
        	{
        		var duration;
        		if (args[0] == "points")
        		{
        			duration = $.idlePointsDuration();
        		}
        		else if (args[0] == "random")
        		{
        			duration = $.idleRandomDuration();
        		}

        		var ret = "";
        		var retval = $.getRecentChatters(duration);
        		var now = new Date().getTime();

        		retval.forEach(function (element, index, array)
        		{
        			ret += "" + element + " [" + convertMilliseconds (recentChatters[element][0] + duration - now) + " to idle] ";
        		});

        		if (retval.length == 0)
        		{
        			$.say ($.whisperPrefix (sender, true) + "Nobody is active at the moment.");
        		}
        		else if (retval.length == 1)
        		{
        			$.say ($.whisperPrefix (sender, true) + "The only active person is " + ret);
        		}
        		else
        		{
        			$.say ($.whisperPrefix (sender, true) + "The following people are active: " + ret);
        		}
        	}
        }
    });

	$.bind('ircChannelMessage', function (event)
	{
		if (active)
		{
			receivedChatMessage (event.getSender().toLowerCase());
		}
	});

	$.bind('initready', function (event)
	{
		$.registerChatCommand('./custom/idlechatters.js', 'reportidletimes', 2);
		$.registerChatCommand('./custom/idlechatters.js', 'reportactiveusers', 2);
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
