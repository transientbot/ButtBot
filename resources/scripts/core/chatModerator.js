!function(){function e(e){var r=$.inidb.GetKeyList("blackList","");if(e)for(var a in r)c.push($.inidb.get("blackList",r[a]))}function r(e){var r=$.inidb.GetKeyList("whitelist","");if(e)for(var a in r)h.push($.inidb.get("whitelist",r[a]))}function a(e,r){$.say(".timeout "+e+" "+r),setTimeout(function(){$.say(".timeout "+e+" "+r)},1e3)}function t(e){for(var r in l)if(l[r].equalsIgnoreCase(e))return a(e,K),i(e),void(U=$.lang.get("chatmoderator.timeout"));a(e,G),i(e),U=$.lang.get("chatmoderator.warning")}function s(e,r){m.length<=1&&$.say("@"+$.username.resolve(e)+", "+r+" "+U)}function i(e){l.push(e),o(e),O>0&&m.push($.systemTime())}function o(e){if(O>0)var r=setTimeout(function(){m.splice(0),clearTimeout(r)},1e3*O);var a=setTimeout(function(){for(var r in l)if(l[r].equalsIgnoreCase(e)){l.splice(r,0);break}clearTimeout(a)},36e5)}function g(e){d.push(e);var r=setTimeout(function(){for(var a in d)if(d[a].equalsIgnoreCase(e)){d.splice(a,1);break}clearTimeout(r)},1e3*p)}function n(e){return e?$.lang.get("common.enabled"):$.lang.get("common.disabled")}var d=[],l=[],m=[],h=[],c=[],u=$.inidb.exists("chatModerator","linksToggle")?$.getIniDbBoolean("chatModerator","linksToggle"):!0,f=$.inidb.exists("chatModerator","linksMessage")?$.inidb.get("chatModerator","linksMessage"):"you were timed out for linking",p=$.inidb.exists("chatModerator","linkPermitTime")?parseInt($.inidb.get("chatModerator","linkPermitTime")):120,b=$.inidb.exists("chatModerator","capsToggle")?$.getIniDbBoolean("chatModerator","capsToggle"):!0,y=$.inidb.exists("chatModerator","capsMessage")?$.inidb.get("chatModerator","capsMessage"):"you were timed out for overusing caps",M=$.inidb.exists("chatModerator","capsLimit")?parseInt($.inidb.get("chatModerator","capsLimit")):25,w=$.inidb.exists("chatModerator","capsTriggerLength")?parseInt($.inidb.get("chatModerator","capsTriggerLength")):10,x=$.inidb.exists("chatModerator","spamToggle")?$.getIniDbBoolean("chatModerator","spamToggle"):!0,v=$.inidb.exists("chatModerator","spamMessage")?$.inidb.get("chatModerator","spamMessage"):"you were timed out for spamming",I=$.inidb.exists("chatModerator","spamLimit")?parseInt($.inidb.get("chatModerator","spamLimit")):15,P=$.inidb.exists("chatModerator","symbolsToggle")?$.getIniDbBoolean("chatModerator","symbolsToggle"):!0,C=$.inidb.exists("chatModerator","symbolsMessage")?$.inidb.get("chatModerator","symbolsMessage"):"you were timed out for overusing symbols",T=$.inidb.exists("chatModerator","symbolsLimit")?parseInt($.inidb.get("chatModerator","symbolsLimit")):15,q=$.inidb.exists("chatModerator","symbolsTriggerLength")?parseInt($.inidb.get("chatModerator","symbolsTriggerLength")):5,k=$.inidb.exists("chatModerator","emotesToggle")?$.getIniDbBoolean("chatModerator","emotesToggle"):!1,L=$.inidb.exists("chatModerator","emotesMessage")?$.inidb.get("chatModerator","emotesMessage"):"you were timed out for overusing emotes",D=$.inidb.exists("chatModerator","emotesLimit")?parseInt($.inidb.get("chatModerator","emotesLimit")):15,_=$.inidb.exists("chatModerator","longMessageToggle")?$.getIniDbBoolean("chatModerator","longMessageToggle"):!0,B=$.inidb.exists("chatModerator","longMessageMessage")?$.inidb.get("chatModerator","longMessageMessage"):"you were timed out for posting a long message",S=$.inidb.exists("chatModerator","longMessageLimit")?parseInt($.inidb.get("chatModerator","longMessageLimit")):300,j=$.inidb.exists("chatModerator","colorsToggle")?$.getIniDbBoolean("chatModerator","colorsToggle"):!0,A=$.inidb.exists("chatModerator","colorsMessage")?$.inidb.get("chatModerator","colorsMessage"):"you were timed out for using a colored message",N=$.inidb.exists("chatModerator","regularsToggle")?$.getIniDbBoolean("chatModerator","regularsToggle"):!1,R=$.inidb.exists("chatModerator","subscribersToggle")?$.getIniDbBoolean("chatModerator","subscribersToggle"):!1,E=$.inidb.exists("chatModerator","blacklistMessage")?$.inidb.get("chatModerator","blacklistMessage"):"you were timed out using a blacklisted phrase",G=$.inidb.exists("chatModerator","warningTime")?parseInt($.inidb.get("chatModerator","warningTime")):5,K=$.inidb.exists("chatModerator","timeoutTime")?parseInt($.inidb.get("chatModerator","timeoutTime")):600,O=$.inidb.exists("chatModerator","msgCooldownSec")?parseInt($.inidb.get("chatModerator","msgCooldownSec")):20,U="";$.bind("ircChannelMessage",function(e){var r,i=e.getSender(),o=e.getMessage();if(!$.isModv3(i,e.getTags())){for(r in c)if(o.contains(c[r]))return a(i,K),U=$.lang.get("chatmoderator.timeout"),void s(i,E);for(r in d)if(d[r].equalsIgnoreCase(i)&&$.patternDetector.hasLinks(e))return void d.splice(r,1);if(u&&$.patternDetector.hasLinks(e)){for(r in h)if(o.contains(h[r]))return;if($.youtubePlayerConnected&&(o.contains("youtube.com")||o.contains("youtu.be")))return;if(N&&$.isReg(i))return;if(R&&$.isSubv3(i,e.getTags()))return;return t(i),void s(i,f)}if(b&&o.length()>w&&e.getCapsCount()>M)return t(i),void s(i,y);if(P&&o.length()>q&&$.patternDetector.getNumberOfNonLetters(e)>T)return t(i),void s(i,C);if(x&&$.patternDetector.getLongestRepeatedSequence(e)>I)return t(i),void s(i,v);if(k&&$.patternDetector.getNumberOfEmotes(e)>D)return t(i),void s(i,L);if(j&&o.startsWith("/me"))return t(i),void s(i,A);_&&o.length()>S&&(t(i),s(i,B))}}),$.bind("command",function(a){var t=a.getSender(),s=a.getCommand(),i=a.getArguments(),o=a.getArgs(),d=o[0],l=o[1];if(s.equalsIgnoreCase("permit"))return $.isModv3(t,a.getTags())?d?(g(d),void $.say($.username.resolve(d)+$.lang.get("chatmoderator.permited",p))):void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.permit.usage")):void $.say($.whisperPrefix(t)+$.modMsg);if(s.equalsIgnoreCase("blacklist")){if(!$.isAdmin(t))return void $.say($.whisperPrefix(t)+$.adminMsg);if(!d)return void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.blacklist.usage"));if(d.equalsIgnoreCase("add")){if(!l)return void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.blacklist.add.usage"));var m=i.replace(d,"").trim();$.inidb.set("blackList","phrase_"+c.length,m),c.push(m),$.say($.whisperPrefix(t)+$.lang.get("chatmoderator.blacklist.added"))}if(d.equalsIgnoreCase("remove")){if(!l)return void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.blacklist.remove.usage"));if(!$.inidb.exists("blackList","phrase_"+parseInt(l)))return void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.err"));$.inidb.del("blackList","phrase_"+parseInt(l)),e(!0),$.say($.whisperPrefix(t)+$.lang.get("chatmoderator.blacklist.removed"))}if(d.equalsIgnoreCase("show")){if(!l)return void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.blacklist.show.usage"));if(!$.inidb.exists("blackList","phrase_"+parseInt(l)))return void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.err"));$.say($.whisperPrefix(t)+$.inidb.get("blackList","phrase_"+parseInt(l)))}}if(s.equalsIgnoreCase("whiteList")){if(!$.isAdmin(t))return void $.say($.whisperPrefix(t)+$.adminMsg);if(!d)return void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.whitelist.usage"));if(d.equalsIgnoreCase("add")){if(!l)return void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.whitelist.add.usage"));var U=i.replace(d,"").trim();$.inidb.set("whiteList","link_"+h.length,U),h.push(U),$.say($.whisperPrefix(t)+$.lang.get("chatmoderator.whitelist.link.added"))}if(d.equalsIgnoreCase("remove")){if(!l)return void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.whitelist.remove.usage"));if(!$.inidb.exists("whiteList","link_"+parseInt(l)))return void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.err"));$.inidb.del("whiteList","link_"+parseInt(l)),r(!0),$.say($.whisperPrefix(t)+$.lang.get("chatmoderator.whitelist.removed"))}if(d.equalsIgnoreCase("show")){if(!l)return void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.whitelist.show.usage"));if(!$.inidb.exists("whiteList","link_"+parseInt(l)))return void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.err"));$.say($.whisperPrefix(t)+$.inidb.get("whiteList","link_"+parseInt(l)))}}if(s.equalsIgnoreCase("moderation")||s.equalsIgnoreCase("mod")){if(!$.isAdmin(t))return void $.say($.whisperPrefix(t)+$.adminMsg);if(!d)return $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.usage.toggles")),$.say($.whisperPrefix(t)+$.lang.get("chatmoderator.usage.messages")),void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.options"));if(d.equalsIgnoreCase("links")){if(!l)return void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.link.usage",n(u)));if(l.equalsIgnoreCase("on"))return u=!0,$.inidb.set("chatModerator","linksToggle",u),void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.link.filter.enabled"));if(l.equalsIgnoreCase("off"))return u=!1,$.inidb.set("chatModerator","linksToggle",u),void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.link.filter.disabled"))}if(d.equalsIgnoreCase("caps")){if(!l)return void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.caps.usage",n(b)));if(l.equalsIgnoreCase("on"))return b=!0,$.inidb.set("chatModerator","capsToggle",b),void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.caps.filter.enabled"));if(l.equalsIgnoreCase("off"))return b=!1,$.inidb.set("chatModerator","capsToggle",b),void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.caps.filter.disabled"))}if(d.equalsIgnoreCase("spam")){if(!l)return void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.spam.usage",n(x)));if(l.equalsIgnoreCase("on"))return x=!0,$.inidb.set("chatModerator","spamToggle",x),void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.spam.filter.enabled"));if(l.equalsIgnoreCase("off"))return x=!1,$.inidb.set("chatModerator","spamToggle",x),void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.spam.filter.disabled"))}if(d.equalsIgnoreCase("symbols")){if(!l)return void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.symbols.usage",n(P)));if(l.equalsIgnoreCase("on"))return P=!0,$.inidb.set("chatModerator","symbolsToggle",P),void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.symbols.filter.enabled"));if(l.equalsIgnoreCase("off"))return P=!1,$.inidb.set("chatModerator","symbolsToggle",P),void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.symbols.filter.disabled"))}if(d.equalsIgnoreCase("emotes")){if(!l)return void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.emotes.usage",n(k)));if(l.equalsIgnoreCase("on"))return k=!0,$.inidb.set("chatModerator","emotesToggle",k),void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.emotes.filter.enabled"));if(l.equalsIgnoreCase("off"))return k=!1,$.inidb.set("chatModerator","emotesToggle",k),void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.emotes.filter.disabled"))}if(d.equalsIgnoreCase("colors")){if(!l)return void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.colors.usage",n(j)));if(l.equalsIgnoreCase("on"))return j=!0,$.inidb.set("chatModerator","colorsToggle",j),void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.colors.filter.enabled"));if(l.equalsIgnoreCase("off"))return j=!1,$.inidb.set("chatModerator","colorsToggle",j),void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.colors.filter.disabled"))}if(d.equalsIgnoreCase("longmessages")){if(!l)return void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.message.usage",n(_)));if(l.equalsIgnoreCase("on"))return _=!0,$.inidb.set("chatModerator","longMessageToggle",_),void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.message.filter.enabled"));if(l.equalsIgnoreCase("off"))return _=!1,$.inidb.set("chatModerator","longMessageToggle",_),void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.message.filter.disabled"))}if(d.equalsIgnoreCase("regulars")){if(!l)return void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.regulars.usage"));if(l.equalsIgnoreCase("true"))return N=!0,$.inidb.set("chatModerator","regularsToggle",N),void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.regulars.enabled"));if(l.equalsIgnoreCase("false"))return N=!1,$.inidb.set("chatModerator","regularsToggle",N),void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.regulars.disabled"))}if(d.equalsIgnoreCase("subscribers")){if(!l)return void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.subscribers.usage"));if(l.equalsIgnoreCase("true"))return R=!0,$.inidb.set("chatModerator","subscribersToggle",R),void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.subscribers.enabled"));if(l.equalsIgnoreCase("false"))return R=!1,$.inidb.set("chatModerator","subscribersToggle",R),void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.subscribers.disabled"))}if(d.equalsIgnoreCase("linksmessage"))return l?(f=i.replace(d,"").trim(),$.inidb.set("chatModerator","linksMessage",f),void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.link.message.set",f))):void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.link.message.usage"));if(d.equalsIgnoreCase("capsmessage"))return l?(y=i.replace(d,"").trim(),$.inidb.set("chatModerator","capsMessage",y),void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.caps.message.set",y))):void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.caps.message.usage"));if(d.equalsIgnoreCase("symbolsmessage"))return l?(C=i.replace(d,"").trim(),$.inidb.set("chatModerator","symbolsMessage",C),void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.symbols.message.set",C))):void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.symbols.message.usage"));if(d.equalsIgnoreCase("emotesmessage"))return l?(L=i.replace(d,"").trim(),$.inidb.set("chatModerator","emotesMessage",L),void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.emotes.message.set",L))):void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.emotes.message.usage"));if(d.equalsIgnoreCase("colorsmessage"))return l?(A=i.replace(d,"").trim(),$.inidb.set("chatModerator","colorsMessage",A),void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.colors.message.set",A))):void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.colors.message.usage"));if(d.equalsIgnoreCase("longmsgmessage"))return l?(B=i.replace(d,"").trim(),$.inidb.set("chatModerator","longMessageMessage",B),void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.message.message.set",B))):void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.message.message.usage"));if(d.equalsIgnoreCase("spammessage"))return l?(v=i.replace(d,"").trim(),$.inidb.set("chatModerator","spamMessage",v),void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.spam.message.set",v))):void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.spam.message.usage"));if(d.equalsIgnoreCase("blacklistmessage"))return l?(E=i.replace(d,"").trim(),$.inidb.set("chatModerator","blacklistMessage",E),void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.blacklist.message.set",E))):void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.blacklist.message.usage"));if(d.equalsIgnoreCase("permittime"))return l?(p=parseInt(l),$.inidb.set("chatModerator","linkPermitTime",p),void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.permit.time.set",p))):void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.permit.time.usage"));if(d.equalsIgnoreCase("capslimit"))return l?(M=parseInt(l),$.inidb.set("chatModerator","capsLimit",M),void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.caps.limit.set",M))):void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.caps.limit.usage"));if(d.equalsIgnoreCase("capstriggerlength"))return l?(w=parseInt(l),$.inidb.set("chatModerator","capsTriggerLength",w),void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.caps.trigger.length.set",M))):void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.caps.trigger.length.usage"));if(d.equalsIgnoreCase("spamlimit"))return l?(I=parseInt(l),$.inidb.set("chatModerator","spamLimit",I),void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.spam.limit.set",I))):void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.spam.limit.usage"));if(d.equalsIgnoreCase("symbolslimit"))return l?(T=parseInt(l),$.inidb.set("chatModerator","symbolsLimit",T),void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.symbols.limit.set",T))):void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.symbols.limit.usage"));if(d.equalsIgnoreCase("symbolsTriggerLength"))return l?(q=parseInt(l),$.inidb.set("chatModerator","symbolsTriggerLength",q),void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.symbols.trigger.length.set",q))):void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.symbols.trigger.length.usage"));if(d.equalsIgnoreCase("emoteslimit"))return l?(D=parseInt(l),$.inidb.set("chatModerator","emotesLimit",D),void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.emotes.limit.set",D))):void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.emotes.limit.usage"));if(d.equalsIgnoreCase("messagecharacterlimit"))return l?(S=parseInt(l),$.inidb.set("chatModerator","longMessageLimit",S),void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.message.limit.set",S))):void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.message.limit.usage"));if(d.equalsIgnoreCase("timeouttime"))return l?(K=parseInt(l),$.inidb.set("chatModerator","timeoutTime",K),void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.timeout.time.set",K))):void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.timeout.time.usage"));if(d.equalsIgnoreCase("warningtime"))return l?(G=parseInt(l),$.inidb.set("chatModerator","warningTime",G),void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.warning.time.set",G))):void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.warning.time.usage"));if(d.equalsIgnoreCase("messagecooldown"))return l?(O=parseInt(l),$.inidb.set("chatModerator","msgCooldownSec",O),void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.msgcooldown.set",O))):void $.say($.whisperPrefix(t)+$.lang.get("chatmoderator.msgcooldown.usage"))}}),$.bind("initReady",function(){$.bot.isModuleEnabled("./core/chatmoderator.js")&&($.consoleDebug("Loading whitelist"),r(!0),$.consoleDebug("Loading blacklist"),e(!0),$.registerChatCommand("./core/chatmoderator.js","permit",2),$.registerChatCommand("./core/chatmoderator.js","moderation",1),$.registerChatCommand("./core/chatmoderator.js","mod",1),$.registerChatCommand("./core/chatmoderator.js","blacklist",1),$.registerChatCommand("./core/chatmoderator.js","whitelist",1))}),$.timeoutUser=a,$.permitUserLink=g}();
