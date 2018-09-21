/*
 * counterCommand.js
 *
 * A general purpose counter.
 */
(function() {
	const ADD = 'add';
	const COMMAND = 'counter';
	const COUNTER_DIR = './addons/counter/';
	const DB_FILE = 'count';
	const DECR = 'decr';
	const FILE_SUFFIX = '.txt';
	const INCR = 'incr';
	const MINUS = '-';
	const PLUS = '+';
	const RESET = 'reset';
	const SET = 'set';
	const SUB = 'sub';

	/**
	 * Increment the counter by 1.
	 *
	 * @param {String} counter Counter to increment
	 */
	function add(counter) {
		const currentValue = getIntFromDb(counter);
		const newValue = currentValue + 1;

		change(counter, newValue);
	}

	/**
	 * Change the value of counter.
	 *
	 * @param {String} counter Counter to change
	 * @param {Number} count New value of counter
	 */
	function change(counter, count) {
		$.say($.lang.get('counter.change', counter, count));
		setDbValue(counter, count);
		updateFile(counter, count);
	}

	/**
	 * Print the value of counter.
	 *
	 * @param {String} counter Counter to print
	 */
	function echo(counter) {
		const value = parseInt($.inidb.get(DB_FILE, counter.toLowerCase()));

		if (isNaN(value)) {
			$.say($.lang.get('counter.error', counter));
		} else {
			$.say($.lang.get('counter.counter', counter, value));
		}
	}

	/**
	 * Get the full path of the counter file from the counter name.
	 *
	 * @param {String} counter Counter name
	 * @returns {string} full path of the counter file
	 */
	function getFilePath(counter) {
		return COUNTER_DIR + counter + FILE_SUFFIX;
	}

	/**
	 * Get int value from database.
	 *
	 * @param {String} dbKey Key to get value of
	 * @returns {number} Value of key
	 */
	function getIntFromDb(dbKey) {
		const value = parseInt($.inidb.get(DB_FILE, dbKey.toLowerCase()));

		return (isNaN(value)) ? 0 : value;
	}

	/**
	 * Reset the value of a counter to 0.
	 *
	 * @param {String} counter Counter to reset
	 */
	function reset(counter) {
		$.say($.lang.get('counter.reset', counter));
		setDbValue(counter, 0);
		updateFile(counter, 0);
	}

	/**
	 * Set the value of a counter.
	 *
	 * @param {String} counter Counter to set
	 * @param {Number} count New value of counter
	 */
	function set(counter, count) {
		if (isNaN(count)) {
			$.say('Usage: !' + COMMAND + ' <counter> set <value>');
		} else {
			$.say($.lang.get('counter.change', counter, count));
			setDbValue(counter, count);
			updateFile(counter, count);
		}
	}

	/**
	 * Set the value of key in the database.
	 *
	 * @param {String} key
	 * @param value
	 */
	function setDbValue(key, value) {
		$.inidb.set(DB_FILE, key.toLowerCase(), value);
	}

	/**
	 * Decrement
	 * @param counter
	 */
	function sub(counter) {
		const currentValue = getIntFromDb(counter);
		const newValue = currentValue - 1;

		if (newValue < 0) {
			$.say($.lang.get('counter.sub-zero', counter));
		} else {
			change(counter, newValue);
		}
	}

	/**
	 * @param {String} counter
	 * @param {Number} value
	 */
	function updateFile(counter, value) {
		if (value === undefined) {
			const countFromDb = getIntFromDb(counter);
			value = (isNaN(countFromDb)) ? 0 : countFromDb;
		}

		if (!$.isDirectory(COUNTER_DIR)) {
			$.mkDir(COUNTER_DIR);
		}

		$.writeToFile(value.toFixed(0), getFilePath(counter), false);
	}

	function usage() {
		$.say('Usage: !' + COMMAND + ' <counter> [add|sub|set|reset]');
	}

	/**
	 * @event command
	 */
	$.bind('command', function(event) {
		const command = event.getCommand();
		const args = event.getArgs();

		if (!command.equalsIgnoreCase(COMMAND)) {
			return;
		}

		if (args.length < 1) {
			usage();
			return;
		}

		const counter = args[0];
		const action = args[1];

		if (action === undefined) {
			echo(counter);
		} else if (action.equalsIgnoreCase(RESET)) {
			reset(counter);
		} else if (action.equalsIgnoreCase(SET)) {
			const value = parseInt(args[2]);
			set(counter, value);
		} else if (action.equalsIgnoreCase(ADD) || action.equalsIgnoreCase(INCR) || action.equalsIgnoreCase(PLUS)) {
			add(counter);
		} else if (action.equalsIgnoreCase(SUB) || action.equalsIgnoreCase(DECR) || action.equalsIgnoreCase(MINUS)) {
			sub(counter);
		} else {
			usage();
		}
	});

	/**
	 * @event initReady
	 */
	$.bind('initReady', function() {
		$.registerChatCommand('./commands/counterCommand.js', COMMAND, 7);

		$.registerChatSubcommand(COMMAND, RESET, 2);
		$.registerChatSubcommand(COMMAND, SET, 2);
		$.registerChatSubcommand(COMMAND, ADD, 2);
		$.registerChatSubcommand(COMMAND, INCR, 2);
		$.registerChatSubcommand(COMMAND, PLUS, 2);
		$.registerChatSubcommand(COMMAND, SUB, 2);
		$.registerChatSubcommand(COMMAND, DECR, 2);
		$.registerChatSubcommand(COMMAND, MINUS, 2);
	});

	/*
	 * Export functions to API 
	 */
	$.updateCounterFile = updateFile;
})();
