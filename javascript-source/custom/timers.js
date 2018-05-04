(function() {
	$.bind('command', function(event)
	{
		var sender = event.getSender(),
			command = event.getCommand(),
			args = event.getArgs(),
			random;
		
		if (command.equalsIgnoreCase('addtimer'))
		{
			if (args.length < 2)
			{
				$.say("Usage: !timer \"Reminder.\" <number of minutes>");
			}
			else
			{
				setTimeout(function () { $.say (args[0]); }, args[1] * 60 * 1000);
			}
		}
	});
	
	$.bind('initReady', function (event)
	{
		$.registerChatCommand('./custom/timers.js', 'addtimer', 2);
	});
})();