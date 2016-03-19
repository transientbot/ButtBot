!function(){function e(){var e=$.inidb.GetKeyList("blackList","");for(u in e)y.push($.inidb.get("blackList",e[u]));$.consoleDebug("blacklist loaded")}function r(){var e=$.inidb.GetKeyList("whiteList","");for(u in e)M.push($.inidb.get("whiteList",e[u]));$.consoleDebug("whitelist loaded")}function s(e,r){$.say(".timeout "+e+" "+r),setTimeout(function(){$.say(".timeout "+e+" "+r)},1e3)}function a(e,r){for(u in f)if(f[u].equalsIgnoreCase(e))return s(e,J),i(e),V=$.lang.get("chatmoderator.timeout"),void t(e,J,r);s(e,H),i(e),V=$.lang.get("chatmoderator.warning"),t(e,H,r)}function t(e,r,s){$.logChatModEvent("chatModerator.js",e+" was timed out for "+r+" seconds. Reason: "+s)}function o(e,r){p.length<=1&&$.say("@"+$.username.resolve(e)+", "+r+" "+V)}function i(e){f.push(e),g(e),Q>0&&p.push($.systemTime())}function g(e){if(Q>0)var r=setTimeout(function(){p.splice(0),clearTimeout(r)},1e3*Q);var s=setTimeout(function(){for(u in f)if(f[u].equalsIgnoreCase(e)){f.splice(u,0);break}clearTimeout(s)},36e5)}function n(e){b.push(e);var r=setTimeout(function(){for(u in b)if(b[u].equalsIgnoreCase(e)){b.splice(u,1);break}clearTimeout(r)},1e3*C)}function l(e){return e?$.lang.get("common.enabled"):$.lang.get("common.disabled")}function d(e){return e?"not allowed":"allowed"}function m(e){var r=e.getSender(),a=e.getMessage().toLowerCase();for(u in y)if(a.contains(y[u].toLowerCase()))return s(r,J),V=$.lang.get("chatmoderator.timeout"),o(r,z),!0;return!1}function c(e){var r=e.getSender();e.getMessage().toLowerCase();for(u in b)if(b[u].equalsIgnoreCase(r)&&$.patternDetector.hasLinks(e))return b.splice(u,1),!0;return!1}function h(e){var r=(e.getSender(),e.getMessage().toLowerCase());for(u in M)if(r.contains(M[u]))return!0;return!1}var u,b=[],f=[],p=[],M=[],y=[],w=$.inidb.exists("chatModerator","linksToggle")?$.getIniDbBoolean("chatModerator","linksToggle"):!0,x=$.inidb.exists("chatModerator","linksMessage")?$.inidb.get("chatModerator","linksMessage"):"you were timed out for linking",C=$.inidb.exists("chatModerator","linkPermitTime")?parseInt($.inidb.get("chatModerator","linkPermitTime")):120,I=$.inidb.exists("chatModerator","capsToggle")?$.getIniDbBoolean("chatModerator","capsToggle"):!0,P=$.inidb.exists("chatModerator","capsMessage")?$.inidb.get("chatModerator","capsMessage"):"you were timed out for overusing caps",v=$.inidb.exists("chatModerator","capsLimitPercent")?parseFloat($.inidb.get("chatModerator","capsLimitPercent")):50,q=$.inidb.exists("chatModerator","capsTriggerLength")?parseInt($.inidb.get("chatModerator","capsTriggerLength")):15,L=$.inidb.exists("chatModerator","spamToggle")?$.getIniDbBoolean("chatModerator","spamToggle"):!0,k=$.inidb.exists("chatModerator","spamMessage")?$.inidb.get("chatModerator","spamMessage"):"you were timed out for spamming",S=$.inidb.exists("chatModerator","spamLimit")?parseInt($.inidb.get("chatModerator","spamLimit")):15,T=$.inidb.exists("chatModerator","symbolsToggle")?$.getIniDbBoolean("chatModerator","symbolsToggle"):!0,D=$.inidb.exists("chatModerator","symbolsMessage")?$.inidb.get("chatModerator","symbolsMessage"):"you were timed out for overusing symbols",E=$.inidb.exists("chatModerator","symbolsLimitPercent")?parseFloat($.inidb.get("chatModerator","symbolsLimitPercent")):50,B=$.inidb.exists("chatModerator","symbolsGroupLimit")?parseFloat($.inidb.get("chatModerator","symbolsGroupLimit")):10,R=$.inidb.exists("chatModerator","symbolsTriggerLength")?parseInt($.inidb.get("chatModerator","symbolsTriggerLength")):15,_=$.inidb.exists("chatModerator","emotesToggle")?$.getIniDbBoolean("chatModerator","emotesToggle"):!1,j=$.inidb.exists("chatModerator","emotesMessage")?$.inidb.get("chatModerator","emotesMessage"):"you were timed out for overusing emotes",F=$.inidb.exists("chatModerator","emotesLimit")?parseInt($.inidb.get("chatModerator","emotesLimit")):15,A=$.inidb.exists("chatModerator","longMessageToggle")?$.getIniDbBoolean("chatModerator","longMessageToggle"):!0,N=$.inidb.exists("chatModerator","longMessageMessage")?$.inidb.get("chatModerator","longMessageMessage"):"you were timed out for posting a long message",G=$.inidb.exists("chatModerator","longMessageLimit")?parseInt($.inidb.get("chatModerator","longMessageLimit")):300,O=$.inidb.exists("chatModerator","colorsToggle")?$.getIniDbBoolean("chatModerator","colorsToggle"):!0,K=$.inidb.exists("chatModerator","colorsMessage")?$.inidb.get("chatModerator","colorsMessage"):"you were timed out for using /me for colored text.",U={Links:$.inidb.exists("chatModerator","subscribersModerateLinks")?$.getIniDbBoolean("chatModerator","subscribersModerateLinks"):!0,Caps:$.inidb.exists("chatModerator","subscribersModerateCaps")?$.getIniDbBoolean("chatModerator","subscribersModerateCaps"):!0,Symbols:$.inidb.exists("chatModerator","subscribersModerateSymbols")?$.getIniDbBoolean("chatModerator","subscribersModerateSymbols"):!0,Spam:$.inidb.exists("chatModerator","subscribersModerateSpam")?$.getIniDbBoolean("chatModerator","subscribersModerateSpam"):!0,Emotes:$.inidb.exists("chatModerator","subscribersModerateEmotes")?$.getIniDbBoolean("chatModerator","subscribersModerateEmotes"):!0,Colors:$.inidb.exists("chatModerator","subscribersModerateColors")?$.getIniDbBoolean("chatModerator","subscribersModerateColors"):!0,LongMsg:$.inidb.exists("chatModerator","subscribersModerateLongMsg")?$.getIniDbBoolean("chatModerator","subscribersModerateLongMsg"):!0},W={Links:$.inidb.exists("chatModerator","regularsModerateLinks")?$.getIniDbBoolean("chatModerator","regularsModerateLinks"):!0,Caps:$.inidb.exists("chatModerator","regularsModerateCaps")?$.getIniDbBoolean("chatModerator","regularsModerateCaps"):!0,Symbols:$.inidb.exists("chatModerator","regularsModerateSymbols")?$.getIniDbBoolean("chatModerator","regularsModerateSymbols"):!0,Spam:$.inidb.exists("chatModerator","regularsModerateSpam")?$.getIniDbBoolean("chatModerator","regularsModerateSpam"):!0,Emotes:$.inidb.exists("chatModerator","regularsModerateEmotes")?$.getIniDbBoolean("chatModerator","regularsModerateEmotes"):!0,Colors:$.inidb.exists("chatModerator","regularsModerateColors")?$.getIniDbBoolean("chatModerator","regularsModerateColors"):!0,LongMsg:$.inidb.exists("chatModerator","regularsModerateLongMsg")?$.getIniDbBoolean("chatModerator","regularsModerateLongMsg"):!0},z=$.inidb.exists("chatModerator","blacklistMessage")?$.inidb.get("chatModerator","blacklistMessage"):"you were timed out using a blacklisted phrase",H=$.inidb.exists("chatModerator","warningTime")?parseInt($.inidb.get("chatModerator","warningTime")):5,J=$.inidb.exists("chatModerator","timeoutTime")?parseInt($.inidb.get("chatModerator","timeoutTime")):600,Q=$.inidb.exists("chatModerator","msgCooldownSec")?parseInt($.inidb.get("chatModerator","msgCooldownSec")):20,V="";$.bind("ircChannelMessage",function(e){var r=e.getSender(),s=e.getMessage(),t=s.length();if(!$.isModv3(r,e.getTags())){if(s&&m(e))return;if(w&&$.patternDetector.hasLinks(e)){if($.youtubePlayerConnected&&s.contains("youtube.com")||s.contains("youtu.be"))return;if(s&&c(e)||h(e))return;if(!W.Links&&$.isReg(r)||!U.Links&&$.isSubv3(r,e.getTags()))return;return a(r,"posting a link"),void o(r,x)}if(I&&t>q){if(!W.Caps&&$.isReg(r)||!U.Caps&&$.isSubv3(r,e.getTags()))return;if(parseFloat($.patternDetector.getNumberOfCaps(e))/t*100>v)return a(r,"typing in caps"),void o(r,P)}if(T&&t>R){if(!W.Symbols&&$.isReg(r)||!U.Symbols&&$.isSubv3(r,e.getTags()))return;if($.patternDetector.getLongestNonLetterSequence(e)>B)return a(r,"spamming repeating symbols"),void o(r,D);if(parseFloat($.patternDetector.getNumberOfNonLetters(e))/t*100>E)return a(r,"overusing symbols"),void o(r,D)}if(L&&$.patternDetector.getLongestRepeatedSequence(e)>S){if(!W.Spam&&$.isReg(r)||!U.Spam&&$.isSubv3(r,e.getTags()))return;return a(r,"spamming repeating charaters"),void o(r,k)}if(_&&$.patternDetector.getNumberOfEmotes(e)>F){if(!W.Emotes&&$.isReg(r)||!U.Emotes&&$.isSubv3(r,e.getTags()))return;return a(r,"spamming emotes"),void o(r,j)}if(O&&s.startsWith("/me")){if(!W.Colors&&$.isReg(r)||!U.Colors&&$.isSubv3(r,e.getTags()))return;return a(r,"using /me (colored message)"),void o(r,K)}if(A&&t>G){if(!W.LongMsg&&$.isReg(r)||!U.LongMsg&&$.isSubv3(r,e.getTags()))return;a(r,"posting a long message"),o(r,N)}}}),$.bind("command",function(s){var a=s.getSender(),t=s.getCommand(),o=s.getArguments(),i=s.getArgs(),g=i[0],m=i[1];if(t.equalsIgnoreCase("permit"))return $.isModv3(a,s.getTags())?g?(n(g),void $.say($.username.resolve(g)+$.lang.get("chatmoderator.permited",C))):void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.permit.usage")):void $.say($.whisperPrefix(a)+$.modMsg);if(t.equalsIgnoreCase("blacklist")){if(!$.isAdmin(a))return void $.say($.whisperPrefix(a)+$.adminMsg);if(!g)return void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.blacklist.usage"));if(g.equalsIgnoreCase("add")){if(!m)return void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.blacklist.add.usage"));var c=o.replace(g,"").trim().toLowerCase();$.inidb.set("blackList","phrase_"+y.length,c),y.push(c),$.say($.whisperPrefix(a)+$.lang.get("chatmoderator.blacklist.added"))}if(g.equalsIgnoreCase("remove")){if(!m)return void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.blacklist.remove.usage"));if(!$.inidb.exists("blackList","phrase_"+parseInt(m)))return void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.err"));$.inidb.del("blackList","phrase_"+parseInt(m)),e(),$.say($.whisperPrefix(a)+$.lang.get("chatmoderator.blacklist.removed"))}if(g.equalsIgnoreCase("show")){if(!m)return void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.blacklist.show.usage"));if(!$.inidb.exists("blackList","phrase_"+parseInt(m)))return void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.err"));$.say($.whisperPrefix(a)+$.inidb.get("blackList","phrase_"+parseInt(m)))}}if(t.equalsIgnoreCase("whiteList")){if(!$.isAdmin(a))return void $.say($.whisperPrefix(a)+$.adminMsg);if(!g)return void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.whitelist.usage"));if(g.equalsIgnoreCase("add")){if(!m)return void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.whitelist.add.usage"));var h=o.replace(g,"").trim().toLowerCase();$.inidb.set("whiteList","link_"+M.length,h),M.push(h),$.say($.whisperPrefix(a)+$.lang.get("chatmoderator.whitelist.link.added"))}if(g.equalsIgnoreCase("remove")){if(!m)return void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.whitelist.remove.usage"));if(!$.inidb.exists("whiteList","link_"+parseInt(m)))return void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.err"));$.inidb.del("whiteList","link_"+parseInt(m)),r(),$.say($.whisperPrefix(a)+$.lang.get("chatmoderator.whitelist.removed"))}if(g.equalsIgnoreCase("show")){if(!m)return void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.whitelist.show.usage"));if(!$.inidb.exists("whiteList","link_"+parseInt(m)))return void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.err"));$.say($.whisperPrefix(a)+$.inidb.get("whiteList","link_"+parseInt(m)))}}if(t.equalsIgnoreCase("moderation")||t.equalsIgnoreCase("mod")){if(!$.isAdmin(a))return void $.say($.whisperPrefix(a)+$.adminMsg);if(!g)return $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.usage.toggles")),$.say($.whisperPrefix(a)+$.lang.get("chatmoderator.usage.messages")),void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.options"));if(g.equalsIgnoreCase("links")){if(!m)return void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.link.usage",l(w)));if(m.equalsIgnoreCase("on"))return w=!0,$.inidb.set("chatModerator","linksToggle",w),void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.link.filter.enabled"));if(m.equalsIgnoreCase("off"))return w=!1,$.inidb.set("chatModerator","linksToggle",w),void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.link.filter.disabled"))}if(g.equalsIgnoreCase("caps")){if(!m)return void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.caps.usage",l(I)));if(m.equalsIgnoreCase("on"))return I=!0,$.inidb.set("chatModerator","capsToggle",I),void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.caps.filter.enabled"));if(m.equalsIgnoreCase("off"))return I=!1,$.inidb.set("chatModerator","capsToggle",I),void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.caps.filter.disabled"))}if(g.equalsIgnoreCase("spam")){if(!m)return void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.spam.usage",l(L)));if(m.equalsIgnoreCase("on"))return L=!0,$.inidb.set("chatModerator","spamToggle",L),void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.spam.filter.enabled"));if(m.equalsIgnoreCase("off"))return L=!1,$.inidb.set("chatModerator","spamToggle",L),void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.spam.filter.disabled"))}if(g.equalsIgnoreCase("symbols")){if(!m)return void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.symbols.usage",l(T)));if(m.equalsIgnoreCase("on"))return T=!0,$.inidb.set("chatModerator","symbolsToggle",T),void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.symbols.filter.enabled"));if(m.equalsIgnoreCase("off"))return T=!1,$.inidb.set("chatModerator","symbolsToggle",T),void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.symbols.filter.disabled"))}if(g.equalsIgnoreCase("emotes")){if(!m)return void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.emotes.usage",l(_)));if(m.equalsIgnoreCase("on"))return _=!0,$.inidb.set("chatModerator","emotesToggle",_),void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.emotes.filter.enabled"));if(m.equalsIgnoreCase("off"))return _=!1,$.inidb.set("chatModerator","emotesToggle",_),void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.emotes.filter.disabled"))}if(g.equalsIgnoreCase("colors")){if(!m)return void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.colors.usage",l(O)));if(m.equalsIgnoreCase("on"))return O=!0,$.inidb.set("chatModerator","colorsToggle",O),void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.colors.filter.enabled"));if(m.equalsIgnoreCase("off"))return O=!1,$.inidb.set("chatModerator","colorsToggle",O),void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.colors.filter.disabled"))}if(g.equalsIgnoreCase("longmessages")){if(!m)return void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.message.usage",l(A)));if(m.equalsIgnoreCase("on"))return A=!0,$.inidb.set("chatModerator","longMessageToggle",A),void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.message.filter.enabled"));if(m.equalsIgnoreCase("off"))return A=!1,$.inidb.set("chatModerator","longMessageToggle",A),void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.message.filter.disabled"))}if(g.equalsIgnoreCase("regulars")){if(!m)return void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.regulars.usage"));if(m.equalsIgnoreCase("links")){if(!i[2])return void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.regulars.toggle.link",d(W.Links)));i[2].equalsIgnoreCase("true")?(W.Links=!0,$.inidb.set("chatModerator","regularsModerateLinks",W.Links),$.say($.whisperPrefix(a)+$.lang.get("chatmoderator.regulars.links.allowed"))):i[2].equalsIgnoreCase("false")&&(W.Links=!1,$.inidb.set("chatModerator","regularsModerateLinks",W.Links),$.say($.whisperPrefix(a)+$.lang.get("chatmoderator.regulars.links.not.allowed")))}else if(m.equalsIgnoreCase("caps")){if(!i[2])return void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.regulars.toggle.caps",d(W.Caps)));i[2].equalsIgnoreCase("true")?(W.Caps=!0,$.inidb.set("chatModerator","regularsModerateCaps",W.Caps),$.say($.whisperPrefix(a)+$.lang.get("chatmoderator.regulars.caps.allowed"))):i[2].equalsIgnoreCase("false")&&(W.Caps=!1,$.inidb.set("chatModerator","regularsModerateCaps",W.Caps),$.say($.whisperPrefix(a)+$.lang.get("chatmoderator.regulars.caps.not.allowed")))}else if(m.equalsIgnoreCase("symbols")){if(!i[2])return void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.regulars.toggle.symbols",d(W.Symbols)));i[2].equalsIgnoreCase("true")?(W.Symbols=!0,$.inidb.set("chatModerator","regularsModerateSymbols",W.Symbols),$.say($.whisperPrefix(a)+$.lang.get("chatmoderator.regulars.symbols.allowed"))):i[2].equalsIgnoreCase("false")&&(W.Symbols=!1,$.inidb.set("chatModerator","regularsModerateSymbols",W.Symbols),$.say($.whisperPrefix(a)+$.lang.get("chatmoderator.regulars.symbols.not.allowed")))}else if(m.equalsIgnoreCase("spam")){if(!i[2])return void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.regulars.toggle.spam",d(W.Spam)));i[2].equalsIgnoreCase("true")?(W.Spam=!0,$.inidb.set("chatModerator","regularsModerateSpam",W.Spam),$.say($.whisperPrefix(a)+$.lang.get("chatmoderator.regulars.spam.allowed"))):i[2].equalsIgnoreCase("false")&&(W.Spam=!1,$.inidb.set("chatModerator","regularsModerateSpam",W.Spam),$.say($.whisperPrefix(a)+$.lang.get("chatmoderator.regulars.spam.not.allowed")))}else if(m.equalsIgnoreCase("emotes")){if(!i[2])return void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.regulars.toggle.emotes",d(W.Emotes)));i[2].equalsIgnoreCase("true")?(W.Emotes=!0,$.inidb.set("chatModerator","regularsModerateEmotes",W.Emotes),$.say($.whisperPrefix(a)+$.lang.get("chatmoderator.regulars.emotes.allowed"))):i[2].equalsIgnoreCase("false")&&(W.Emotes=!1,$.inidb.set("chatModerator","regularsModerateEmotes",W.Emotes),$.say($.whisperPrefix(a)+$.lang.get("chatmoderator.regulars.emotes.not.allowed")))}else if(m.equalsIgnoreCase("colors")){if(!i[2])return void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.regulars.toggle.colors",d(W.Colors)));i[2].equalsIgnoreCase("true")?(W.Colors=!0,$.inidb.set("chatModerator","regularsModerateColors",W.Colors),$.say($.whisperPrefix(a)+$.lang.get("chatmoderator.regulars.colors.allowed"))):i[2].equalsIgnoreCase("false")&&(W.Colors=!1,$.inidb.set("chatModerator","regularsModerateColors",W.Colors),$.say($.whisperPrefix(a)+$.lang.get("chatmoderator.regulars.colors.not.allowed")))}else if(m.equalsIgnoreCase("longmessages")){if(!i[2])return void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.regulars.toggle.long.msg",d(W.LongMsg)));i[2].equalsIgnoreCase("true")?(W.LongMsg=!0,$.inidb.set("chatModerator","regularsModerateLongMsg",W.LongMsg),$.say($.whisperPrefix(a)+$.lang.get("chatmoderator.regulars.long.messages.allowed"))):i[2].equalsIgnoreCase("false")&&(W.LongMsg=!1,$.inidb.set("chatModerator","regularsModerateLongMsg",W.LongMsg),$.say($.whisperPrefix(a)+$.lang.get("chatmoderator.regulars.long.messages.not.allowed")))}}if(g.equalsIgnoreCase("subscribers")){if(!m)return void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.subscribers.usage"));if(m.equalsIgnoreCase("links")){if(!i[2])return void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.subscribers.toggle.link",d(U.Links)));i[2].equalsIgnoreCase("true")?(U.Links=!0,$.inidb.set("chatModerator","subscribersModerateLinks",U.Links),$.say($.whisperPrefix(a)+$.lang.get("chatmoderator.subscribers.links.allowed"))):i[2].equalsIgnoreCase("false")&&(U.Links=!1,$.inidb.set("chatModerator","subscribersModerateLinks",U.Links),$.say($.whisperPrefix(a)+$.lang.get("chatmoderator.subscribers.links.not.allowed")))}else if(m.equalsIgnoreCase("caps")){if(!i[2])return void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.subscribers.toggle.caps",d(U.Caps)));i[2].equalsIgnoreCase("true")?(U.Caps=!0,$.inidb.set("chatModerator","subscribersModerateCaps",U.Caps),$.say($.whisperPrefix(a)+$.lang.get("chatmoderator.subscribers.caps.allowed"))):i[2].equalsIgnoreCase("false")&&(U.Caps=!1,$.inidb.set("chatModerator","subscribersModerateCaps",U.Caps),$.say($.whisperPrefix(a)+$.lang.get("chatmoderator.subscribers.caps.not.allowed")))}else if(m.equalsIgnoreCase("symbols")){if(!i[2])return void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.subscribers.toggle.symbols",d(U.Symbols)));i[2].equalsIgnoreCase("true")?(U.Symbols=!0,$.inidb.set("chatModerator","subscribersModerateSymbols",U.Symbols),$.say($.whisperPrefix(a)+$.lang.get("chatmoderator.subscribers.symbols.allowed"))):i[2].equalsIgnoreCase("false")&&(U.Symbols=!1,$.inidb.set("chatModerator","subscribersModerateSymbols",U.Symbols),$.say($.whisperPrefix(a)+$.lang.get("chatmoderator.subscribers.symbols.not.allowed")))}else if(m.equalsIgnoreCase("spam")){if(!i[2])return void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.subscribers.toggle.spam",d(U.Spam)));i[2].equalsIgnoreCase("true")?(U.Spam=!0,$.inidb.set("chatModerator","subscribersModerateSpam",U.Spam),$.say($.whisperPrefix(a)+$.lang.get("chatmoderator.subscribers.spam.allowed"))):i[2].equalsIgnoreCase("false")&&(U.Spam=!1,$.inidb.set("chatModerator","subscribersModerateSpam",U.Spam),$.say($.whisperPrefix(a)+$.lang.get("chatmoderator.subscribers.spam.not.allowed")))}else if(m.equalsIgnoreCase("emotes")){if(!i[2])return void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.subscribers.toggle.emotes",d(U.Emotes)));i[2].equalsIgnoreCase("true")?(U.Emotes=!0,$.inidb.set("chatModerator","subscribersModerateEmotes",U.Emotes),$.say($.whisperPrefix(a)+$.lang.get("chatmoderator.subscribers.emotes.allowed"))):i[2].equalsIgnoreCase("false")&&(U.Emotes=!1,$.inidb.set("chatModerator","subscribersModerateEmotes",U.Emotes),$.say($.whisperPrefix(a)+$.lang.get("chatmoderator.subscribers.emotes.not.allowed")))}else if(m.equalsIgnoreCase("colors")){if(!i[2])return void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.subscribers.toggle.colors",d(U.Colors)));i[2].equalsIgnoreCase("true")?(U.Colors=!0,$.inidb.set("chatModerator","subscribersModerateColors",U.Colors),$.say($.whisperPrefix(a)+$.lang.get("chatmoderator.subscribers.colors.allowed"))):i[2].equalsIgnoreCase("false")&&(U.Colors=!1,$.inidb.set("chatModerator","subscribersModerateColors",U.Colors),$.say($.whisperPrefix(a)+$.lang.get("chatmoderator.subscribers.colors.not.allowed")))}else if(m.equalsIgnoreCase("longmessages")){if(!i[2])return void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.subscribers.toggle.long.msg",d(U.LongMsg)));i[2].equalsIgnoreCase("true")?(U.LongMsg=!0,$.inidb.set("chatModerator","subscribersModerateLongMsg",U.LongMsg),$.say($.whisperPrefix(a)+$.lang.get("chatmoderator.subscribers.long.messages.allowed"))):i[2].equalsIgnoreCase("false")&&(U.LongMsg=!1,$.inidb.set("chatModerator","subscribersModerateLongMsg",U.LongMsg),$.say($.whisperPrefix(a)+$.lang.get("chatmoderator.subscribers.long.messages.not.allowed")))}}if(g.equalsIgnoreCase("linksmessage"))return m?(x=o.replace(g,"").trim(),$.inidb.set("chatModerator","linksMessage",x),void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.link.message.set",x))):void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.link.message.usage"));if(g.equalsIgnoreCase("capsmessage"))return m?(P=o.replace(g,"").trim(),$.inidb.set("chatModerator","capsMessage",P),void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.caps.message.set",P))):void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.caps.message.usage"));if(g.equalsIgnoreCase("symbolsmessage"))return m?(D=o.replace(g,"").trim(),$.inidb.set("chatModerator","symbolsMessage",D),void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.symbols.message.set",D))):void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.symbols.message.usage"));if(g.equalsIgnoreCase("emotesmessage"))return m?(j=o.replace(g,"").trim(),$.inidb.set("chatModerator","emotesMessage",j),void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.emotes.message.set",j))):void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.emotes.message.usage"));if(g.equalsIgnoreCase("colorsmessage"))return m?(K=o.replace(g,"").trim(),$.inidb.set("chatModerator","colorsMessage",K),void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.colors.message.set",K))):void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.colors.message.usage"));if(g.equalsIgnoreCase("longmsgmessage"))return m?(N=o.replace(g,"").trim(),$.inidb.set("chatModerator","longMessageMessage",N),void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.message.message.set",N))):void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.message.message.usage"));if(g.equalsIgnoreCase("spammessage"))return m?(k=o.replace(g,"").trim(),$.inidb.set("chatModerator","spamMessage",k),void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.spam.message.set",k))):void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.spam.message.usage"));if(g.equalsIgnoreCase("blacklistmessage"))return m?(z=o.replace(g,"").trim(),$.inidb.set("chatModerator","blacklistMessage",z),void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.blacklist.message.set",z))):void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.blacklist.message.usage"));if(g.equalsIgnoreCase("permittime"))return m?(C=parseInt(m),$.inidb.set("chatModerator","linkPermitTime",C),void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.permit.time.set",C))):void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.permit.time.usage"));if(g.equalsIgnoreCase("capslimit"))return m?(v=parseFloat(m),$.inidb.set("chatModerator","capsLimitPercent",v),void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.caps.limit.set",v))):void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.caps.limit.usage"));if(g.equalsIgnoreCase("capstriggerlength"))return m?(q=parseInt(m),$.inidb.set("chatModerator","capsTriggerLength",q),void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.caps.trigger.length.set",capsLimit))):void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.caps.trigger.length.usage"));if(g.equalsIgnoreCase("spamlimit"))return m?(S=parseInt(m),$.inidb.set("chatModerator","spamLimit",S),void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.spam.limit.set",S))):void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.spam.limit.usage"));if(g.equalsIgnoreCase("symbolslimit"))return m?(E=parseFloat(m),$.inidb.set("chatModerator","symbolsLimitPercent",E),void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.symbols.limit.set",E))):void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.symbols.limit.usage"));if(g.equalsIgnoreCase("symbolsgrouplimit"))return m?(B=parseInt(m),$.inidb.set("chatModerator","symbolsLimitPercent",B),void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.symbols.group.limit.set",B))):void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.symbols.group.limit.usage"));if(g.equalsIgnoreCase("symbolsTriggerLength"))return m?(R=parseInt(m),$.inidb.set("chatModerator","symbolsTriggerLength",R),void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.symbols.trigger.length.set",R))):void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.symbols.trigger.length.usage"));if(g.equalsIgnoreCase("emoteslimit"))return m?(F=parseInt(m),$.inidb.set("chatModerator","emotesLimit",F),void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.emotes.limit.set",F))):void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.emotes.limit.usage"));if(g.equalsIgnoreCase("messagecharacterlimit"))return m?(G=parseInt(m),$.inidb.set("chatModerator","longMessageLimit",G),void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.message.limit.set",G))):void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.message.limit.usage"));if(g.equalsIgnoreCase("timeouttime"))return m?(J=parseInt(m),$.inidb.set("chatModerator","timeoutTime",J),void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.timeout.time.set",J))):void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.timeout.time.usage"));if(g.equalsIgnoreCase("warningtime"))return m?(H=parseInt(m),$.inidb.set("chatModerator","warningTime",H),void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.warning.time.set",H))):void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.warning.time.usage"));if(g.equalsIgnoreCase("messagecooldown"))return m?(Q=parseInt(m),$.inidb.set("chatModerator","msgCooldownSec",Q),void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.msgcooldown.set",Q))):void $.say($.whisperPrefix(a)+$.lang.get("chatmoderator.msgcooldown.usage"))}}),$.bind("initReady",function(){$.bot.isModuleEnabled("./core/chatmoderator.js")&&(r(),e(),$.registerChatCommand("./core/chatmoderator.js","permit",2),$.registerChatCommand("./core/chatmoderator.js","moderation",1),$.registerChatCommand("./core/chatmoderator.js","mod",1),$.registerChatCommand("./core/chatmoderator.js","blacklist",1),$.registerChatCommand("./core/chatmoderator.js","whitelist",1))}),$.timeoutUser=s,$.permitUserLink=n}();
