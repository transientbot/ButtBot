(function() {
	var isOpened = false,
	 	info = {},
		queue = {};

	/*
	 * @function clear
	 */
	function clear() {
		queue = {};
		info = {};
		isOpened = false;
		$.inidb.RemoveFile('queue');
	}

	/*
	 * @function clearCommand
	 *
	 * @param {String} username
	 */
	function clearCommand(username) {
		clear();
		$.say($.whisperPrefix(username) + $.lang.get('queuesystem.clear.success'));
	}

	/*
	 * @function close
	 */
	function close() {
		isOpened = false;
	}

	/*
	 * @function closeCommand
	 *
	 * @param {String} username
	 */
	function closeCommand(username) {
		if (isOpened === false) {
			$.say($.whisperPrefix(username) + $.lang.get('queuesystem.close.error'));
			return;
		}

		close();
		$.say($.lang.get('queuesystem.close.success'));
	}

	/*
	 * @function date
	 *
	 * @param  {Number} time
	 * @return {String}
	 */
	function date(time, simple) {
		var date = new Date(time),
			format = new java.text.SimpleDateFormat('HH:mm:ss z'),
			seconds = Math.floor((new Date() - time) / 1000),
			string = $.getTimeString(seconds);

		format.setTimeZone(java.util.TimeZone.getTimeZone(($.inidb.exists('settings', 'timezone') ? $.inidb.get('settings', 'timezone') : 'GMT')));
		if (simple === undefined) {
			return format.format(date) + ' ' + $.lang.get('queuesystem.time.info', string);
		} else {
			return format.format(date);
		}
	}

	/*
	 * @function join
	 *
	 * @param {String} username
	 * @param {String} action
	 */
	function join(username, action) {
		queue[username] = {
			tag: (action === undefined ? '' : action),
			position: Object.keys(queue).length,
			time: new Date(),
			username: username
		};

		var temp = {
			'tag' : String((action === undefined ? '' : action)),
			'time': String(date(new Date(), true)),
			'position': String(Object.keys(queue).length),
			'username': String(username) };

		$.inidb.set('queue', username, JSON.stringify(temp));
	}

	/*
	 * @function joinCommand
	 *
	 * @param {String} username
	 * @param {String} action
	 * @param {String} command
	 */
	function joinCommand(username, action, command) {
		if (queue[username] !== undefined) {
			$.say($.whisperPrefix(username) + $.lang.get('queuesystem.join.error.joined'));
			$.returnCommandCost(username, command, $.isMod(username));
		} else if (info.size !== 0 && (info.size <= Object.keys(queue).length)) {
			$.say($.whisperPrefix(username) + $.lang.get('queuesystem.join.error.full'));
			$.returnCommandCost(username, command, $.isMod(username));
		} else if (isOpened === false) {
			$.returnCommandCost(username, command, $.isMod(username));
		} else {
			join(username, action);
			position(username);
		}
	}

	/*
	 * @function leaveCommand
	 *
	 * @param {String} username
	 */
	function leaveCommand(username) {
		if (queue[username.toLowerCase()] === undefined) {
			$.say($.whisperPrefix(username) + $.lang.get('queuesystem.remove.self.404'));
		} else {
			remove(username);
			$.say($.whisperPrefix(username) + $.lang.get('queuesystem.remove.self.removed', username));
		}
	}
	/*
	 * @function list
	 */
	function list() {
		var keys = Object.keys(queue);
		var queuePositions = [];
		var position = 1;

		for (var key in keys) {
			queuePositions.push('#' + (position++) + ': ' + queue[keys[key]].username);
		}

		return queuePositions;
	}

	/*
	 * @function listCommand
	 *
	 * @param {String} username
	 */
	function listCommand(username) {
		var queuePositions = list();

		if (queuePositions.length === 0) {
			$.say($.whisperPrefix(username) + $.lang.get('queuesystem.queue.list.empty'));
		} else if (queuePositions.length < 10) {
			$.say($.lang.get('queuesystem.queue.list', queuePositions.join(', ')));
		} else {
			$.say($.lang.get('queuesystem.queue.list.limited',
							 queuePositions.splice(0, 5).join(', '),
							 (queuePositions.length - 5)));
		}
	}

	/*
	 * @function next
	 *
	 * @param {String} action
	 */
	function next(action) {
		var total = (action === undefined || isNaN(parseInt(action)) ? 1 : parseInt(action));
		var keys = Object.keys(queue);
		var picks = [];
		var pickNumber = 1;

		for (var key in keys) {
			if (total >= pickNumber && picks.length < 400) {
				picks.push('#' + pickNumber + ': ' + queue[keys[key]].username);
				pickNumber++;
			} else {
				break;
			}
		}

		return picks;
	}


	/*
	 * @function nextCommand
	 *
	 * @param {String} username
	 * @param {String} action
	 */
	function nextCommand(username, action) {
		var picks = next(action);

		if (picks.length !== 0) {
			$.say($.whisperPrefix(username) + $.lang.get('queuesystem.queue.next', picks.join(', ')));
		} else {
			$.say($.whisperPrefix(username) + $.lang.get('queuesystem.queue.list.empty'));
		}
	}

	/*
	 * @function open
	 *
	 * @param {Number} size
	 * @param {String} title
	 */
	function open(size, title) {
		var maxSizeParse = parseInt(size);
		var maxSize = (isNaN(maxSizeParse)) ? 0 : maxSizeParse;

		info = {
			size: maxSize,
			time: new Date(),
			title: title
		};
		isOpened = true;
	}

	/*
	 * @function openCommand
	 *
	 * @param {String} username
	 * @param {Number} size
	 * @param {String} title
	 */
	function openCommand(username, size, title) {
		if (isOpened === true) {
			$.say($.whisperPrefix(username) + $.lang.get('queuesystem.open.error.opened'));
		} else if (size === undefined || isNaN(parseInt(size))) {
			$.say($.whisperPrefix(username) + $.lang.get('queuesystem.open.error.usage'));
		} else if (title === undefined) {
			$.say($.whisperPrefix(username) + $.lang.get('queuesystem.open.usage'));
		} else if (Object.keys(queue).length !== 0) {
			$.say($.whisperPrefix(username) + $.lang.get('queuesystem.open.error.clear'));
		} else {
			open(username, size, title);

			if (parseInt(size) === 0) {
				$.say($.lang.get('queuesystem.open.normal', title));
			} else {
				$.say($.lang.get('queuesystem.open.limit', size, title));
			}
		}
	}

	/*
	 * @function pick
	 *
	 * @param {String} action
	 */
	function pick(action) {
		var total = (action === undefined || isNaN(parseInt(action)) ? 1 : parseInt(action));
		var keys = Object.keys(queue);
		var picks = [];
		var pickNumber = 1;

		for (var key in keys) {
			if (total >= pickNumber && picks.length < 400) {
				var gamertag = (queue[keys[key]].tag !== '' ? ' ' + $.lang.get('queuesystem.gamertag', queue[keys[key]].tag) : '');
				picks.push('#' + pickNumber + ': ' + queue[keys[key]].username + gamertag);
				pickNumber++;
			} else {
				break;
			}
		}

		resetPosition(pickNumber - 2);

		return picks;
	}

	/*
	 * @function pickCommand
	 *
	 * @param {String} username
	 * @param {String} action
	 */
	function pickCommand(username, action) {
		var picks = pick(action);

		if (picks.length !== 0) {
			$.say($.lang.get('queuesystem.pick', picks.join(', ')));
		} else {
			$.say($.whisperPrefix(username) + $.lang.get('queuesystem.queue.list.empty'));
		}
	}

	/*
	 * @function position
	 *
	 * @param {String} username
	 * @param {String} action
	 */
	function position(username, action) {
		if (action === undefined) {
			if (queue[username] !== undefined) {
				$.say($.whisperPrefix(username) + $.lang.get(
					'queuesystem.position.self', queue[username].position + 1, date(queue[username].time)));
			} else {
				$.say($.whisperPrefix(username) + $.lang.get('queuesystem.position.self.error'));
			}
		} else {
			action = action.toLowerCase();
			if (queue[action] !== undefined) {
				$.say($.whisperPrefix(username) + $.lang.get(
					'queuesystem.position.other', action, queue[action].position + 1, date(queue[action].time)));
			} else {
				$.say($.whisperPrefix(username) + $.lang.get('queuesystem.position.other.error', action));
			}
		}
	}

	/*
	 * @function queueSubCommand
	 *
	 * @param {String} sender
	 * @param {Array} args
	 */
	function queueSubCommand(sender, args, command) {
		var action = args[0];
		var subAction = args[1];

		if (action === undefined) {
			$.say($.whisperPrefix(sender) + $.lang.get('queuesystem.usage'));
			return;
		}

		/*
		 * @commandpath queue open [max size] [title] - Opens a new queue. Max size is optional.
		 */
		if (action.equalsIgnoreCase('open')) {
			var isNotANumber = isNaN(parseInt(subAction));
			var size = isNotANumber ? 0 : subAction;
			var title = isNotANumber ? args.slice(1).join(' ') : args.slice(2).join(' ');

			openCommand(sender, size, title);
		}

		/*
		 * @commandpath queue close - Closes the current queue that is opened.
		 */
		else if (action.equalsIgnoreCase('close')) {
			closeCommand(sender);
		}

		/*
		 * @commandpath queue clear - Closes and resets the current queue.
		 */
		else if (action.equalsIgnoreCase('clear')) {
			clearCommand(sender);
		}

		/*
		 * @commandpath queue remove [username] - Removes that username from the queue.
		 */
		else if (action.equalsIgnoreCase('remove')) {
			removeCommand(sender, subAction);
		}

		/*
		 * @commandpath queue leave - Remove user from the queue
		 */
		else if (action.equalsIgnoreCase('leave')) {
			leaveCommand(sender);
		}

		/*
		 * @commandpath queue list - Gives you the current queue list. Note that if the queue list is very long it will only show the first 5 users in the queue.
		 */
		else if (action.equalsIgnoreCase('list')) {
			listCommand(sender);
		}

		/*
		 * @commandpath queue leave - Remove user from the queue
		 */
		else if (action.equalsIgnoreCase('join')) {
			joinCommand(sender, args.join(' '), command);
		}

		/*
		 * @commandpath queue next [amount] - Shows the players that are to be picked next. Note if the amount is not specified it will only show one.
		 */
		else if (action.equalsIgnoreCase('next')) {
			nextCommand(sender, subAction);
		}

		/*
		 * @commandpath queue pick [amount] - Picks the players next in line from the queue. Note if the amount is not specified it will only pick one.
		 */
		else if (action.equalsIgnoreCase('pick')) {
			pickCommand(sender, subAction);
		}

		/*
		 * @commandpath queue position [username] - Tells what position that user is in the queue and at what time he joined.
		 */
		else if (action.equalsIgnoreCase('position')) {
			position(sender, subAction);
		}

		/*
		 * @commandpath queue info - Gives you the current information about the queue that is opened
		 */
		else if (action.equalsIgnoreCase('info')) {
			stats(sender);
		}
	}

	/*
	 * @function resetPosition
	 */
	function resetPosition(splice) {
		var keys = Object.keys(queue),
			t = 0,
			i;

		for (i in keys) {
			if (splice !== -1 && t <= splice) {
				$.inidb.del('queue', keys[i]);
				delete queue[keys[i]];
			}
			t++;
		}

		keys = Object.keys(queue);
		t = 1;
		$.inidb.setAutoCommit(false);
		for (i in keys) {
			queue[keys[i]].position = t;
			var temp = JSON.parse($.inidb.get('queue', keys[i]));
			temp.position = t;
			$.inidb.set('queue', keys[i], JSON.stringify(temp));
			t++;
		}
		$.inidb.setAutoCommit(true);
	}

	/*
	 * @function remove
	 *
	 * @param {String} username
	 */
	function remove(username) {
		delete queue[username.toLowerCase()];
	}

	/*
	 * @function removeCommand
	 *
	 * @param {String} username
	 * @param {String} action
	 */
	function removeCommand(username, action) {
		if (action === undefined) {
			$.say($.whisperPrefix(username) + $.lang.get('queuesystem.remove.usage'));
		} else if (queue[action.toLowerCase()] === undefined) {
			$.say($.whisperPrefix(username) + $.lang.get('queuesystem.remove.other.404'));
		} else {
			remove(action);
			$.say($.whisperPrefix(username) + $.lang.get('queuesystem.remove.other.removed', action));
		}
	}

	/*
	 * @function stats
	 *
	 * @param {String} username
	 */
	function stats(username) {
		if (isOpened === true) {
			$.say($.lang.get('queuesystem.info.success', info.title, Object.keys(queue).length, info.size, date(info.time)));
		} else {
			$.say($.whisperPrefix(username) + $.lang.get('queuesystem.close.error'));
		}
	}

	/*
	 * @event command
	 */
	$.bind('command', function(event) {
		var sender = event.getSender(),
			command = event.getCommand(),
			args = event.getArgs();

		if (command.equalsIgnoreCase('queue')) {
			queueSubCommand(sender, args, command);
		} else if (command.equalsIgnoreCase('joinqueue')) {
			/*
		     * @commandpath joinqueue [gamertag] - Adds you to the current queue. Note that the gamertag part is optional.
		     */
			joinCommand(sender, args.join(' '), command);
		} else if (command.equalsIgnoreCase('leavequeue')) {
			leaveCommand(sender);
		}
	});

	$.bind('initReady', function() {
		$.registerChatCommand('./systems/queueSystem.js', 'joinqueue', 7);
		$.registerChatCommand('./systems/queueSystem.js', 'leavequeue', 7);
		$.registerChatCommand('./systems/queueSystem.js', 'queue', 7);

		$.registerChatSubcommand('queue', 'open', 1);
		$.registerChatSubcommand('queue', 'close', 1);
		$.registerChatSubcommand('queue', 'clear', 1);
		$.registerChatSubcommand('queue', 'remove', 1);
		$.registerChatSubcommand('queue', 'pick', 1);
		$.registerChatSubcommand('queue', 'leave', 3);
		$.registerChatSubcommand('queue', 'list', 3);
		$.registerChatSubcommand('queue', 'join', 3);
		$.registerChatSubcommand('queue', 'next', 3);
		$.registerChatSubcommand('queue', 'info', 3);
		$.registerChatSubcommand('queue', 'position', 3);
	});

	/**
	 * @event webPanelSocketUpdate
	 */
	$.bind('webPanelSocketUpdate', function(event) {
		if (event.getScript().equalsIgnoreCase('./systems/queueSystem.js')) {
			var action = event.getArgs()[0];

			if (action.equalsIgnoreCase('open')) {
				openCommand($.channelName, event.getArgs()[1], event.getArgs().slice(2).join(' '));
			} else if (action.equalsIgnoreCase('close')) {
				closeCommand($.channelName);
			} else if (action.equalsIgnoreCase('pick')) {
				pickCommand($.channelName, event.getArgs()[1]);
			} else if (action.equalsIgnoreCase('remove')) {
				if (event.getArgs()[1] !== undefined && queue[event.getArgs()[1]] !== undefined) {
					$.consoleLn('remove:' + event.getArgs()[1]);
					delete queue[event.getArgs()[1].toLowerCase()];
					$.inidb.del('queue', event.getArgs()[1].toLowerCase());
					resetPosition(-1);
				}
			} else if (action.equalsIgnoreCase('clear')) {
				queue = {};
				info = {};
				isOpened = false;
				$.inidb.RemoveFile('queue');
			}
		}
	});
})();
