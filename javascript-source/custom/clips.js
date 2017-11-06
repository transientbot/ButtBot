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

                var result = Math.floor (Math.random () * 100 + 1);
                message = "";
                switch (result)
                {
                    case 1:
                        message = "I'd really rather not.";
                        break;
                    case 2:
                        message = "Ugh, fine, I'll add that clip for you.";
                        break;
                    case 3:
                        message = "But " + [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ][new Date ().getDay ()] + " is my day off!";
                        break;
                    case 4:
                        message = "I'll happily add that clip for you, " + sender;
                        break;
                    case 5:
                        message = "That'll be 10,000,000 butts please, " + sender;
                        break;
                    case 6:
                        message = "Grumble, mumble, making me do work on a " + [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ][new Date ().getDay ()] + "...";
                        break;
                    case 7:
                        message = "!clip " + args[0] + (args[1] ? " \"" + args[1] + "\" ": "") + "That's you.  That's what you sound like.";
                        break;
                    case 8:
                        message = "TransientGamers doesn't pay me enough for this.";
                        break;
                    case 9:
                        message = "You really think that moment was clip-worthy?";
                        break;
                    case 10:
                        message = "I'll add that to my list of things to do today.";
                        break;
                    default:
                        message = "Yeah, sure, I guess I can add that clip.";
                }
                $.say (message);
        	}
        }
    });

	$.bind('initready', function (event)
	{
		$.registerChatCommand('./custom/clips.js', 'clip', 6);
	});
})();
