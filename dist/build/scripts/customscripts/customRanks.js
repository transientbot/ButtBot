(function() {

	var TIMEOUT = 5 * 60 * 1000;	// How much time (in milliseconds) until the user can get a new rank.

	var individualUserRanks = {
		"invariel" : [  "Faxanadu World Record", "Java Wizard", "TAS Expert", "Silky Bass Voice", "Grizz Den Resident", "Blessing Rains", "Loves Paul", "Xander Fan", "U A BUTT", "Selfless Giver", "Bot Champion" ],
		"stefford56" : [ "Swedish Ambassador", "Former Kitchen Streamer", "Channel Optimist",  "Diablo Addict", "Bedroom Streamer", "Rippin' Vapes", "Vape Nation", "Noisy Chair", "Swedish Meatball", "EAT COMINO" ],
		"syconawt" : [  "Fellow Audiophile", "Live Sound Engineer", "Electronic Magician", "Siconawt", "Touching Fish", "#BlamingDan", "#SoManyTracks", "It's A Sign", "Blessing Rains", "Potato" ],
		"tacomental" : [  "Mental Taco", "Probably Commuting", "Razer Praiser", "Curly-Haired Wonder", "MysteryMote", "Aspiring Game Designer", "Overwatch Addict" ],
		"terminus345" : [  "termibby", "LFS Sub", "Isaac Pro", "Seewaah Mod", "Lara Lover", "Meme Master", " LUL ", "Lord of Copy Pasta", "Grizz Den Resident" ],
		"tomoegoto" : [  "Food Porn", "Professional Raider", "90s Kid", "Tennessean", "Pun Master", "Allergies!", "Tomato", "Netgear n00b", "Retro Gamer", "Free Bin Connoisseur", "OverBro", "Needs Portal Gun", "Nashvillain", "Getting Food", "iPad User", "Juror", "In a Suit", "#FreeTomo", "Horror Fanatic", "Clip Pro", "Drunk", "BBQ Pork", "Internet People", "500 Hour Club" ],
		"captaintooshee" : [  "Toosh", "Dooshie", "Best Haircut", "Stardew Valley Addict" ],
		"versaci420" : [  "PS4 Twitch App User", "Sexy Voice", "CleverLeviathan Mod", "versacibby", "Active Discord User" ],
		"vickbear" : [  "VickyBaby", "#2Clicks", "Fallaw Mah Man", "Isaac Pro", "vickDank" ],
		"volt_56" : [ "Push-to-Talk Expert", "Grizz Mod", "Better Than Volt_46"],
		"wlkns11" : [ "Sims Crafter", "Tardis Dweller", "Whovian",  "Manda the Mighty", "Prop Hunt Master", "Mac & Cheese Expert", "Discord Butt Judge", "SDV Addict" ],
		"zeverouis" : [  "Drunk Girl", "Top Donator", "12 Yr Old Boy", "Text-to-Speech Enthusiast", "Ms_Takanawa", "Vegas Pro Lover", "YouTube Addict", "Clip Master", "Loves SaggyTheSalty", "Broken Headset User", "Fruity Loop", "CAPS SHOUTER", "\"Chef\"", "Skyrim Obsessed", "Spoiler Worried", "Butt Muncher" ],
		"andirigible" : [  "Mom Gamer", "Mass Effect Expert", "Murdering Companions", "Potatoshop", "Retro Gamer", "Aradia's Slave", "Tardis Dweller", "Prego", "NERD", "Aboard the Airship", "Not Andi", "Zelda Fan", "Pyrex Pie", "Dungeon Master", " andiAwesome ", "Penis Cable", "DM Extraordinaire", "Palace of the Doors", "Probs Sick", "Destiny Champion", "Napping" ],
		"baconboy1995" : [ "Bass Lover",  "Baconbby", "U A BUTT", "Live Sound", "Fellow Audiophile", "Shit Internet" ],
		"batiekear" : [  "oh hai", "FFVII Fanatic", "Blogger", "Raid Hater", "Katie Bear", "Twitter Schizo", "69 lul", "Amazon Connoisseur", "BatieKearots", "Pyromaniac" ],
		"bonnielassblog" : [ "Scottish Wannabe", "Sims Creator",  "Jewlery Crafter", "Bad Ass Bonnie", "Allergy Sufferer", "SDV Addict" ],
		"itsbreadtime" : [  "Suuh Duu", "AG", "Bread Morning!", "Pokemon Master", "Quack", "Duck", "What Time is It?", "STACK", "August", "Yall Booty", "Chef Extraordinaire", "Hostiest Host", "Toastiest Toast", "As Fuck AF", "Nerd", "Akcis the Outsider", "Battleborn Lover", "Saltywatch", "Butt Muncher" ],
		"capncrinklepants" : [  "Dirigible Hitched", "Aradia's Pokemon Partner", "PC Troubleshooter", "Meluvius Racha", "ResidentDrummer", "TGCraft Admin", "\"Working\"", "Destiny Raid Ruiner", "Rebuffed by batie x5", "TG Tech Support", "Butt Lover Tier" ],
		"chronocat81" : [  "Ancient Grill Gamer", "Alcohol Connoisseur", "Badass Tattoos", "Secret Agent", "Kupo", "What's New ChronoCat", "Game Gifter", "Yu-Gi-Oh! Fan" ],
		"crutonjohn" : [  "SYS ADMIN", "Buck", "Selfless Donator", "Rocket League Pro", "Poo Pee", "Troubleshooter Pro", "Vape Nation", "Bomb Dropper", "Lit AF", "Ben Shapiro Lover" ],
		"damastavanitas" : [  "DaMastaBooty", "Texan" ],
		"delmona12" : [ "Half of #TeamDel", "Delmona Lisa", "Refuse Booze",  "Texan", "New Leaf Mayor", "Pokemon Master", "Rat Lover", "SDV Addict", "Emerald Snatcher", "Puppy Lover", "Minecraft Mogul", "Loves Frontier", "IRL Friend", "Citi-Del", "Giftwrap Speedrunner", " delRoll" ],
		"delphoxglove" : [ "Paragon Vanguard",  "Brighton Mayor", "Riley Shepard", "ResidentPooper", "Unholy Underwear", "Douchecanoe", "Dolphin Wranglin'", "Myspace Poser", "DelPOX", "Turd", "Derphox", "Butt Stuff", "Bearded Legs", "SDV Addict", "Farm Grown", "Probably Pooping", "Discord Butt Judge", "Busy Taking Selfies", "Delfartglove", "Get Out of Bed", "Updating Twitter Pic..", "Milkbone Underwear", "#Brealphox", "#Delphread", "#ItsDelphTime", "Nerd", "Wiener", " phoxSmirk ", "IRL Friend", "Secretly a Reaper", "Elen Arel", "Clip Master", "I WILL YOU BE THE GOD", "Star Wars Nerd", "500 Hour Club", "Butt Muncher", "Willow Sucks, Okay?", "Loves Xander", "Blanket Wedgie", "No New Titles" ],
		"dimmu_borgir75" : [  "Tyler BAE", "Tyrone", "Heist Fuck-up", "Zombs W FOLLOWERS" ],
		"dovahcod" : [  "Aggy Stalker", "ModTheSalty", "Finnish Ambassador", "dovahbby" ],
		"the_draconian" : [ "Justin the Beautiful",  "NSFW", "Lewd", "Get Out the Paddle", "Leather Collar", "Professional Flirt", "OverBro", "Chocolate Strawberry", "Excel Wizard", "69", "Dark Souls Expert", "Dubstep Dabbler", "Smaug Chibi", "Butt Contest Winner", "Discord Dater", "Selfless Giver", "Graduate!", "Mod Extraordinaire", "Dildo Connoisseur", "Dildo Seesaw LLC", " dracStick ", "100% Shock", "Squeaky Chew Toy", "Dat Long Hair Tho", "Yethrin Tarsk", "Aleera Adorer" ],
		"felijja" : [  "Swedish Ambassador" ],
		"sgt_fidget" : [  "Crispy Mic", "Fellow ZIM Fan", "Destiny Player", "Pro Green Screen", "\"Lights\"", "Secretly Uses Walkthroughs" ],
		"masta_glenn" : [  "JRPG Fan", "Selfless Donator", "Music Masta", "Jumpscare Asshat", "whatsarasaid" ],
		"gnaistplays" : [  "Mikey", "NerdFighter", "Kingdom Hearts Lover", "Marathon Runner", "PhD Defense Champion", "Mathmagician", "DFTBA" ],
		"brothergrimmy" : [  "Guitar Shredder", "Bowling Champion", "Ass Effect Expert", "Butt Contest Runner-up" ],
		"grizzlyguygaming" : [  "Binding of Isaac Expert", "Old Fart Glasses", "Metal Gear Solid Fanboy", "Partnered Streamer", "Homie Dawg Dude", "Gwent \"Player\"", "Grizz Tok", "Denizen Resident", "Tuscon Hermit" ],
		"igina" : [  "Stardew Expert", "Fellow Bon Jovi Fan", "Michael Jackson Fan", "Smokealoke Sub", "Ballerina", "Best Colonist", "Programmer Extraordinaire" ],
		"jammycatz" : [  "Dark Souls 3 Enthusiest", "Retweeter Extraordinaire" ],
		"jontasc" : [  "Not Maria", "Binding of Isaac Expert", "Runner", "Fellow New Yorker", "Busy Coding", "Grandpadaddy", "Jogging", "\"Working\"", "Having Dinner with Ex", "Pro Programmer", "TG Tech Support", "U A BUTT", "Online Dating" ],
		"lara_cr" : [  "Brazillian Beauty", "Amazing Artist", "Canadian D:" ],
		"dryroastedlemon" : [  "DUTCH", "Audiophile", "Procrastinating Teacher", "Musician", "Fingerpicking Pro", "Dope Dobro Player" ],
		"logiclemur3" : [  "Like My Ex Kappa", "OverBro", "Rocket League Demolition", "Borderlands Loot Stealer", "3", "Freshman", "Probably in a Lab", "In Class", "Chris Pratt Stalker", "Kill Me", "Best Roommate", "USE YOUR WORDS" ],
		"arcanelumi" : [ "Goobs Community Manager",  "#4Notes" ],
		"megabibarel" : [  "Canadian", "Artist", "Cartoonist", "Audiophile Wannabe", "Rocket League Shady Van", "WWE Fanatic", "GLORIOUS", "Dirt Ralley Pro", "Duck", "Quack" ],
		"mexicantime" : [  "Mexicant? PogChamp", "Denizen Mod", "Artist Extraordinaire" ],
		"overboredgaming" : [  "Probably Dagwood", "Fellow Buffy Fan", "And That's Fine" ],
		"hpaandas" : [  "Pun Master", "Not A Panda", "Artiste", "Game Gifter", "Probably Purged", "Tyler's Bae", "Checking Butts" ],
		"thespanishpresident" : [ "Beautiful Troll", "Texan", "Cola Drinker", "Spicy Mexican Food Eater", "TIT",  "Tin Can User", "Mod Extraordinaire", "Sticky Fingers", "Wadar Jesus", "Melon", "Probably in School", "Nerd", "Napping", " presAngel ", "Warframe Noobie", "Rocket League Rookie", "A Dwarf Named Bokreo", "Stealing Teeth", "Pickle Obsessed" ],
		"simmerplayer27" : [  "Mass Effect Expert", "Sassy Sleuth", "Stardew Valley Farmer" ],
		"soadkombucha" : [ "Dennis", "Fever Boy",  "Denizen Resident" ],
		"spappygram" : [  "Argile Obsessed", "Overwatch \"Player\"", "Stardew Noob" ],
	}

	var cachedRanks = { };

  function checkIndividualRanks (user)
	{
		var time = new Date().getTime();

		if (cachedRanks[user] != undefined && cachedRanks[user][1] > time)
		{
			return cachedRanks[user][0];
		}
		else if (individualUserRanks[user] != undefined)
		{
			var ranks = [ "Transient Gamer" ].concat(individualUserRanks[user]);  // Everyone is a Transient Gamer
			var n = Math.floor (Math.random() * ranks.length);
			cachedRanks [user] = [ ranks[n], time + TIMEOUT ];
			return cachedRanks[user][0];
		}
		else if ($.getIniDbBoolean('followed', user, false))
		{
			return "Transient Gamer";
		}
		return "Viewer";
	}

	$.checkIndividualRanks = checkIndividualRanks;
})();
