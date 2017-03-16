/**
 * This module is to handle custom commands for discord.
 */
(function() {
    function ReadDice(inputStr) {
      var regex = /(\d+)d(\d+)/g;
      var retVal = inputStr;
      var matches = [];

      while (matches = regex.exec(inputStr)) {
        if (matches[1] < 2500) {
            retVal = retVal.replace(matches[0], RollDice(matches[1],matches[2]));
        }
      }

      return retVal;
    }

    function RollDice(num, type) {
        var retVal = 0;
        for (i=num; i>0; i--) {
          retVal += getRandomInt(1,type);
        }
      return retVal;
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * @event discordCommand
     */
    $.bind('discordCommand', function(event) {
        var sender = event.getSender(),
            channel = event.getChannel(),
            command = event.getCommand(),
            mention = event.getMention(),
            args = event.getArgs(),
            action = args[0];

        if (command.equalsIgnoreCase('roll')) {
          $.discord.say(channel, "Roll command received.  [Testing purposes, remove this once a response happens.]");
          if (action === undefined) {
            $.discord.say(channel, $.discord.userPrefix(mention) + "Usage:  !roll [x]d[y]");
          } else {
            var results = ReadDice(args.join(' '));

            $.discord.say(channel, $.discord.userPrefix(mention) + ' rolled: ' + results);
          }
        }
    });

    /**
     * @event initReady
     */
    $.bind('initReady', function() {
        $.discord.registerCommand('./discord/customscripts/rollCommand.js', 'roll', 0); // Discord permissions are 0: everyone, 1: administrators.
    });
})();
