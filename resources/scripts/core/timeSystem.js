!function(){function e(e){if(l){if(!$.isModv3(e.getSender().toLowerCase(),e.getTags()))return!1}else if(!$.isAdmin(e.getSender().toLowerCase()))return!1;return!0}function t(e){var t=new java.text.SimpleDateFormat(e);return t.setTimeZone(java.util.TimeZone.getTimeZone($.inidb.exists("settings","timezone")?$.inidb.get("settings","timezone"):"GMT")),t.format(new java.util.Date)}function i(e,t){var i=new java.text.SimpleDateFormat(e);return i.setTimeZone(java.util.TimeZone.getTimeZone($.inidb.exists("settings","timezone")?$.inidb.get("settings","timezone"):"GMT")),i.format(new java.util.Date(t))}function s(e,t){var i=e.getFullYear(),s=e.getMonth()+1,r=e.getDate(),n=e.getHours(),a=e.getMinutes();return t?n+":"+a:r+"-"+s+"-"+i+" "+n+":"+a}function r(e,t){var i=Math.floor,s=e/3600,r=s%1*60;return t?i(s)+$.lang.get("common.hours"):i(s)>0?i(s)+$.lang.get("common.hours")+i(~~r)+$.lang.get("common.minutes")+i(r%1*60)+$.lang.get("common.seconds"):i(~~r)+$.lang.get("common.minutes")+i(r%1*60)+$.lang.get("common.seconds")}function n(e){var t=Math.abs(e-(new Date).getTime())/1e3,i="",s={},r={months:2592e3,days:86400,hours:3600,minutes:60,seconds:1},n="";return Object.keys(r).forEach(function(e){i=Math.floor(t/r[e]),i>0&&(n=n+i+" "+e+", ",s[e]=Math.floor(t/r[e]),t-=s[e]*r[e])}),n.slice(0,-2)}function a(e){return $.inidb.exists("time",e)?$.inidb.get("time",e):0}function o(e){return $.getTimeString($.getUserTime(e))}var m=$.getSetIniDbBoolean("timeSettings","timeLevel",!1),g=$.getSetIniDbBoolean("timeSettings","keepTimeWhenOffline",!1),l=$.getSetIniDbBoolean("timeSettings","modTimePermToggle",!1),u=$.getSetIniDbNumber("timeSettings","timePromoteHours",50),f=6;$.bind("command",function(i){var s,r,n=i.getSender().toLowerCase(),a=$.username.resolve(n),o=i.getCommand(),d=i.getArgs(),y=d[0];if(o.equalsIgnoreCase("time"))if(e(i)&&y){if(s=d[1],r=parseInt(d[2]),y.equalsIgnoreCase("add")){if(!s||isNaN(r))return void $.say($.whisperPrefix(n)+$.lang.get("timesystem.add.usage"));if(s=s.toLowerCase(),0>r)return void $.say($.whisperPrefix(n)+$.lang.get("timesystem.add.error.negative"));$.user.isKnown(s)?($.inidb.incr("time",s,r),$.say($.whisperPrefix(n)+$.lang.get("timesystem.add.success",$.getTimeString(r),$.username.resolve(s),$.getUserTimeString(s)))):$.say($.whisperPrefix(n)+$.lang.get("common.user.404",$.username.resolve(s)))}if(y.equalsIgnoreCase("take")){if(!s||isNaN(r))return void $.say($.whisperPrefix(n)+$.lang.get("timesystem.take.usage"));if($.user.isKnown(n)&&$.say($.whisperPrefix(n)+$.lang.get("common.user.404",a)),r>$.getUserTime(n))return void $.say($.whisperPrefix(n)+$.lang.get("timesystem.take.error.toomuch",a));$.inidb.decr("time",s,r),$.say($.whisperPrefix(n)+$.lang.get("timesystem.take.success",$.getTimeString(r),$.username.resolve(s),$.getUserTimeString(n)))}if(y.equalsIgnoreCase("set")){if(!s||isNaN(r))return void $.say($.whisperPrefix(n)+$.lang.get("timesystem.settime.usage"));if(0>r)return void $.say($.whisperPrefix(n)+$.lang.get("timesystem.settime.error.negative"));$.user.isKnown(s.toLowerCase())?($.inidb.set("time",s,r),$.say($.whisperPrefix(n)+$.lang.get("timesystem.settime.success",$.username.resolve(s),$.getUserTimeString(s.toLowerCase())))):$.say($.whisperPrefix(n)+$.lang.get("common.user.404",s))}if(y.equalsIgnoreCase("promotehours")){if(isNaN(s))return void $.say($.whisperPrefix(n)+$.lang.get("timesystem.set.promotehours.usage"));if(0>s)return void $.say($.whisperPrefix(n)+$.lang.get("timesystem.set.promotehours.error.negative",$.getGroupNameById(f).toLowerCase()));$.inidb.set("timeSettings","timePromoteHours",s),u=parseInt($.inidb.get("timeSettings","timePromoteHours")),$.say($.whisperPrefix(n)+$.lang.get("timesystem.set.promotehours.success",$.getGroupNameById(f).toLowerCase(),u))}y.equalsIgnoreCase("autolevel")&&(m=!m,$.setIniDbBoolean("timeSettings","timeLevel",m),m?$.say($.whisperPrefix(n)+$.lang.get("timesystem.autolevel.enabled",$.getGroupNameById(f).toLowerCase(),u)):$.say($.whisperPrefix(n)+$.lang.get("timesystem.autolevel.disabled",$.getGroupNameById(f).toLowerCase(),u))),(y.equalsIgnoreCase("offline")||y.equalsIgnoreCase("offlinetime"))&&(g=!g,$.setIniDbBoolean("timeSettings","keepTimeWhenOffline",g),g?$.say($.whisperPrefix(n)+$.lang.get("timesystem.offlinetime.enabled")):$.say($.whisperPrefix(n)+$.lang.get("timesystem.offlinetime.disabled"))),y.equalsIgnoreCase("modpermtoggle")&&(l=!l,$.setIniDbBoolean("timeSettings","modTimePermToggle",l),$.say($.whisperPrefix(n)+$.lang.get("timesystem.modpermtoggle.success",l?"Moderator":"Administrator"))),y.equalsIgnoreCase("help")&&$.say($.whisperPrefix(n)+$.lang.get("timesystem.help"))}else $.say($.whisperPrefix(n)+$.lang.get("timesystem.get.other",$.resolveRank(n),$.getUserTimeString(n)));if(o.equalsIgnoreCase("streamertime")&&$.say($.whisperPrefix(n)+$.lang.get("timesystem.streamertime",t("MMMM dd', 'yyyy hh:mm:ss zzz '('Z')'"),$.username.resolve($.ownerName))),o.equalsIgnoreCase("timezone")){var h;if(!y)return void $.say($.whisperPrefix(n)+$.lang.get("timesystem.set.timezone.usage",$.inidb.exists("settings","timezone")?$.inidb.get("settings","timezone"):"GMT"));if(h=java.util.TimeZone.getTimeZone(y),h.getID().equals("GMT")&&!y.equals("GMT"))return void $.say($.whisperPrefix(n)+$.lang.get("timesystem.set.timezone.invalid",y));$.say($.whisperPrefix(n)+$.lang.get("timesystem.set.timezone.success",h.getID(),h.observesDaylightTime())),$.inidb.set("settings","timezone",h.getID())}if(o.equalsIgnoreCase("uptime")){var c=$.username.resolve($.channelName),p=$.getStreamUptime($.channelName);if(!$.isOnline($.channelName))return void $.say($.whisperPrefix(n)+$.lang.get("timesystem.uptime.offline",c));$.say($.lang.get("timesystem.uptime",c,p))}}),setInterval(function(){var e;if($.bot.isModuleEnabled("./core/timeSystem.js")){if($.isOnline($.channelName)||g)for(e in $.users)$.inidb.incr("time",$.users[e][0].toLowerCase(),61);if(m)for(e in $.users){var t=$.users[e][0].toLowerCase();!$.isMod(t)&&!$.isAdmin(t)&&$.inidb.exists("time",t)&&Math.floor(parseInt($.inidb.get("time",t))/3600)>=u&&parseInt($.getUserGroupId(t))>f&&($.setUserGroupById(t,f),$.say($.whisperPrefix(t)+$.lang.get("timesystem.autolevel.promoted",$.username.resolve(t),$.getGroupNameById(f).toLowerCase(),u)))}}},6e4),$.bind("initReady",function(){$.bot.isModuleEnabled("./core/timeSystem.js")&&($.registerChatCommand("./core/timeSystem.js","time"),$.registerChatCommand("./core/timeSystem.js","streamertime"),$.registerChatCommand("./core/timeSystem.js","uptime"),$.registerChatCommand("./core/timeSystem.js","timezone",1))}),$.dateToString=s,$.getTimeString=r,$.getUserTime=a,$.getUserTimeString=o,$.getCurLocalTimeString=t,$.getLocalTimeString=i,$.getLongTimeString=n}();
