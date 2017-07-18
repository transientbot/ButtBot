(function() {
    $.bind('command', function(event) {
        var sender = event.getSender(),
            command = event.getCommand(),
            args = event.getArgs(),
            random;

        if (command.equalsIgnoreCase('clip'))
        {
        	if (args[0] && args[0].startsWith("https://clips.twitch.tv/"))
        	{
                var message = args[0];
                if (args[1])
                {
                    message += " \"" + args[1] + "\"";
                }
                message += " - clipped by " + sender;

        		$.discord.say('tg-clips', message);
                $.say ("Yeah, sure, I guess I can add that clip.");
        	}
        }
    });

	$.bind('initready', function (event)
	{
		$.registerChatCommand('./custom/clips.js', 'clip', 6);
	});
})();
