(function() {
    $.bind('command', function(event) {
        var sender = event.getSender().toLowerCase(),
            command = event.getCommand(),
            args = event.getArgs(),
            random;

        if (command.equalsIgnoreCase('clip'))
        {
        	if (args[0] && args[0].startsWith("https://clips.twitch.tv/"))
        	{
        		$.discord.say('tg-clips', args[0])
        	}
        }
    });

	$.bind('initready', function (event)
	{
		$.registerChatCommand('./custom/clips.js', 'clip', 6);
	});
})();
