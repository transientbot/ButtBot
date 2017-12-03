/**
 * This module is to handle custom commands for discord.
 */
(function() {
  function EvaluateDice(prmStr) {
	var regex = /\[.*?\]/g;
	var matches = prmStr.match(regex);
	var retVal = '';
	if (matches === null) {
	  retVal = '[' + ReadDice(prmStr) + ']';
	} else {
	  while (matches.length) {
		retVal += '[' + ReadDice(matches.shift().replace(/[\[\]]/g, '')) + ']';
		if (matches.length > 0) retVal += ' ';
	  }
	}
	return retVal;
  }

  function ReadDice(inputStr) {
	var regex = /(\d+)d(\d+)/g;
	var retVal = inputStr;
	var matches = [];

	while (matches = regex.exec(inputStr)) {
	  if (matches[1] < 2500) {
		retVal = retVal.replace(matches[0], RollDice(matches[1], matches[2]));
	  }
	}

	retVal = StripWhiteSpace(retVal);

	var termsArray = SeparateTerms(retVal);

	retVal = (termsArray[0].length > 0) ? AddTerms(termsArray[0]) : '' + termsArray[1];

	return retVal;
  }

  function RollDice(num, type) {
	var retVal = 0;
	for (i = num; i > 0; i--) {
	  retVal += getRandomInt(1, type);
	}
	return retVal;
  }

  function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function StripWhiteSpace(prmStr) {
	var retVal = prmStr;
	retVal = retVal.replace(/\s/g, '');
	return retVal;
  }

  function SeparateTerms(prmStr) {
	var invalidTerms = '';
	var regex = /([+-]*(\s|\d)*([^\d+-])+[\d\w]*)/g;
	var matches = prmStr.match(regex) || [];
	while (matches.length) {
	  invalidTerms += matches.shift();
	}

	var validTerms = prmStr.replace(regex, '');

	return [validTerms, invalidTerms];
  }

  function AddTerms(s) {
	var total = 0;
	var s = s.match(/[+\-]*(\.\d+|\d+(\.\d+)?)/g) || [];
	while (s.length) {
	  total += parseFloat(s.shift());
	}
	return total;
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
		if (action === undefined) {
		  $.discord.say(channel, $.discord.userPrefix(mention) + "Usage:  !roll [x]d[y]");
		} else {
		  var results = EvaluateDice(args.join(' '));

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
