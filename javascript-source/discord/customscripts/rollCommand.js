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
            action = args[0],
            subAction = args[1];

        /**
         * @discordcommandpath addcom [command] [response] - Adds a custom command to be used in your Discord server.
         */
        if (command.equalsIgnoreCase('roll')) {
            var results = ReadDice(args[0]);

            $.discord.say(channel, $.discord.userPrefix(mention) + ' rolled: ' + results);
        }
    });

    /**
     * @event initReady
     */
    $.bind('initReady', function() {
        if ($.bot.isModuleEnabled('./discord/customscripts/rollCommand.js')) {
            $.discord.registerCommand('./discord/customscripts/rollCommand.js', 'roll', 0); // Permissions are 0: everyone, 1: administrators.

            // $.unbind('initReady'); Needed or not?
        }
    });
})();
