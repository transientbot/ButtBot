/*
 * Copyright (C) 2016 www.phantombot.net
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/* 
 * @author IllusionaryOne
 */

/*
 * helpPanel.js
 * Drives the Help
 */
(function() {

    /*
     * onMessage
     * This event is generated by the connection (WebSocket) object.
     */
    function onMessage(message) {
        var msgObject;

        try {
            msgObject = JSON.parse(message.data);
        } catch (ex) {
            return;
        }

        // Check for dbkeysresult queries
        if (msgObject['versionresult'] !== undefined) {
            var version = "",
                panelVersion = "Control Panel Version " + PANEL_VERSION;

            if (panelMatch(msgObject['versionresult'], 'help_version')) {
                version = msgObject['version'];
            } else {
                version = "PhantomBot 2";
            }
            $("#botVersion").html("<strong>" + version + "<br>" + panelVersion + "</strong><br><br>" +
                                  "<small>" +
                                  "    <strong>Control Panel Software</strong><br>" +
                                  "    jQuery " + $().jquery + "<br>" + 
                                  "    jQuery UI " + $.ui.version + "<br>" +
                                  "    Bootstrap 3.3.6<br>" +
                                  "    Font Awesome 4.5.0<br>" +
                                  "    Ion.Sound 3.0.7<br>" +
                                  "    FlotCharts 0.8.3<br>" +
                                  "</small>");
        }
    }

    // Import the HTML file for this panel.
    $("#helpPanel").load("/panel/help.html");

    // Request the version from the bot. This is only done once.
    var interval = setInterval(function() {
        if (isConnected) {
            requestVersion("help_version");
            clearInterval(interval); 
        }
    }, 200);

    // Export functions - Needed when calling from HTML
    $.helpOnMessage = onMessage;
})();
