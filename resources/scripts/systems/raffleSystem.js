!function(){function e(e,r,a,n,l){return g?void $.say($.whisperPrefix(e)+$.lang.get("rafflesystem.err.raffle.opened")):r&&a?(r.contains("!")&&(r=r.replace("!","")),r&&(f=r),a&&(t=parseInt(a)),n&&(d=parseInt(n)),l&&l.equalsIgnoreCase("-followers")&&(i=!0,m=$.lang.get("rafflesystem.msg.need.to.be.follwing")),void s(r,t,i,d,m)):void $.say($.whisperPrefix(e)+$.lang.get("rafflesystem.err.missing.syntax"))}function s(e,s,a,n,t){if($.say($.lang.get("rafflesystem.raffle.opened",$.getPointsString(s),e,t)),$.registerChatCommand("./systems/raffleSystem.js",e,7),l=[],g=!0,n>0)var t=setInterval(function(){$.say($.lang.get("rafflesystem.warn",e)),clearInterval(t)},n/2*1e3),f=setInterval(function(){r(),clearInterval(f)},1e3*n)}function r(e){return g?(g=!1,i=!1,f="",t=0,d=0,m="",$.say($.lang.get("rafflesystem.raffle.closed")),void a()):void $.say($.whisperPrefix(e)+$.lang.get("rafflesystem.err.raffle.not.opened"))}function a(e){return 0==l.length?void $.say($.lang.get("rafflesystem.raffle.close.err")):e?void $.say($.lang.get("rafflesystem.raffle.repick",$.username.resolve($.randElement(l)))):(a=$.randElement(l),void $.say($.lang.get("rafflesystem.winner",$.username.resolve(a))))}function n(e,s){return g?i&&!$.user.isFollower(e)?void $.say($.whisperPrefix(e)+$.lang.get("rafflesystem.err.not.following")):$.list.contains(l,e)?void $.say($.whisperPrefix(e)+$.lang.get("rafflesystem.enter.error.alreadyentered")):s>0&&($.inidb.decr("points",e,s),s>$.getUserPoints(e))?void $.say($.whisperPrefix(e)+$.lang.get("rafflesystem.err.points",$.pointNameMultiple)):(o&&$.say($.lang.get("rafflesystem.entered",$.username.resolve(e))),void l.push(e)):void $.say($.whisperPrefix(e)+$.lang.get("rafflesystem.err.raffle.not.opened"))}var t=0,l=[],f="",i=!1,g=!1,o=$.inidb.exists("settings","raffleMSGToggle")?$.getIniDbBoolean("settings","raffleMSGToggle"):!1,d=0,m="";$.bind("command",function(s){var l=s.getSender(),i=s.getCommand(),g=(s.getArguments(),s.getArgs()),d=g[0];if(i.equalsIgnoreCase("raffle")){if(!$.isModv3(l,s.getTags()))return void $.say($.whisperPrefix(l)+$.modMsg);if(!d)return void $.say($.whisperPrefix(l)+$.lang.get("rafflesystem.usage"));d.equalsIgnoreCase("open")&&e(l,g[1],g[2],g[3],g[4]),d.equalsIgnoreCase("close")&&r(l),d.equalsIgnoreCase("repick")&&a(!0),d.equalsIgnoreCase("messagetoggle")&&(o?(o=!1,$.inidb.set("settings","raffleMSGToggle",o),$.say($.whisperPrefix(l)+$.lang.get("rafflesystem.msg.disabled"))):(o=!0,$.inidb.set("settings","raffleMSGToggle",o),$.say($.whisperPrefix(l)+$.lang.get("rafflesystem.msg.enabled"))))}i.equalsIgnoreCase(f)&&n(l,t)}),$.bind("initReady",function(){$.bot.isModuleEnabled("./systems/raffleSystem.js")&&$.registerChatCommand("./systems/raffleSystem.js","raffle",2)})}();
