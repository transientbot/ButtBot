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

		welcomeDebug(user);
		welcomeDebug(cooldown);
		welcomeDebug(now);
		welcomeDebug(difference);

		if (difference > cooldown){
			var audioHook = sender + ".welcome";
			if ($.audioHookExists(audioHook)) {
				$.panelsocketserver.triggerAudioPanel(audioHook);
			}
			user.setData('DateLastWelcome', now);
		}
	}

	function welcomeDebug(prmLine) {
		if (debug) {
			$.consoleLn(prmLine);
		}
	}






	$.bind('command', function(event) {
		var sender = event.getSender().toLowerCase(),
			command = event.getCommand(),
			args = event.getArgs(),
			random;

		if (command.equalsIgnoreCase('hello')) {
			welcomeCommand(sender);
		}
	});

	$.bind('initready', function (event) {
		$.registerChatCommand('./custom/welcomeAudio.js', 'hello', 6);

		ISettings.Load();
	});

	$.reloadwelcome = ISettings.Load;
})();
