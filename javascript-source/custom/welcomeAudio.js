(function() {
	var debug = false;

	var ISettings = {
		settings: {
			cooldown: {
				type: 'number',
				value: 8	//Hours
			}
		},

		Load: function() {
			welcomeDebug("welcomeAudio Load");
			welcomeDebug($);
			welcomeDebug(ISettings.settings.cooldown.value);
			welcomeDebug(ISettings.settings['cooldown'].value);
			welcomeDebug($.getIniDbNumber('welcomeSettings', 'cooldown'));
			for (var key in ISettings.settings) {
				var found;
				switch (ISettings.settings[key].type) {
					case 'number':
						found = $.getIniDbNumber('welcomeSettings', key);
						break;
				}

				if (found != undefined) {
					ISettings.settings[key].value = found;
				} else {
					//Do nothing
				}

				welcomeDebug('Setting: ' + key + ': ' + found);
			}
		}
	}







	function hoursToMilliseconds(prmHours) {
		welcomeDebug("welcomeAudio hoursToMilliseconds " + prmHours);
		return prmHours * 60 * 60 * 1000;
	}

	function welcomeCommand(sender) {
		welcomeDebug("welcomeAudio welcomeCommand " + sender);
		var user = $.userStore.getUser(sender);
		var cooldown = hoursToMilliseconds(ISettings.settings.cooldown.value);
		var now = new Date().getTime();
		var difference = now - (user.getData('DateLastWelcome') || 0);

		welcomeDebug(user.Name);
		welcomeDebug(cooldown);
		welcomeDebug(now);
		welcomeDebug(difference);

		if (difference > cooldown){
			var audioHook = sender + ".welcome";
			if ($.audioHookExists(audioHook)) {
				$.panelsocketserver.triggerAudioPanel(audioHook);
				user.setData('DateLastWelcome', now);
			}
		}
	}

	function welcomePurgeCooldowns() {
		welcomeDebug("Purging Cooldowns...");
		var users = $.userStore.getAll();
		for (var userIndex in users) {
			var user = users[userIndex];
			welcomeDebug("User: " + user.Name);
			user.setData('DateLastWelcome',0);
		}
	}

	function welcomeDebug(prmLine) {
		if (debug) {
			$.consoleLn("[Welcome Sounds] " + prmLine);
		}
	}






	$.bind('command', function(event) {
		var sender = event.getSender().toLowerCase(),
			command = event.getCommand(),
			args = event.getArgs(),
			random;

		if (command.equalsIgnoreCase('hi')) {
			welcomeCommand(sender);
		}

		/*Panel Commands*/
		if (command.equalsIgnoreCase('reloadwelcome')) {    //DON'T FORGET TO REGISTER CHAT COMMAND BELOW
			if (!$.isBot(sender)) {
				return;
			}
			ISettings.Load();
			return;
		}

		if (command.equalsIgnoreCase('welcomepurgecooldowns')) {
			if (!$.isBot(sender)) {
				return;
			}
			welcomePurgeCooldowns();

			return;
		}
	});

	$.bind('initReady', function (event) {
		$.registerChatCommand('./custom/welcomeAudio.js', 'hi', 6);
		$.registerChatCommand('./custom/welcomeAudio.js', 'reloadwelcome', 30);
		$.registerChatCommand('./custom/welcomeAudio.js', 'welcomepurgecooldowns', 30);

		ISettings.Load();
	});
})();
