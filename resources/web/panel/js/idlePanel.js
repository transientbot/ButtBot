/*
 * idlePanel.js
 */ 

(function () {

    var refreshIcon = '<i class="fa fa-refresh" />',
        spinIcon = '<i style="color: #6136b1;" class="fa fa-spinner fa-spin" />',
        modeIcon = [];

    modeIcon['false'] = "<i style=\"color: #6136b1\" class=\"fa fa-circle-o\" />";
    modeIcon['true'] = "<i style=\"color: #6136b1\" class=\"fa fa-circle\" />";

    var chatIdlenessToggle = "false";

    function onMessage(message)
    {
        var msgObject, html = '', id = '';

        try
        {
            msgObject = JSON.parse(message.data);
        }
        catch (ex)
        {
            return;
        }

        if (panelHasQuery(msgObject))
        {
            if (panelCheckQuery(msgObject, 'activity'))
            {
                for (var idx in msgObject['results'])
                {
                    if (panelMatch(msgObject['results'][idx]['key'], 'idle_toggle'))
                    {
                        chatIdlenessToggle = msgObject['results'][idx]['value'];
                        $('#chatIdlenessMode').html(modeIcon[chatIdlenessToggle]);
                    }
                }
            }

            if (panelCheckQuery(msgObject, 'activePoints'))
            {
                for (var idx in msgObject['results'])
                {
                    var key = msgObject['results'][idx]['key'];
                    var val = msgObject['results'][idx]['value'];

                    if (panelMatch(key, 'idlehours'))
                    {
                        $('#idleCurrencyIntervalInputHours').val(val);
                    }
                    else if (panelMatch(key, 'idleminutes'))
                    {
                        $('#idleCurrencyIntervalInputMinutes').val(val);
                    }
                    else if (panelMatch(key, 'idleseconds'))
                    {
                        $('#idleCurrencyIntervalInputSeconds').val(val);
                    }
                }
            }

            if (panelCheckQuery(msgObject, 'activePointsReceived'))
            {
                for (var idx in msgObject['results'])
                {
                    var key = msgObject['results'][idx]['key'];
                    var val = msgObject['results'][idx]['value'];

                    if (panelMatch(key, 'pointsreceived'))
                    {
                        $('#idleCurrencyWhileIdle').val(val);
                    }
                }
            }

            if (panelCheckQuery(msgObject, 'activeRandom'))
            {
                for (var idx in msgObject['results'])
                {
                    var key = msgObject['results'][idx]['key'];
                    var val = msgObject['results'][idx]['value'];

                    if (panelMatch(key, 'randomhours'))
                    {
                        $('#idleRandomIntervalInputHours').val(val);
                    }
                    else if (panelMatch(key, 'randomminutes'))
                    {
                        $('#idleRandomIntervalInputMinutes').val(val);
                    }
                    else if (panelMatch(key, 'randomseconds'))
                    {
                        $('#idleRandomIntervalInputSeconds').val(val);
                    }
                }
            }

            if (panelCheckQuery(msgObject, 'activeBonusPointsReceived'))
            {
                for (var idx in msgObject['results'])
                {
                    var key = msgObject['results'][idx]['key'];
                    var val = msgObject['results'][idx]['value'];

                    if (panelMatch(key, 'activebonuspoints'))
                    {
                        $('#idleBonusCurrencyWhileIdle').val(val);
                    }
                }
            }

            if (panelCheckQuery(msgObject, 'activeBonusPoints'))
            {
                for (var idx in msgObject['results'])
                {
                    var key = msgObject['results'][idx]['key'];
                    var val = msgObject['results'][idx]['value'];

                    if (panelMatch(key, 'activehours'))
                    {
                        $('#idleBonusCurrencyIntervalInputHours').val(val);
                    }
                    else if (panelMatch(key, 'activeminutes'))
                    {
                        $('#idleBonusCurrencyIntervalInputMinutes').val(val);
                    }
                    else if (panelMatch(key, 'activeseconds'))
                    {
                        $('#idleBonusCurrencyIntervalInputSeconds').val(val);
                    }
                }
            }
        }
    }

    function doQuery()
    {
        sendDBKeys('activity', 'idleSettings');
        sendDBKeys('activePoints', 'idleSettings');
        sendDBKeys('activePointsReceived', 'idleSettings');
        sendDBKeys('activeRandom', 'idleSettings');
        sendDBKeys('activeBonusPoints', 'idleSettings');
        sendDBKeys('activeBonusPointsReceived', 'idleSettings');

        setTimeout(function () { sendCommand ("reloadidle") }, TIMEOUT_WAIT_TIME);
    }

    function toggleChatIdleness()
    {
        $('#chatIdlenessMode').html(spinIcon);
        chatIdlenessToggle = (chatIdlenessToggle == "true" ? "false" : "true");

        sendDBUpdate('activity', 'idleSettings', 'idle_toggle', chatIdlenessToggle);

        setTimeout(function () { doQuery (); }, TIMEOUT_WAIT_TIME);
    }

    function updateCurrencyActivityLevel(hours, minutes, seconds)
    {
        sendDBUpdate("activePoints", "idleSettings", "idlehours", $(hours).val());
        sendDBUpdate("activePoints", "idleSettings", "idleminutes", $(minutes).val());
        sendDBUpdate("activePoints", "idleSettings", "idleseconds", $(seconds).val());

        setTimeout(function () { doQuery (); }, TIMEOUT_WAIT_TIME);
    }

    function updateCurrencyReceivedWhileIdle(number)
    {
        sendDBUpdate("activePointsReceived", "idleSettings", "pointsreceived", $(number).val());

        setTimeout(function () { doQuery (); }, TIMEOUT_WAIT_TIME);
    }

    function updateBonusCurrencyActivityLevel(hours, minutes, seconds)
    {
        sendDBUpdate("activeBonusPoints", "idleSettings", "activehours", $(hours).val());
        sendDBUpdate("activeBonusPoints", "idleSettings", "activeminutes", $(minutes).val());
        sendDBUpdate("activeBonusPoints", "idleSettings", "activeseconds", $(seconds).val());

        setTimeout(function () { doQuery (); }, TIMEOUT_WAIT_TIME);
    }

    function updateBonusCurrencyReceivedWhileIdle(number)
    {
        sendDBUpdate("activeBonusPointsReceived", "idleSettings", "activebonuspoints", $(number).val());

        setTimeout(function () { doQuery (); }, TIMEOUT_WAIT_TIME);
    }

    function updateRandomActivityLevel(hours, minutes, seconds)
    {
        sendDBUpdate("activeRandom", "idleSettings", "randomhours", $(hours).val());
        sendDBUpdate("activeRandom", "idleSettings", "randomminutes", $(minutes).val());
        sendDBUpdate("activeRandom", "idleSettings", "randomseconds", $(seconds).val());

        setTimeout(function () { doQuery (); }, TIMEOUT_WAIT_TIME);
    }

    // Import the HTML file for this panel.
    $("#idlePanel").load("/panel/idle.html");

    var interval = setInterval (function () {
        if (isConnected && TABS_INITIALIZED) {
            var active = $('#tabs').tabs('option', 'active');
            if (active == 21)
            {
                doQuery ();
                clearInterval (interval);
            }
        }
    }, INITIAL_WAIT_TIME);

    setInterval (function () {
        var active = $('#tabs').tabs('option', 'active');
        if (active == 21 && isConnected && !isInputFocus())
        {
            newPanelAlert('Refreshing Idleness Data', 'success', 1000);
            doQuery();
        }
    }, 3e4);

    // Export to HTML
    $.idleDoQuery = doQuery;
    $.idleOnMessage = onMessage;

    $.toggleChatIdleness = toggleChatIdleness;
    $.updateBonusCurrencyActivityLevel = updateBonusCurrencyActivityLevel;
    $.updateBonusCurrencyReceivedWhileIdle = updateBonusCurrencyReceivedWhileIdle;
    $.updateCurrencyActivityLevel = updateCurrencyActivityLevel;
    $.updateCurrencyReceivedWhileIdle = updateCurrencyReceivedWhileIdle;
    $.updateRandomActivityLevel = updateRandomActivityLevel;
})();
