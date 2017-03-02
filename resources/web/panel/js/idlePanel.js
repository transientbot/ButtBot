/*
 * idlePanel.js
 */

(function () {

    var refreshIcon = '<i class="fa fa-refresh" />',
        spinIcon = '<i style="color: #6136b1;" class="fa fa-spinner fa-spin" />',
        modeIcon = [];

    modeIcon['false'] = "<i style=\"color: #6136b1\" class=\"fa fa-circle-o\" />";
    modeIcon['true'] = "<i style=\"color: #6136b1\" class=\"fa fa-circle\" />";

    var chatIdlenessToggle = false;

    // Import the HTML file for this panel.
    $("#idlePanel").load("/panel/idle.html");

    // Load the DB items for this panel, wait to ensure that we are connected.
    var interval = setInterval(function() {
        if (isConnected && TABS_INITIALIZED) {
            var active = $('#tabs').tabs('option', 'active');
            if (active == 21) {
                doQuery();
                clearInterval(interval);
            }
        }
    }, INITIAL_WAIT_TIME);

    // Query the DB every 30 seconds for updates.
    setInterval(function() {
        var active = $('#tabs').tabs('option', 'active');
        if (active == 21 && isConnected && !isInputFocus()) {
            newPanelAlert('Refreshing Idleness Data', 'success', 1000);
            doQuery();
        }
    }, 3e4);

    function toggleChatIdleness()
    {
        $('#chatIdlenessMode').html(spinIcon);
        if (chatIdlenessToggle == "true")
        {
            sendDBUpdate()
        }
        else
        {
            sendDBUpdate()
        }

        setTimeout(function() { sendCommand("reloadidle"); }, TIMEOUT_WAIT_TIME);
        setTimeout(function() { doQuery(); }, TIMEOUT_WAIT_TIME);
    }
    
    // Export to HTML
    $.toggleChatIdleness = toggleChatIdleness;

})();