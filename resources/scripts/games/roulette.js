!function(){function e(){var e;for(e=1;$.lang.exists("roulette.win."+e);e++)o.win++;for(e=1;$.lang.exists("roulette.lost."+e);e++)o.lost++;$.consoleDebug($.lang.get("roulette.console.loaded",o.win,o.lost))}function t(e){setTimeout(function(){$.say(".timeout "+e+" "+i)},1800)}var i=$.inidb.exists("roulette","timeoutTime")?parseInt($.inidb.get("roulette","timeoutTime")):60,o={win:0,lost:0},s=0;$.bind("command",function(e){var n,r,a,l=e.getSender().toLowerCase(),u=e.getCommand(),g=e.getArgs();if(u.equalsIgnoreCase("roulette"))if(r=$.randRange(1,2),a=$.randRange(1,2),r==a){do n=$.randRange(1,o.win);while(n==s);$.say($.lang.get("roulette.win."+n,$.resolveRank(l)))}else{do n=$.randRange(1,o.lost);while(n==s);$.say($.lang.get("roulette.lost."+n,$.resolveRank(l))),$.isModv3(l,e.getTags())||($.getBotWhisperMode()&&$.say($.whisperPrefix(l)+$.lang.get("roulette.timeout.notifyuser",i)),t(l))}if(u.equalsIgnoreCase("roulettetimeouttime")){if(!$.isAdmin(l))return void $.say($.whisperPrefix(l)+$.adminMsg);if(isNaN(parseInt(g[0])))return void $.say($.whisperPrefix(l)+$.lang.get("roulette.set.timeouttime.usage"));i=parseInt(g[0]),$.inidb.set("roulette","timeoutTime",i),$.say($.whisperPrefix(l)+$.lang.get("roulette.set.timeouttime.success",i))}}),$.bind("initReady",function(){$.bot.isModuleEnabled("./games/roulette.js")&&(e(),$.registerChatCommand("./games/roulette.js","roulette",7),$.registerChatCommand("./games/roulette.js","roulettetimeouttime",1))})}();
