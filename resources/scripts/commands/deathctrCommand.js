!function(){function e(e){var t="./addons/deathctr/deathctr.txt",a=parseInt($.inidb.get("deaths",e));isNaN(a)&&(a=0),$.writeToFile(a.toFixed(0),t,!1)}var t=!1;$.bind("command",function(e){var t=e.getSender(),a=($.username.resolve(t),e.getCommand()),r=e.getArguments().trim(),n=r.substring(r.indexOf(" ")+1,r.length()),s=e.getArgs(),d=""!=$.getGame($.channelName)?$.getGame($.channelName):"Some Game";if(a.equalsIgnoreCase("deathctr"))if(r.isEmpty()){var i=parseInt($.inidb.get("deaths",d));isNaN(i)||0==parseInt(i)?$.say($.lang.get("deathcounter.none",$.ownerName,d)):$.say($.lang.get("deathcounter.counter",$.ownerName,d,i))}else{if(r.equalsIgnoreCase("reset")){if(!$.isAdmin(t))return void $.say($.getWhisperString(t)+$.adminMsg);var i=parseInt($.inidb.get("deaths",d));return void(isNaN(i)||0==parseInt(i)?$.say($.getWhisperString(t)+$.lang.get("deathcounter.reset-nil",d)):($.inidb.set("deaths",d,0),$.say($.getWhisperString(t)+$.lang.get("deathcounter.reset",d,i)),$.deathUpdateFile(d)))}if(s[0].equalsIgnoreCase("set")){if(!$.isAdmin(t))return void $.say($.getWhisperString(t)+$.adminMsg);if(isNaN(parseInt(n)))return void $.say($.getWhisperString(t)+$.lang.get("deathcounter.set-error"));var g=parseInt(n);return $.inidb.set("deaths",d,g),$.say($.getWhisperString(t)+$.lang.get("deathcounter.set-success",d,g)),void $.deathUpdateFilegame()}if(r.equalsIgnoreCase("add")||r.equalsIgnoreCase("incr")||r.equalsIgnoreCase("+"))return $.isAdmin(t)?($.inidb.incr("deaths",d,1),$.say($.lang.get("deathcounter.add-success",$.ownerName,d,$.inidb.get("deaths",d))),void $.deathUpdateFile(d)):void $.say($.getWhisperString(t)+$.adminmsg);if(r.equalsIgnoreCase("sub")||r.equalsIgnoreCase("decr")||r.equalsIgnoreCase("-"))return $.isModv3(t,e.getTags())?isNaN($.inidb.get("deaths",d))||0==parseInt($.inidb.get("deaths",d))?void $.say($.lang.get("deathcounter.sub-zero",d)):($.inidb.decr("deaths",d,1),$.say($.lang.get("deathcounter.sub-success",d,$.inidb.get("deaths",d))),void $.deathUpdateFile(d)):void $.say($.getWhisperString(t)+$.modMsg)}}),$.bind("initReady",function(){if($.bot.isModuleEnabled("./commands/deathctrCommand.js")&&($.registerChatCommand("./commands/deathctrCommand.js","deathctr",7),$.registerChatSubcommand("deathctr","reset",2),$.registerChatSubcommand("deathctr","set",2),$.registerChatSubcommand("deathctr","add",2),$.registerChatSubcommand("deathctr","incr",2),$.registerChatSubcommand("deathctr","+",2),$.registerChatSubcommand("deathctr","sub",2),$.registerChatSubcommand("deathctr","decr",2),$.registerChatSubcommand("deathctr","-",2),!t)){t=!0,$.isDirectory("./addons/deathctr/")||$.mkDir("./addons/deathctr");var a=""!=$.getGame($.channelName)?$.getGame($.channelName):"Some Game";e(a)}}),$.deathUpdateFile=e}();
