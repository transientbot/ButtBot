/*
 * viewersPanel.js
 * Drives the Viewers Panel
 */
(function() {

    var modeIcon = [];
        modeIcon['false'] = "<i class=\"fa fa-circle-o\" />";
        modeIcon['true'] = "<i class=\"fa fa-circle\" />";

    var groupMapping = [];
        groupMapping[0] = "Caster";
        groupMapping[1] = "Admin";
        groupMapping[2] = "Moderator";
        groupMapping[3] = "Subscriber";
        groupMapping[4] = "Donator";
        groupMapping[6] = "Regular";
        groupMapping[7] = "Viewer";

    var loadedLastSeen = false,
        loadedGroups = false,
        loadedTime = false,
        loadedPoints = false,
        loadedChat = false,
        loadedTimeout = false,
        loadedFollowed = false,
        usernameData = [],
        lastseenData = [],
        groupData = [],
        timeData = [],
        pointsData = [],
        chatData = [],
        timeoutData = [],
        followedData = [],
        countAdmin = 0,
        countMod = 0,
        countSub = 0,
        countReg = 0,
        countViewer = 0,
        viewersInDB = false;

    var viewerData = {}; // [ user: { group, time, points, lastseen, timeout, followed } ]

    /*
     * @function secsToDurationStr
     * @param {String} secondsStr
     * @returns {String} string formatted time duration
     */
    function secsToDurationStr(secondsStr) {
        var seconds = parseInt(secondsStr),
            years = 0,
            months = 0,
            days = 0,
            hours = 0,
            minutes = 0,
            durationStr = "";

        if (seconds > 86400) {    // Day: 60 * 60 * 24
            days = seconds / 86400;
            seconds = seconds % 86400;
            durationStr += Math.floor(days) + " days ";
        }
        if (seconds > 3600) {     // Minutes: 60 * 60
            hours = seconds / 3600;
            seconds = seconds % 3600;
            durationStr += Math.floor(hours) + " hrs ";
        }
        minutes = seconds / 60;
        durationStr += Math.floor(minutes) + " mins";
        return durationStr;
    }

    /*
     * @function lastseenStr
     * @param {String} time (ms)
     * @returns {String} formatDate
     */
    function lastseenStr(time) {
        if (time == undefined) {
            return "No Data";
        } else {
            return $.format.date(parseInt(time), "MM.dd.yy hh:mm:ss");
        }
    }

    /*
     * onMessage
     * This event is generated by the connection (WebSocket) object.
     */
    function onMessage(message) {
        var msgObject,
            user = "",
            htmlHeader = "";
            htmlData = [];

        try {
            msgObject = JSON.parse(message.data);
        } catch (ex) {
            return;
        }

        if (panelHasQuery(msgObject)) {
            if (msgObject['query_id'].indexOf('viewers_') === 0) {
                for (idx in msgObject['results']) {
                    var key = msgObject['results'][idx]['key'],
                        value = msgObject['results'][idx]['value'];

                    if (usernameData[key] === undefined) {
                        usernameData.push(key)
                    }

                    if (panelCheckQuery(msgObject, 'viewers_groups')) {
                        groupData[key] = value;
                        if (value.indexOf("0") == 0) groupData[key] = "1";
                        if (value.indexOf("0") == 0 || value.indexOf("1") == 0) countAdmin++;
                        if (value.indexOf("2") == 0) countMod++;
                        if (value.indexOf("3") == 0) countSub++;
                        if (value.indexOf("6") == 0) countReg++;
                        if (value.indexOf("7") == 0) countViewer++; // Not written to the bot all the time.
                    }
                    if (panelCheckQuery(msgObject, 'viewers_time')) {
                        timeData[key] = value;
                    }
                    if (panelCheckQuery(msgObject, 'viewers_points')) {
                        pointsData[key] = value;
                    }
                    if (panelCheckQuery(msgObject, 'viewers_lastseen')) {
                        lastseenData[key] = value;
                    }
                    if (panelCheckQuery(msgObject, 'viewers_timeout')) {
                        timeoutData[key] = value;
                    }
                    if (panelCheckQuery(msgObject, 'viewers_chat')) {
                        chatData[key] = value;
                    }
                    if (panelCheckQuery(msgObject, 'viewers_followed')) {
                        followedData[key] = value;
                    }
                }
            }

            viewersInDB = (countViewer > 0);
            loadedGroups = (loadedGroups ? true : panelCheckQuery(msgObject, 'viewers_groups'));
            loadedTime = (loadedTime ? true : panelCheckQuery(msgObject, 'viewers_time'));
            loadedPoints = (loadedPoints ? true : panelCheckQuery(msgObject, 'viewers_points'));
            loadedLastSeen = (loadedLastSeen ? true : panelCheckQuery(msgObject, 'viewers_lastseen'));
            loadedFollowed = (loadedFollowed ? true : panelCheckQuery(msgObject, 'viewers_followed'));
            loadedTimeout = (loadedTimeout ? true : panelCheckQuery(msgObject, 'viewers_timeout'));
            loadedChat = (loadedChat ? true : panelCheckQuery(msgObject, 'viewers_chat'));

            // Produce the data //
            if (loadedLastSeen && loadedGroups && loadedTime && loadedPoints && loadedFollowed &&
                (!panelStatsEnabled || (panelStatsEnabled && loadedChat && loadedTimeout))) {
                usernameData.sort(sortUsersTable_alpha_asc);
                for (var idx in usernameData) {
                    user = usernameData[idx];

                    if (groupData[user] == undefined) {
                        if (!viewersInDB) countViewer++;
                        groupData[user] = "7";
                    }
                    if (!panelIsDefined(pointsData[user])) pointsData[user] = "0";
                    if (!panelIsDefined(timeoutData[user])) timeoutData[user] = "0";
                    if (!panelIsDefined(chatData[user])) chatData[user] = "0";
                    if (!panelIsDefined(followedData[user])) followedData[user] = 'false';
                    if (!panelIsDefined(timeData[user])) timeData[user] = "0";

                    viewerData[user] = {
                        group: groupData[user],
                        time: timeData[user],
                        points: pointsData[user],
                        lastseen: lastseenData[user],
                        followed: followedData[user],
                        timeout: (panelStatsEnabled ? timeoutData[user] : 0),
                        chat: (panelStatsEnabled ? chatData[user] : 0)
                    };
                }
 
                htmlHeader = "<table><tr class=\"textList\"><th>User</th><th>Last Seen</th><th>Time in Chat</th>" +
                             "<th><i class=\"fa fa-money\" /></th><th><i class=\"fa fa-comment\" /></th>" +
                             "<th><i class=\"fa fa-ban\" /></th><th><i class=\"fa fa-heart\" /></th></tr>";
                htmlData["1"] = htmlHeader;
                htmlData["2"] = htmlHeader;
                htmlData["3"] = htmlHeader;
                htmlData["6"] = htmlHeader;
                htmlData["7"] = htmlHeader;                

                for (var user in viewerData) {
                    htmlData[viewerData[user].group.toString()] +=
                        "<tr class=\"textList\">" +
                        "    <td>" + user + "</td>" +
                        "    <td>" + lastseenStr(viewerData[user].lastseen) + "</td>" +
                        "    <td>" + secsToDurationStr(viewerData[user].time) + "</td>" +
                        "    <td>" + viewerData[user].points + "</td>";

                    if (panelStatsEnabled) {
                        htmlData[viewerData[user].group.toString()] +=
                            "    <td>" + viewerData[user].chat + "</td>" +
                            "    <td>" + viewerData[user].timeout + "</td>";
                    }
                    if (panelStrcmp(viewerData[user].followed, 'true') === 0) {
                        htmlData[viewerData[user].group.toString()] +=
                            "    <td><i class=\"fa fa-heart\" /></td>";
                    } else {
                        htmlData[viewerData[user].group.toString()] +=
                            "    <td><i class=\"fa fa-heart-o\" /></td>";
                    }
    
                    htmlData[viewerData[user].group.toString()] += "</tr>";
                }

                htmlData["1"] += "</table>";
                htmlData["2"] += "</table>";
                htmlData["3"] += "</table>";
                htmlData["6"] += "</table>";
                htmlData["7"] += "</table>";                

                $("#viewersAdminList").html(htmlData["1"]);
                $("#viewersAdminCount").html("(Count: " + countAdmin + ")");

                $("#viewersModList").html(htmlData["2"]);
                $("#viewersModCount").html("(Count: " + countMod + ")");

                $("#viewersSubList").html(htmlData["3"]);
                $("#viewersSubCount").html("(Count: " + countSub + ")");

                $("#viewersRegList").html(htmlData["6"]);
                $("#viewersRegCount").html("(Count: " + countReg + ")");

                $("#viewersViewerList").html(htmlData["7"]);
                $("#viewersViewerCount").html("(Count: " + countViewer + ")");

                // Reset everything back now that the data displayed //
                loadedGroups = false;
                loadedTime = false;
                loadedPoints = false;
                loadedLastSeen = false;
                loadedTimeout = false;
                loadedChat = false; 
                loadedFollowed = false;

                lastseenData = [];
                groupData = [];
                timeData = [];
                pointsData = [];
                chatData = [];
                timeoutData = [];
                followedData = [];
                countAdmin = 0;
                countMod = 0;
                countSub = 0;
                countReg = 0;
                countViewer = 0;
                viewersInDB = false;
            }
        }
    } 

    /**
     * @function doQuery
     */
    function doQuery() {
        sendDBKeys("viewers_lastseen", "lastseen");
        sendDBKeys("viewers_groups", "group");
        sendDBKeys("viewers_time", "time");
        sendDBKeys("viewers_points", "points");
        sendDBKeys("viewers_followed", "followed");
        sendDBKeys("viewers_visited", "visited");
        if (panelStatsEnabled) {
            sendDBKeys("viewers_timeout", "panelmoduserstats");
            sendDBKeys("viewers_chat", "panelchatuserstats");
        }
    }

    /**
     * @function sortPointsTable
     * @param {Object} a
     * @param {Object} b
     */
    function sortUsersTable_alpha_desc(a, b) {
        return panelStrcmp(b, a);
    };
    function sortUsersTable_alpha_asc(a, b) {
        return panelStrcmp(a, b);
    };

    /**
     * @function updateUserPerm
     */
    function updateUserPerm (perm) {
        var username = $("#promoteUser" + perm).val();
        if (username.length != 0) {
            if (perm == 'Admin') {
                sendDBUpdate('user_perm', 'group', username.toLowerCase(), '1');
            }
    
            if (perm == 'Mod') {
                sendDBUpdate('user_perm', 'group', username.toLowerCase(), '2');
            }
    
            if (perm == 'Sub') {
                sendDBUpdate('user_perm', 'group', username.toLowerCase(), '3');
            }
    
            /*
            ** Will enabled once we use these groups.
            if (perm == 'Donator') {
                sendDBUpdate('user_perm', 'group', username.toLowerCase(), '4');
            }
    
            if (perm == 'Hoster') {
                sendDBUpdate('user_perm', 'group', username.toLowerCase(), '5');
            }*/
    
            if (perm == 'Reg') {
                sendDBUpdate('user_perm', 'group', username.toLowerCase(), '6');
            }
        }

        $("#promoteUser" + perm).val('');
        doQuery();
    };

    /**
     * @function updateUserPerm
     */
    function demoteUser (perm) {
        var username = $("#unPromoteUser" + perm).val();
        if (username.length != 0) {
            sendDBDelete('user_perm', 'group', username.toLowerCase());
        }
        $("#unPromoteUser" + perm).val('');
        doQuery();
    };

    /**
     * @function fixFollower
     */
    function fixFollower () {
        var username = $("#fixFollower").val();
        if (username.length != 0) {
            sendDBUpdate('user_follows', 'followed', username.toLowerCase(), 'true');
        }
        $("#fixFollower").val('');
        doQuery();
    };

    // Import the HTML file for this panel.
    $("#viewersPanel").load("/panel/viewers.html");

    // Load the DB items for this panel, wait to ensure that we are connected.
    var interval = setInterval(function() {
        if (isConnected && TABS_INITIALIZED) {
            var active = $("#tabs").tabs("option", "active");
            if (active == 5) {
                doQuery();
                clearInterval(interval);
            }
        }
    }, INITIAL_WAIT_TIME);

    // Query the DB every 30 seconds for updates.
    setInterval(function() {
        var active = $("#tabs").tabs("option", "active");
        if (active == 5 && isConnected && !isInputFocus()) {
            newPanelAlert('Refreshing Viewers Data', 'success', 1000);
            doQuery();
        }
    }, 3e4);

    // Export functions - Needed when calling from HTML.
    $.viewersOnMessage = onMessage;
    $.viewersDoQuery = doQuery;
    $.updateUserPerm = updateUserPerm;
    $.demoteUser = demoteUser;
    $.fixFollower = fixFollower;
})();
