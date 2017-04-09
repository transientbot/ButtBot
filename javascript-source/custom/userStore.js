(function() {
	function UserStore() {
		var me = this;
		var users = {};

		this.getAll = function() {
			return users;
		}

		this.getUser = function(prmName) {
			var userName = prmName.toLowerCase();
			if (!users.hasOwnProperty(userName)) {
				users[userName] = new User(userName);
			}

			return users[userName];
		}
	}

	function User(name) {
		var me = this;
		var dataStore = {};

		this.getData = function(prmItem) {
			if (dataStore.hasOwnProperty(prmItem)) {
				return dataStore[prmItem];
			} else {
				return null;
			}
		}

		this.setData = function(prmItem, prmVal) {
			dataStore[prmItem] = prmVal;
		}
	}

	$.userStore = new UserStore();
})();
