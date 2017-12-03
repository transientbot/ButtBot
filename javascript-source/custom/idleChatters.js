(function() {
	const LAST_WORD = 'DateChattedRecent';
	const PREV_WORD = 'DateChattedPrevious';

	var active = false;
	var activePoints = 0;
	var activeTime = 0;
	var idlePoints = 0;
	var idleTime = 0;
	var randomTime = 0;

	// Logging who said what and when.  And also previously when.
	function receivedChatMessage (who)
	{
		var user = $.userStore.getUser(who);
		var time = new Date().getTime();
		user.setData(PREV_WORD, user.getData(LAST_WORD));
		user.setData(LAST_WORD, time);
	}

	// Return the timestamp that the specified person last talked at.
	function mostRecentChatMessage(who)
	{
		var user = $.userStore.getUser(who);
		return (user.getData(LAST_WORD) != null) ? user.getData(LAST_WORD) : -1;
	}

	function previousChatMessage(who)
	{
		var user = $.userStore.getUser(who);
		return (user.getData(PREV_WORD) != null) ? user.getData(PREV_WORD) : -1;
	}

	function getRecentChatters(duration)
	{
		var allUsers = $.userStore.getAll();
		var ret = [ ];
		var time = new Date().getTime();

		if (!duration)
		{
			duration = time;
		}

		for (var name in allUsers)
		{
			if (time - duration < allUsers[name].getData(LAST_WORD))
			{
				ret.push(name);
			}
		}

		return ret;
	}

	function idleUpdate ()
	{
		active = $.getIniDbString('idleSettings', 'idle_toggle') == "true";

		activePoints = $.getIniDbNumber('idleSettings', 'activebonuspoints');
		activeTime = ($.getIniDbNumber('idleSettings', 'activehours') * 3600 +
					  $.getIniDbNumber('idleSettings', 'activeminutes') * 60 +
					  $.getIniDbNumber('idleSettings', 'activeseconds')) * 1000;

		idlePoints = $.getIniDbNumber('idleSettings', 'pointsreceived');
		idleTime = ($.getIniDbNumber('idleSettings', 'idlehours') * 3600 +
					$.getIniDbNumber('idleSettings', 'idleminutes') * 60 +
					$.getIniDbNumber('idleSettings', 'idleseconds')) * 1000;

		randomTime = ($.getIniDbNumber('idleSettings', 'randomhours') * 3600 +
					  $.getIniDbNumber('idleSettings', 'randomminutes') * 60 +
					  $.getIniDbNumber('idleSettings', 'randomseconds')) * 1000;
	}

	function getActivePoints ()
	{
		return active && activePoints;
	}

	function getIdlePoints ()
	{
		return active && idlePoints;
	}

	function activePointsDuration ()
	{
		return active && activeTime;
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
			if (!active) {
				$.say ($.whisperPrefix(sender, true) + " Idle timers are not currently active.");
				return;
			}
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
					var user = $.userStore.getUser(element);
					$.consoleLn(user);
					$.consoleLn(duration);
					$.consoleLn(now);
					ret += "" + element + " [" + convertMilliseconds (user.getData(LAST_WORD) + duration - now) + " to idle] ";
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

	$.bind('initReady', function (event)
	{
		$.registerChatCommand('./custom/idlechatters.js', 'reportidletimes', 2);
		$.registerChatCommand('./custom/idlechatters.js', 'reportactiveusers', 2);

		idleUpdate ();
	});

	$.reloadIdle = idleUpdate;

	$.receivedChatMessage = receivedChatMessage;
	$.mostRecentChatMessage = mostRecentChatMessage;
	$.previousChatMessage = previousChatMessage;
	$.getRecentChatters = getRecentChatters;

	$.activePoints = getActivePoints;
	$.activePointsDuration = activePointsDuration;

	$.idlePoints = getIdlePoints;
	$.idlePointsDuration = idlePointsDuration;

	$.idleRandomDuration = idleRandomDuration;

})();
